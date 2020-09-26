export default function fmrt(name: string) {
  if (name !== null && name !== undefined) {
    const newSentece = name.replace(/_/g, ' ').toLowerCase();
    return newSentece[0].toUpperCase() + newSentece.slice(1);
  }
}
