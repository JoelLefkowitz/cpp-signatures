import { occurrences } from "./containers";

describe("occurrences", () => {
  it("counts the number of occurrences of an element", () => {
    const arr = [1, 2, 2, 3, 3, 3];
    expect(occurrences(arr, 1)).toBe(1);
    expect(occurrences(arr, 2)).toBe(2);
    expect(occurrences(arr, 3)).toBe(3);
    expect(occurrences(arr, 4)).toBe(0);
  });
});
