export function upAndDownCase(name: string): string[] {
  return [
    name[0].toLowerCase() + name.slice(1),
    name[0].toUpperCase() + name.slice(1),
  ];
}
