export class DataGraph {
  PressureS: DataMonth[];
  PressureD: DataMonth[];
}

export class DataMonth {
  month: string;
  value: number;
}

export const months = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];
