import { Parser } from "../models/parser.model";
import { braced } from "../services/strings";
import { dropLast, isNil } from "ramda";

export class Parameter implements Parser<Parameter> {
  static pattern = /^(const)?\s*([^\s&*]+)\s*([&*])?\s*([^\s&*]+)?$/;

  name: string | null;
  typename: string;

  constant: boolean;
  reference: boolean;
  pointer: boolean;

  static split(inputs: string): string[] {
    const { arr } = inputs
      .split(",")
      .reduce<{ arr: string[]; buffer: string | null }>(
        ({ arr, buffer: carried }, x) => {
          const buffer = carried ? [carried, x.trim()].join(",") : x;
          return braced(buffer, "<", ">")
            ? { arr: arr.concat(buffer), buffer: null }
            : { arr, buffer };
        },
        {
          arr: [],
          buffer: null,
        },
      );

    return arr;
  }

  constructor(raw: string) {
    const groups = Parameter.pattern.exec(raw);

    if (isNil(groups)) {
      throw new Error(`Could not parse ${raw}`);
    }

    const [_, constant, typename, pass, name] = groups;

    this.name = name ?? null;
    this.typename = typename ?? "";
    this.constant = !isNil(constant);
    this.reference = pass === "&";
    this.pointer = pass === "*";
  }

  dump() {
    const tokens = [this.typename];

    if (this.constant) {
      tokens.unshift("const", " ");
    }

    if (this.reference) {
      tokens.push(" ", "&");
    }

    if (this.pointer) {
      tokens.push(" ", "*");
    }

    if (this.name) {
      tokens.push(this.reference || this.pointer ? "" : " ", this.name);
    }

    return tokens.join("");
  }

  format() {
    const dumped = this.dump();
    return this.name && dumped.endsWith(this.name)
      ? dropLast(this.name.length, dumped).trim()
      : dumped;
  }
}
