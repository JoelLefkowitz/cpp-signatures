export const occurrences = <T>(arr: T[], match: T): number =>
  arr.filter((i) => i === match).length;
