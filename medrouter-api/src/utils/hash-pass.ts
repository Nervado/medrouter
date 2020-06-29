export function generatePass() {
  const randomstring = Math.random()
    .toString(36)
    .slice(-8);

  return '@A' + randomstring;
}
