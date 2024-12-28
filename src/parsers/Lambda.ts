import { Parameter } from "./Parameter";
import { Parser } from "../models/parser.model";
import { isNil } from "ramda";

export class Lambda implements Parser<Lambda> {
  static pattern = /^std::function<([^\s]+)\((.+)?\)>$/;

  inputs: Parameter[];
  output: Parameter;

  constructor(raw: string) {
    const groups = Lambda.pattern.exec(raw);

    if (isNil(groups)) {
      throw new Error(`Could not parse ${raw}`);
    }

    const [_, output, inputs] = groups;

    this.inputs = inputs
      ? inputs.split(",").map((i) => new Parameter(i.trim()))
      : [];

    this.output = new Parameter(output ?? "");
  }

  dump() {
    return [
      "std::function",
      "<",
      this.output.dump(),
      "(",
      this.inputs.map((i) => i.dump()).join(", "),
      ")",
      ">",
    ].join("");
  }

  format() {
    return (this.inputs.length > 0 ? this.inputs : [new Parameter("void")])
      .concat(this.output)
      .map((i) => i.format())
      .join(" -> ");
  }
}
