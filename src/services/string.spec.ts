import { braced } from "./strings";

describe("braced", () => {
  it("checks if a string has equal left and right braces", () => {
    expect(braced("")).toBe(true);
    expect(braced("()")).toBe(true);
    expect(braced("(())")).toBe(true);
    expect(braced("(")).toBe(false);
    expect(braced("(()")).toBe(false);
  });
});
