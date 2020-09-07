export function fmrt(name: string) {
  if (name !== undefined && name !== null) {
    const newSentece = name.replace(/_/g, " ").toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }
}
