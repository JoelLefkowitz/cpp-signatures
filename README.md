# C++ Signatures

C++ function signature parsers.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/cpp-signatures/review.yml)
![Version](https://img.shields.io/npm/v/cpp-signatures)
![Downloads](https://img.shields.io/npm/dw/cpp-signatures)
![Size](https://img.shields.io/bundlephobia/min/cpp-signatures)
![Quality](https://img.shields.io/codacy/grade/b4552a9c503046d399cd1973bb28c286)
![Coverage](https://img.shields.io/codacy/coverage/b4552a9c503046d399cd1973bb28c286)

## Motivation

C++ is [really hard](https://en.wikipedia.org/wiki/Most_vexing_parse) to parse. However, we can still use regular expressions to tokenise _some_ common expressions:

```ts
import { Signature } from "cpp-signatures";

const signature = new Signature("F map(std::function<A(A)> mapper, F vec)");

console.log(signature);
```

```json
{
  "name": "map",
  "inputs": [
    {
      "name": "mapper",
      "typename": "std::function<A(A)>"
    },
    {
      "name": "vec",
      "typename": "F"
    }
  ],
  "output": {
    "name": null,
    "typename": "F"
  }
}
```

We can also format the signatures to Haskell style type signatures:

```ts
new Signature("int increment(const int& x)").format();
```

```json
"const int& -> int"
```

This includes lambda expressions:

```ts
new Signature("FA map(const std::function<A(A)>& mapper, FA vec)").format();
```

```json
"(A -> A) -> FA -> FA"
```

Note we have omitted the `const` and `&` from `const (A -> A)&` for brevity.

## Installing

```bash
npm install cpp-signatures
```

## Documentation

Documentation and more detailed examples are hosted on [Github Pages](https://joellefkowitz.github.io/cpp-signatures).

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
