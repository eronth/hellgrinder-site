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

export type { Injury, InjuryRow, DealWithTheDevilRow };