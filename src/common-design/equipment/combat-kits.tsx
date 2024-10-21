import type { Kit } from '../../ts-types/types.tsx';
import { deepCopyWeapon, combatRifle, pistol, sword } from './weapons.tsx';

const exObj: {
  sniper: Kit,
  grenadier: Kit,
  flamethrower: Kit,
  breachAndClear: Kit,
  soldier: Kit,
  demonHunter: Kit,
  perky: Kit,
  riot: Kit,
  helltouched: Kit,
  relicworker: Kit,
  warrior: Kit,
  prototype: Kit,
} = {
  sniper: {
    name: 'Sniper',
    description: "The Sniper Kit excels at picking off enemies from a distance, ensuring you're lethal while staying out of harm's way. However, when the fight gets up close and personal, you'll find yourself at a disadvantage. Use the gillie suit to blend into your surroundings, becoming a ghost on the battlefield, unseen until it's too late.",
    weapons: [{
      name: 'Sniper Rifle',
      tags: ['Heavy', 'Two-Handed'],
      attackModes: [{
        tags: ['Single Shot', 'Long Range', 'Shooting Attack'],
        damage: {
          l: { value: 2, type: 'Metal' },
          m: { value: 9, type: 'Metal' },
          h: { value: 12, type: 'Metal' },
        },
        effects: ['After firing, you must to use an Action or Maneuver to reload before you can fire this weapon again.'],
      }],
    }],
    items: [{
      name: 'Ghillie Suit',
      tags: ['Stealth'],
      description: 'A suit that helps you blend in with your surroundings.',
      effects: ['Gain +1 to Stealth checks'],
    },
    {
      name:'Sniping Scope',
      tags: ['Gadget'],
      description: 'A scope that helps you see further and more clearly.',
      effects: ['Gain'],
    }],
    trainings: [{
      name: 'Long Range Training',
      tags: ['Attack'],
      effects: ['Gain +2 to [Long Range] Hit Checks.'],
    }],
  },

  grenadier: {
    name: 'Grenadier',
    description: "The Grenadier Kit is all about explosives. You're able to to use your grenade launcher to send explosives to the far side of the room, ensuring none are safe from your wrath.",
    weapons: [{
      name: 'Grenade Launcher',
      tags: ['Heavy', 'Two-Handed'],
      attackModes: [{
        tags: ['Medium Range', 'Long Range', 'Shooting Attack'],
        damage: {
          l: { value: 1, type: 'Metal' },
          m: { value: 1, type: 'Metal' },
          h: { value: 3, type: 'Metal' },
        },
        effects: ['Launch a Grenade by making a shooting attack instead of a Thrown Attack. After the attack hits, the grenade detonates on your target\'s hex dealing any damage or effects of the grenade in addition to this attack\'s damage. The attack loses the [Thrown] property.',
          'Grenades launched by this weapon get +1 to their Area.'
        ],
      }],
    },
    {...pistol},
    ],
    items: [],
    trainings: [],
  },

  flamethrower: {
    name: 'Flamethrower',
    description: "Bring the heat with the Flamethrower kit. Scorch any who dare get close to you with a burning front arc attack.",
    weapons: [{
      name: 'Flame Thrower',
      tags: ['Heavy', 'Two-Handed'],
      attackModes: [{
        tags: ['Short Range', 'Shooting Attack'],
        damage: {
          l: { value: 1, type: 'Infernal' },
          m: { value: 4, type: 'Infernal' },
          h: { value: 6, type: 'Infernal' },
        },
        effects: ['This attack targets all creatures in [Short Range] of your front arc.', 'This attack cannot be used beyond [Short Range].'],
      }],
    }],
    items: [{
      name: 'Heat Resistance Suit',
      tags: [],
      description: 'A suit that helps protect against he singe of fires.',
      effects: ['Gain [Resist Infernal 2].'],
    }],
    trainings: [],
  },

  breachAndClear: {
    name: 'Breach and Clear',
    description: "",
    weapons: [{
      name: 'Breach Shotgun',
      tags: [],
      attackModes: [{
        name: 'Close Encounter',
        tags: ['Short Range', 'Shooting Attack'],
        damage: {
          l: { value: 2, type: 'Metal' },
          m: { value: 8, type: 'Metal' },
          h: { value: 9, type: 'Metal' },
        },
      },
      {
        name: 'Crowd Control',
        tags: ['Medium Range', 'Shooting Attack'],
        damage: {
          l: { value: 1, type: 'Metal' },
          m: { value: 3, type: 'Metal' },
          h: { value: 6, type: 'Metal' },
        },
        effects: ['This attack can target up to 3 enemies in your front arc within, so long as all targets are within [Short Range] of each other.'],
      }],
    }],
    items: [{
      name: 'Door Buster',
      tags: ['Breach'],
      description: 'Easily Breach Doors, whatever that means...',
      effects: [''],
    },
    {
      name:'Door Peek',
      tags: ['Sneak', 'Action'],
      description: 'A tool that can be planted on a door to give you a peek at what\'s on the other side.',
      effects: ['You may use an Action to place this tool on a door you are next to. While adjacent to the door, you can see through the door as if it wasn\'t as a Free Interaction, though others cannot see you. You may only deploy one Door Peek per encounter.'],
    }],
    trainings: [],
  },

  soldier: {
    name: 'Soldier',
    description: "",
    weapons: [{...combatRifle}],
    items: [{
      name: 'Flashlight',
      tags: ['Light'],
      description: 'A flashlight that helps you see in the dark. You never know when you might need it.',
      effects: ['Produce bright light in your front arc out to [Medium Range] and dim light in your front arc out to [Long Range]. Cannot penetrate arcane abyssal or voidyr darkness.' ],
    }],
    trainings: [{
      name: 'Rounded',
      tags: [],
      effects: ['Start with an additional Support Kit of your choice.', 'Start with 1 additional Perk Point.'],
    },
    {
      name: 'Move! Move!',
      tags: [],
      effects: ['Gain +1 Move Speed.']
    }],
  },

  demonHunter: {
    name: 'Demon Hunter',
    description: "The demon hunter craves the destruction of all hellish creatures. They have trained in the art of combat, seeking up-close and personal assaults.",
    weapons: [{
      ...deepCopyWeapon(sword),
      name: 'Hellforged Blade',
      tags: ['One-Handed'],
      attackModes: [{
        name: 'Rip and Raze',
        tags: ['Melee Range', 'Melee Attack'],
        damage: {
          l: { value: sword.attackModes[0].damage.l.value, type: 'Chthonic' },
          m: { value: sword.attackModes[0].damage.m.value, type: 'Chthonic' },
          h: { value: sword.attackModes[0].damage.h.value, type: 'Chthonic' },
        },
      },
      {
        name: 'Sunder and Strike',
        tags: ['Melee Range', 'Melee Attack'],
        damage: {
          l: { value: sword.attackModes[0].damage.l.value+1, type: 'Voidyr' },
          m: { value: sword.attackModes[0].damage.m.value+2, type: 'Voidyr' },
          h: { value: sword.attackModes[0].damage.h.value+3, type: 'Voidyr' },
        },
        effects: ['Gain 3 Corruption.'],
      }],
    },
    {
      ...deepCopyWeapon(pistol),
      name: 'Hellforged Pistol',
    }],
    items: [],
    trainings: [],
  },
  
  perky: {
    name: 'Perky',
    description: "The Sniper Kit excels at picking off enemies from a distance, ensuring you're lethal while staying out of harm's way. However, when the fight gets up close and personal, you'll find yourself at a disadvantage. Use the gillie suit to blend into your surroundings, becoming a ghost on the battlefield, unseen until it's too late.",
    weapons: [{...combatRifle}, {...pistol}],
    items: [{
      name: 'Coffee Kit',
      tags: [],
      description: 'A simple to use kit for making coffee. A great way to keep the great taste of home with you on the battlefield.',
      effects: ['If you spend 10 minute, you can make a nice cup of coffee for yourself. You can give the cup to someone else, but they only gain half the benefits. Only one person can benefit from your cup of coffee at a time.', 'Coffee Bonus: Gain +2 to Recovery Checks.', 'Coffee Bonus: Gain +2 to Observation Checks.'],
    }],
    trainings: [{
      name: 'Perked Up',
      tags: [],
      effects: ['Start with 3 additional Perk Points.'],
    }],
  },

  riot: {
    name: 'Riot',
    description: "The riot kit is for ",
    weapons: [{...pistol}],
    items: [{
      name: 'Deployable Shield',
      tags: ['Armor', 'Maneuver'],
      description: 'A shield that can be deployed to protect you from incoming attacks. You can hold the shield to bring it with you, or deploy it to place it down.',
      effects: ['Maneuver to deploy or retract the shield.',
        'While held, gain [Resist All 1].',
        'When you deploy the shield, pick two edges or your hex that share a corner. Those edges now have heavy cover.',],
    },
    {
      name:'Heavy Armor',
      tags: ['Armor'],
      description: 'Extra plating to protect yourself on the battlefield.',
      effects: ['Gain [Resist Any (Except Metal) 1]', 'Gain [Resist Metal 3]'],
    }],
    trainings: [],
  },

  helltouched: {
    name: 'Helltouched',
    description: "The helltouched operator is one who has been too close to the hellish denizens. Perminently marked by the experience, they are attuned to demonic powers, able to call upon them for aid in combat.",
    weapons: [{
      name: 'Rune Blast',
      tags: ['One-Handed'],
      attackModes: [{
        tags: ['Medium Range', 'Arcane Attack'],
        damage: {
          l: { value: 3, type: 'Chosen Type' },
          m: { value: 6, type: 'Chosen Type' },
          h: { value: 9, type: 'Chosen Type' },
        },
        effects: ['When you hit an enemy that has Resist against your chosen element, you can forgo damage to instead reduce their Resist value against that element by 1.'],
      }],
    }],
    items: [],
    trainings: [{
      name: 'Inhuman Speed',
      tags: ['Arcane', 'Movement'],
      effects: ['Gain +1 Move Speed. Gain an additional +1 Move Speed if you have been hit by you chosen element since the end of your last turn.'],
    },
    {
      name: 'Power Infusion',
      tags: ['Arcane', 'Damage'],
      effects: ['Gain +1 Damage for every 6 Corruption you have.'],
    }],
  },

  relicworker: {
    name: 'Relic Worker',
    description: "",
    weapons: [{...pistol}],
    items: [{
      name: 'Chosen Relics',
      tags: ['Relic', 'Arcane'],
      description: 'When you pick Relic Worker, choose three of the following relics. When combat begins, choose a relic to start as equipped. Swapping Relics is a Maneuver.',
      effects: [''],
    },
    {
      name: 'Dual Scorchsashes',
      tags: ['Arcane', 'Relic'],
      description: '',
      effects: ['At the start of your turn, creatures in [Melee Range] of you take 2 Infernal Damage and creatures in [Short Range] of you take 1 Infernal Damage.'],
    },
    {
      name: 'Drowner Discus',
      tags: ['Arcane', 'Relic', 'Medium Range', 'Thrown', 'Area: 1'],
      description: '',
      effects: ['Create a Drownpit Pool in the affected area.'],
    },
    
    {
      name: 'Slowing Viewfinder',
      tags: ['Arcane', 'Relic'],
      description: '',
      effects: ['Creatures in your front arc at [Medium Range] make an [Endurance] Skill Check when they attempt to move. On a Minor Success or less, they are [Slowed 1].',
        'Creatures in your front arc at [Short Range] are [Slowed 1].'
      ],
    },
    {
      name: 'Innersoul Stabilizing Field Generator',
      tags: ['Arcane', 'Relic'],
      description: '',
      effects: ['At the start of your turn, you and allies in [Short Range] of you gain +1 Health.', 'You and allies in [Short Range] of you gain [Resist Soulrend 1].'],
    },
    {
      name: 'Soulbinder Darts',
      tags: ['Arcane', 'Relic', 'One-Handed', 'Action', 'Maneuver'],
      description: 'You have 2 Soulbinder Darts.',
      effects: [
        'As an Action or Maneuver, you can stick a Soulbinder Dart in a target within [Medium Range].',
        'As a Free Interaction, you may retrieve a Soulbinder Dart within [Medium Range].',
        'Whenever a creature stuck with one Soulbinder Dart takes damage, another creature within [Short Range] of them takes half (rounded up) of the damage as Nethercurrent Damage.',
      ],
    },
    {
      name: 'Quickrot Ring',
      tags: ['Arcane', 'Relic', 'Action'],
      description: '',
      effects: [
        'As an action, mark a target in Short Range. You may only have one target marked this way. At the start of each of your turns, the target gains one stack of Quickrot and loses 1 health. If the target becomes un-marked, it instantly cures all stacks of Quickrot.',
        'For each stack of Quickrot: Target gets -1 to Attack Rolls at [Medium Range] or [Long Range].',
        'For every 2 Stacks of Quickrot: Target gets -1 to Attack Rolls at [Short Range].',
        'For every 2 Stacks of Quickrot: Target gets a stack of [Slow 1].',
        'Target Gains “Weak Metal X”, where X is the number of stacks of Quickrot divided by 4.',
      ],
    },
    {
      name: 'Lifesap Coil',
      tags: ['Arcane', 'Relic', 'One-Handed', 'Maneuver'],
      description: '',
      effects: [
        'As a Maneuver, you may attach the Lifesap Coil to a creature within [Melee Range].',
        'You may retrieve the Lifesap Coil within [Short Range] as a Free Interaction.',
        'Whenever a creature with the Lifesap Coil is dealt damage, you heal half of that damage unless it is Soulrend Damage. You then gain Corruption equal to half of the healing.',
      ],
    },
    ],
    trainings: [],
  },

  warrior: {
    name: 'Warrior',
    description: "The warrior hears the primal call of battle. They take of their weapon and armor, and charge into the fray, ready to take on any foe.",
    weapons: [{
      ...deepCopyWeapon(sword),
      name: 'Wildcall Sword',
    },
    {
      name: 'Entangle Vine',
      tags: ['Arcane'],
      attackModes: [{
        tags: ['Short Range', 'Thrown Attack'],
        damage: {
          l: { value: 1, type: 'Verdant' },
          m: { value: 2, type: 'Verdant' },
          h: { value: 3, type: 'Verdant' },
        },
        effects: ['On a hit, the target is [Slowed 1].'],
      }],
    }],
    items: [{
      name: 'Underbark Armor',
      tags: ['Armor'],
      description: 'Armor made from the bark of the nethertrees.',
      effects: ['Gain [Resist Chthonic 2] and [Absorb Abyssal 2].'],
    }],
    trainings: [{
      name: 'Primal Fury',
      tags: ['Melee'],
      effects: ['Gain +2 to Hit Checks on [Melee Attacks].'],
    },
    {
      name: 'Feral Cry',
      tags: [],
      effects: ['As an Action, you let out a feral cry. All enemies in your front arc at [Short Range] must make an [Endurance] Skill Check. On a Minor Success or less, they begin to focus you instead of your allies. Each target moves away 2 hexes or towards 2 hexes, your choice.'],
    }],
  },
  
  prototype: {
    name: 'Prototype',
    description: "The prototype kit is for ",
    weapons: [{
      name: 'Prototype Beam Rifle',
      tags: ['Heavy', 'Two-Handed'],
      attackModes: [
        {
          name: 'Beam',
          tags: ['Medium Range', 'Long Range', 'Shooting Attack'],
          damage: {
            l: { value: 3, type: 'Infernal' },
            m: { value: 6, type: 'Infernal' },
            h: { value: 9, type: 'Infernal' },
          },
          effects: ['This weapon hits all creatures in a line from you to the target.'],
        },
        {
          name: 'Erupt',
          tags: ['Short Range', 'Shooting Attack'],
          damage: {
            l: { value: 1, type: 'Infernal' },
            m: { value: 3, type: 'Infernal' },
            h: { value: 6, type: 'Infernal' },
          },
          effects: ['This weapon hits all creatures in a cone in front of you.'],
        },
        {
          name: 'Overcharge',
          tags: ['Long Range', 'Shooting Attack'],
          damage: {
            l: { value: 12, type: 'Infernal' },
            m: { value: 12, type: 'Infernal' },
            h: { value: 12, type: 'Infernal' },
          },
          effects: ['This attack mode can be used only once per encounter. Gain 5 Corruption.']
        }
      ],
    },
    {...pistol}],
    items: [{
      name: 'Prototype Teleporter',
      tags: ['Maneuver'],
      description: 'A small device that can connect pieces of the eternal Hells.',
      effects: ['As a Maneuver, you can teleport to any hex within [Medium Range] of you, even if it is not in line of sight. The device must recharge, and cannot be used again for 2 encounters.'],
    }],
    trainings: [],
  },
};

exObj.demonHunter.weapons[1].attackModes[0].damage.l.type = 'Nethercurrent';
exObj.demonHunter.weapons[1].attackModes[0].damage.m.type = 'Nethercurrent';
exObj.demonHunter.weapons[1].attackModes[0].damage.h.type = 'Nethercurrent';
exObj.demonHunter.weapons[1].attackModes[0].effects = [
  ...(pistol.attackModes[0]?.effects ?? []),
  'When you hit a creature with this attack, you may move 1 hex towards them.'
];

exObj.warrior.weapons[0].attackModes[0].damage.l.type = 'Verdant';
exObj.warrior.weapons[0].attackModes[0].damage.m.type = 'Verdant';
exObj.warrior.weapons[0].attackModes[0].damage.h.type = 'Verdant';
exObj.warrior.weapons[0].attackModes[0].effects = [
  ...(sword.attackModes[0]?.effects ?? []),
  '?????'
];

export default exObj;