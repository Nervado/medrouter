export function arrayFromObject(data: string[] | any): string[] {
  if (data === null || data === undefined || data[0] === undefined) {
    return [];
  } else {
    return data;
    //.replace('{', '')
    //.replace('}', '')
    //.split(',')
  }
}
