import { AnyNaptrRecord } from 'dns';

export function arrayFromObject(data: string | any): String[] {
  if (data === {} || data === null || data === undefined) {
    return undefined;
  } else {
    return data
      .replace('{', '')
      .replace('}', '')
      .split(',');
  }
}
