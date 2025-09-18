import React from "react";
import { Creature, CreatureAbility } from "../../ts-types/creature-types";
import { Encounter, EncounterCreature } from "../../ts-types/encounter-types";
import { AttackMode } from "../../ts-types/types";
import HitCheck from "../HitCheck/HitCheck";
import SkillCheck from "../SkillCheck/SkillCheck";
import StatusKeyword from "../StatusKeyword";
import { CoderizerConsts } from "./CoderizerConsts";

export class Decoderizer {

  static decoderizer(encounter: Encounter): Encounter {
    encounter.creatures = 
      encounter.creatures.map(c => this.decoderizeEncounterCreature(c));
    return encounter;
  }

  static decoderizeEncounterCreature(encounterCreature: EncounterCreature): EncounterCreature {
    encounterCreature.creature = this.decoderizeCreature(encounterCreature.creature);
    return encounterCreature;
  }

  static decoderizeCreature(creature: Creature): Creature {
    creature.description = this.decoderizeCreatureDescription(creature.description);
    creature.attacks = creature.attacks?.map(attack => this.decoderizeCreatureAttack(attack));
    creature.abilities = creature.abilities?.map(ability => this.decoderizeCreatureAbility(ability));
    return creature;
  }

  static decoderizeCreatureDescription(description: string): string {
    return description; // No-op for now, could implement more complex logic if needed
  }

  static decoderizeCreatureAttack(attack: AttackMode): AttackMode {
    return attack; // No-op for now, could implement more complex logic if needed
  }

  static decoderizeCreatureAbility(ability: CreatureAbility): CreatureAbility {
    ability.description = this.decoderizeText(ability.description);
    return ability; // No-op for now, could implement more complex logic if needed
  }

  static decoderizeText(description: string): React.ReactElement {
    console.log("DECODERIZE ME!", description);
    if (!description) {return <> HOW IS THERE NO DESCRIPTION??? </>}
    const brokenString = description.split(CoderizerConsts.componentSplit);
    console.log('-brokenString', brokenString);
    const elements = brokenString.map((part, index) => {
      if (part.startsWith(CoderizerConsts.componentStart) 
        && part.endsWith(CoderizerConsts.componentEnd)) {
        console.log('-special part', part)
        const content = part
          .slice(CoderizerConsts.componentStart.length, -CoderizerConsts.componentEnd.length)
          .split(CoderizerConsts.componentNameSplit); // Extract content between tags
        if (content == 'MEN WERE NOT MEANT TO THINK THIS HARD') {
          return <>Why...</>;
        }
        console.log('content', content);
        const [name, paramsString] = content;
        console.log('name',  name)
        console.log('paramsString', paramsString);
        // Turn paramsString into an object
        const paramsArr = paramsString
          .slice(1, -1) // Remove the surrounding {}
          .split(',');
        console.log("paramsArr", paramsArr)
        const paramsObj: { [key: string]: any } = {};
        paramsArr.forEach(p => {
          let [key, value] = p.split(':');
          value = value.trim();
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1);
            value = value.split(',');
          }
          paramsObj[key.trim()] = value;
        });
        return this.makeMeAReactComponent(name, paramsObj);
      } else {
        console.log('-part', part)
        return <>{part.trim()}</>;
      }
    });
    return (<>
      {elements.map((el, i) => <React.Fragment key={i}>{el} </React.Fragment>)}
    </>);
  }

  static makeMeAReactComponent(name, params) {
    switch (name) {
      case 'SkillCheck':
        return <SkillCheck {...params} />;
      case 'HitCheck':
        return <HitCheck {...params} />;
      case 'StatusKeyword':
        return <StatusKeyword {...params} />;
      default:
        return <div>THIS NEEDS TO BE A {name} COMPONENT</div>;
    }
  }
}