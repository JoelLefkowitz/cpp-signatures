import { Lambda } from "./Lambda";
import { Parameter } from "./Parameter";
import { Parser } from "../models/parser.model";
import { isNil } from "ramda";

export class Signature implements Parser<Signature> {
  static pattern = /^([^\s]+?)\s+([^\s]+?)\s*\((.*)?\)\s*(const)?$/;

  name: string;

  inputs: Parameter[];
  output: Parameter;

  constant: boolean;

  constructor(raw: string) {
    const groups = Signature.pattern.exec(raw);

    if (isNil(groups)) {
      throw new Error(`Could not parse ${raw}`);
    }

    const [_, output, name, inputs, constant] = groups;

    this.name = name ?? "";
    this.inputs = inputs
      ? Parameter.split(inputs).map((i) => new Parameter(i.trim()))
      : [];

    this.output = new Parameter(output ?? "");
    this.constant = !isNil(constant);
  }

  dump() {
    const tokens = [
      this.output.dump(),
      " ",
      this.name,
      "(",
      this.inputs.map((i) => i.dump()).join(", "),
      ")",
    ];

    if (this.constant) {
      tokens.push(" ", "const");
    }

    return tokens.join("");
  }

  format() {
    return (this.inputs.length > 0 ? this.inputs : [new Parameter("void")])
      .concat(this.output)
      .map((i) =>
        Lambda.pattern.exec(i.typename)
          ? ["(", new Lambda(i.typename).format(), ")"].join("")
          : i.format(),
      )
      .join(" -> ");
  }
}
