import { DamageElement } from "./types";

type Injury = {
  name: string;
  description: string;
}

type InjuryRow = {
  result: {
    min: number;
    max: number;
  },
  injury: {
    light: Injury;
    serious: Injury;
    critical: Injury;
  }
};

type DealWithTheDevilRow = {
  result: number;
  name: string;
  boon: string;
  cost: string;
}

type FactionEffectsRow = {
  name: string;
  primary: DamageElement;
  absorb: DamageElement;
  weaknesses: DamageElement[];
  special: JSX.Element;
}

export type { Injury, InjuryRow, DealWithTheDevilRow, FactionEffectsRow };