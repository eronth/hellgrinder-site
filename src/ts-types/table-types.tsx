type InjuryType = {
  name: string;
  description: string;
}

type InjuryRow = {
  result: {
    min: number;
    max: number;
  },
  injury: {
    light: InjuryType;
    serious: InjuryType;
    critical: InjuryType;
  }
};

type DealWithTheDevilRow = {
  result: number;
  name: string;
  boon: string;
  cost: string;
}

export type { InjuryType, InjuryRow, DealWithTheDevilRow };