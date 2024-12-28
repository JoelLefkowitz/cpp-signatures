import { Lambda } from "./Lambda";

describe("Lambda", () => {
  it.each([
    "std::function<void()>",
    "std::function<int(int)>",
    "std::function<int(int, char)>",
    "std::function<int(const int &)>",
  ])('parses "%s"', (raw) => {
    expect(new Lambda(raw).dump()).toBe(raw);
  });

  it.each([
    "",
    "std::function",
    "std::function<>",
    "std::function<()>",
    "std::function<(int)>",
  ])('rejects "%s"', (raw) => {
    expect(() => new Lambda(raw)).toThrow(`Could not parse ${raw}`);
  });

  it.each([
    {
      raw: "std::function<void()>",
      formatted: "void -> void",
    },
    {
      raw: "std::function<int(int)>",
      formatted: "int -> int",
    },
    {
      raw: "std::function<int(int, char)>",
      formatted: "int -> char -> int",
    },
    {
      raw: "std::function<int(const int &)>",
      formatted: "const int & -> int",
    },
  ])('formats "$raw" to "$formatted"', ({ raw, formatted }) => {
    expect(new Lambda(raw).format()).toBe(formatted);
  });
});
