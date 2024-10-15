import type { KitType } from '../../../ts-types/types';

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
        h: { value: 3, type: 'Metal' },
      },
      effects: ['After firing, you need to use an Action or Maneuver to reload before you can fire this weapon again.'],
    }],
  }],
  items: [{
    name: 'Ghillie Suit',
    tags: ['Stealth'],
    description: 'A suit that helps you blend in with your surroundings.',
    effects: ['Gain +1 to Stealth checks'],
  },
  {
    name:'"Sniping Scope',
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
  name: 'Sniper2',
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

const flamethrower: KitType = {
  name: 'Sniper3',
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
        m: { value: 4, type: 'Metal' },
        h: { value: 6, type: 'Metal' },
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
    tags: [],
    effects: ['+2 to Hit Checks for [Long Range] attacks'],
  }],
};

const soldier: KitType = {
  name: 'Soldier',
  description: "",
  weapons: [{
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
  }],
  items: [],
  trainings: [{
    name: 'Rounded',
    tags: [],
    effects: ['Choose an additional Support Kit.', 'Start with 1 additional Perk Point.'],
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
  name: 'Sniper7',
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

const riot: KitType = {
  name: 'Sniper8',
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

const helltouched: KitType = {
  name: 'Sniper9',
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