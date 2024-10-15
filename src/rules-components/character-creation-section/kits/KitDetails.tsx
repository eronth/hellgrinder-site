import type { KitType, WeaponType } from '../../../ts-types/types';

const pistol: WeaponType = {
  name: 'Pistol',
  tags: ['One-Handed'],
  attackModes: [{
    tags: ['Short Range', 'Shooting Attack'],
    damage: {
      l: { value: 3, type: 'Metal' },
      m: { value: 6, type: 'Metal' },
      h: { value: 9, type: 'Metal' },
    },
    effects: ['You can make an attack with this weapon targeting an enemy in your flank arc with a -3 penalty to the Hit Check.'],
  }],
};

const combatRifle: WeaponType = {
  name: 'Combat Rifle',
  tags: ['Two-Handed'],
  attackModes: [{
    tags: ['Medium Range', 'Shooting Attack'],
    damage: {
      l: { value: 3, type: 'Metal' },
      m: { value: 6, type: 'Metal' },
      h: { value: 9, type: 'Metal' },
    },
  }],
};

const sniper: KitType = {
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
};

const grenadier: KitType = {
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
};

const flamethrower: KitType = {
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
};

const breachAndClear: KitType = {
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
};

const soldier: KitType = {
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
};

const demonHunter: KitType = {
  name: 'Demon Hunter',
  description: "",
  weapons: [],
  items: [],
  trainings: [],
};

const perky: KitType = {
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
};

const riot: KitType = {
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
};

const helltouched: KitType = {
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
  trainings: [],
};

const relicworker: KitType = {
  name: 'Sniper10',
  description: "The Sniper Kit excels at picking off enemies from a distance, ensuring you're lethal while staying out of harm's way. However, when the fight gets up close and personal, you'll find yourself at a disadvantage. Use the gillie suit to blend into your surroundings, becoming a ghost on the battlefield, unseen until it's too late.",
  weapons: [{
    name: 'Sniper Rifle',
    attackModes: [{
      tags: ['Single Shot', 'Long Range', 'Shooting Attack'],
      damage: {
        l: { value: 2, type: 'Metal' },
        m: { value: 9, type: 'Metal' },
        h: { value: 3, type: 'Metal' },
      },
    }],
  }],
  items: [{
    name: 'Ghillie Suit',
    tags: ['Stealth'],
    description: 'A suit that helps you blend in with your surroundings.',
    effects: ['+1 to Stealth checks'],
  },
  {
    name:'"Sniping Scope',
    tags: [],
    description: 'A scope that helps you see further and more clearly.',
    effects: [''],
  }],
  trainings: [{
    name: 'Long Range Training',
    effect: ['+2 to Hit Checks for [Long Range] attacks'],
  }],
};

export { sniper, grenadier, flamethrower, breachAndClear, soldier, demonHunter, perky, riot, helltouched, relicworker };