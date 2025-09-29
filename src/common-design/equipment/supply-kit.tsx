import { Kit } from "../../ts-types/types";

const exObj: { [key: string]: Kit } = {
  standardIssue: {
    name: 'Standard Issue Equipment',
    description: "This kit contains your standard issue equipment such as"
    + " a flashlight, canteen, flares, rope, and other basic operational gear.",
    weapons: [],
    items: [],
    trainings: [
      {
        name: 'Somewhat Ready',
        tags: [],
        effects: [
          'When you need any basic equipment for a mission, you can always find it in your pack.'
          + ' If you\'ve done this too many times, you may have run out.'
        ]
      }
    ],
  },
};

export default exObj;
