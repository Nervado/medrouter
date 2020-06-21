export function capitalizeAndRemoveUnderscores(sentece: string): string {
  const newSentece = sentece.replace(/_/g, " ");
  return newSentece[0].toUpperCase() + newSentece.slice(1);
}
