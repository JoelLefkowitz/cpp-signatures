import { Signature } from "./Signature";

describe("Signature", () => {
  it.each([
    "void nothing()",
    "int increment(int x)",
    "int increment(const int &x)",
    "int increment(const int &x) const",
    "F map(std::function<A(A)> mapper, F vec)",
  ])('parses "%s"', (raw) => {
    expect(new Signature(raw).dump()).toBe(raw);
  });

  it.each(["", "int", "int()"])('rejects "%s"', (raw) => {
    expect(() => new Signature(raw)).toThrow(`Could not parse ${raw}`);
  });

  it.each([
    {
      raw: "void nothing()",
      formatted: "void -> void",
    },
    {
      raw: "int increment(int x)",
      formatted: "int -> int",
    },
    {
      raw: "int increment(const int &x)",
      formatted: "const int & -> int",
    },
    {
      raw: "FA map(std::function<A(A)> mapper, FA vec)",
      formatted: "(A -> A) -> FA -> FA",
    },
    {
      raw: "FA map(const std::function<A(A)> &mapper, FA vec)",
      formatted: "(A -> A) -> FA -> FA",
    },
    {
      raw: "E map(const std::function<D(A, B, C)> &mapper)",
      formatted: "(A -> B -> C -> D) -> E",
    },
  ])('formats "$raw" to "$formatted"', ({ raw, formatted }) => {
    expect(new Signature(raw).format()).toBe(formatted);
  });
});
