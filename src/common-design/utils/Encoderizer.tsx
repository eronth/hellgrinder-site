import React from "react";
import { Creature, CreatureAbility } from "../../ts-types/creature-types";
import { Encounter, EncounterCreature } from "../../ts-types/encounter-types";
import { AttackMode } from "../../ts-types/types";
import { CoderizerConsts } from "./CoderizerConsts";
import _ from "lodash";

export class Encoderizer {

  static extraSpecialEncounterCopier(encounter): Encounter {
    const newEncounter: Encounter = {creatures: []};
    const ec = encounter.creatures;
    ec?.forEach((ec) => {
      const newEncounterCreature = {
        ...ec,
      };
      newEncounterCreature.creature = {
        ...ec.creature
      };

      // All new attacks.
      const newAttacks = [];
      newEncounterCreature.creature.attacks.forEach(a => {
        // each new attack.
        const newAttack = {
          ...a,
        };

        // Each new effect per attack.
        const newEffects: string[] = [];
        if (a.effects) {
          a.effects.forEach((e) => {
            newEffects.push(e);
          });
        }
        if ((newEffects?.length ?? 0) != 0) {
          newAttack.effects = newEffects;
        }
      });
      newEncounterCreature.creature.attacks = newAttacks;

      // All new abilities.
      const newAbilities = [];
      newEncounterCreature.creature.abilities.forEach(a => {
        newAbilities.push({
          ...a
        });
      });
      newEncounterCreature.creature.abilities = newAbilities;

      newEncounter.creatures.push(ec);
    })

    return newEncounter;
  }

  static encoderizer(encounter: Encounter): Encounter {
    const newEcounter = _.cloneDeep(encounter); // this.extraSpecialEncounterCopier(encounter);
    newEcounter.creatures = 
      newEcounter.creatures.map(c => this.encoderizeEncounterCreature(c));
    return newEcounter;
  }

  static encoderizeEncounterCreature(encounterCreature: EncounterCreature): EncounterCreature {
    encounterCreature.creature = this.encoderizeCreature(encounterCreature.creature);
    return encounterCreature;
  }

  static encoderizeCreature(creature: Creature): Creature {
    creature.description = this.encoderizeCreatureDescription(creature.description);
    creature.attacks = creature.attacks?.map(attack => this.encoderizeCreatureAttack(attack));
    creature.abilities = creature.abilities?.map(ability => this.encoderizeCreatureAbility(ability));
    return creature;
  }

  static encoderizeCreatureDescription(description: string): string {
    return description; // No-op for now, could implement more complex logic if needed
  }

  static encoderizeCreatureAttack(attack: AttackMode): AttackMode {
    return attack; // No-op for now, could implement more complex logic if needed
  }

  static encoderizeCreatureAbility(ability: CreatureAbility): CreatureAbility {
    ability.description = this.encoderizeCreatureAbilityDescription(ability.description);
    return ability; // No-op for now, could implement more complex logic if needed
  }

  static encoderizeCreatureAbilityDescription(description: React.ReactNode): React.ReactNode {
    let newDescription: string = description;
    if (React.isValidElement(description)) {
      console.log("TTTTTTTTTT  1")
      if (Array.isArray(description.props.children)) {
        console.log("TTTTTTTTTT  2")
        const newDescAr: string[] = description.props.children.map((child: any) =>
          this.encoderizeTextFragment(child)
        );
        console.log("TTTTTTTTTT  3")
        newDescription = newDescAr.join('');
      } else {
        console.log("TTTTTTTTTT  4")
        newDescription = this.encoderizeTextFragment(description.props.children);
      }
    }
    console.log("TTTTTTTTTT  5")
    return newDescription; // Return the original description for now
  }

  static encoderizeTextFragment(fragment: string | React.ReactNode): string {
    if (typeof fragment === 'string') {
      return fragment; // Plain text, no action needed
    } else if (React.isValidElement(fragment)) {
      console.log('Found React element in text fragment:', fragment);
      console.log(typeof fragment);
      console.log(fragment.type);
      console.log(fragment.type.name)
      return this.encoderizeReactElement(fragment);
    } else {
      console.warn('Unknown fragment type:', fragment);
      return '[FRAGMENT TYPE NOT RECOGNIZED]' //fragment;
    }
  }

  static encoderizeReactElement(element): string {
    let text = '';
    if (element.type?.name) {
      const paramList = 
        Object.entries(element.props).map((kvp) => {
          const [key, value] = kvp;
          if (Array.isArray(value)) {
            return `${key}:[${value.join(',')}]`;
          } else {
            return `${key}:${value}`;
          }
        });
      text += 
        // THIS IS THE NAME
        element.type.name
        + CoderizerConsts.componentNameSplit
        // THIS PART MAKES THE OBJECT LIST
        + '{'+paramList.join(',')+'}';

      } else {
        text = 'MEN WERE NOT MEANT TO THINK THIS HARD';
      }
      return (CoderizerConsts.componentSplit
        + CoderizerConsts.componentStart
        + text
        + CoderizerConsts.componentEnd
        + CoderizerConsts.componentSplit);
  }
}