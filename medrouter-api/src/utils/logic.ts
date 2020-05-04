export function nXorNull(a: any, b: any): boolean {
  return (a === null && b === null) || (a !== null && b !== null);
}

export function xOrNull(a: any, b: any): boolean {
  return (a === null && b !== null) || (a !== null && b === null);
}

//TESTES
const a = {};
const b = null;

console.log(nXorNull(a, b));
