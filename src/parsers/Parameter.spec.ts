import { Parameter } from "./Parameter";

describe("Parameter", () => {
  it.each([
    "int",
    "int&",
    "int*",
    "int x",
    "int& x",
    "int* x",
    "const int",
    "const int&",
    "const int*",
    "const int x",
    "const int& x",
    "const int* x",
  ])('parses "%s"', (raw) => {
    expect(new Parameter(raw).dump()).toBe(raw);
  });

  it.each([
    "",
    "int x _",
    "_ int x",
    "const int x _",
    "int&& x",
    "int** x",
    "int&* x",
  ])('rejects "%s"', (raw) => {
    expect(() => new Parameter(raw)).toThrow(`Could not parse ${raw}`);
  });

  it.each([
    {
      raw: "int",
      formatted: "int",
    },
    {
      raw: "int&",
      formatted: "int&",
    },
    {
      raw: "int*",
      formatted: "int*",
    },
    {
      raw: "int x",
      formatted: "int",
    },
    {
      raw: "int& x",
      formatted: "int&",
    },
    {
      raw: "int* x",
      formatted: "int*",
    },
    {
      raw: "const int",
      formatted: "const int",
    },
    {
      raw: "const int&",
      formatted: "const int&",
    },
    {
      raw: "const int*",
      formatted: "const int*",
    },
    {
      raw: "const int x",
      formatted: "const int",
    },
    {
      raw: "const int& x",
      formatted: "const int&",
    },
    {
      raw: "const int* x",
      formatted: "const int*",
    },
  ])('formats "$raw" to "$formatted"', ({ raw, formatted }) => {
    expect(new Parameter(raw).format()).toBe(formatted);
  });
});
