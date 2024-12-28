import { occurrences } from "./containers";

export const braced = (buffer: string, left = "(", right = ")"): boolean => {
  const chars = buffer.split("");
  return occurrences(chars, left) === occurrences(chars, right);
};
