export function fmrt(name: string) {
  const newSentece = name.replace(/_/g, " ").toLowerCase();
  return newSentece[0].toUpperCase() + newSentece.slice(1);
}
