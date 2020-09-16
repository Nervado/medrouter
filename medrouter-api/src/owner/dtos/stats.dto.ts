export class StatsDto {
  finished: Stats;
  canceled: Stats;
  reschedule: Stats;
  returned: Stats;
  onscheduled: Stats;
}

export class Stats {
  percent: number = 0;
  stats: Stat[];
}

export class Stat {
  label: string;
  value: number = 0;
}
