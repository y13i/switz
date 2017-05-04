# Switz - Yet another switch-like control structure.

[![Build Status](https://travis-ci.org/y13i/switz.svg?branch=master)](https://travis-ci.org/y13i/switz)
[![Coverage Status](https://coveralls.io/repos/github/y13i/switz/badge.svg?branch=master)](https://coveralls.io/github/y13i/switz?branch=master)

It's just reinventing the wheel.

Switch-like control structure written in TypeScript.

## Installation

```
$ npm install --save switz
```

## Usage

### Syntax

#### switz

```
switz(subject, statement)
```

`subject` - compared to case conditions.
`statement` - function that determines cases and other behaviors.

#### statement

`statement` will be called with an argument `context`. `context` has `case`, `default` and `matcher` methods.

#### context

- `context.case(condition: any, handler: (match: any) => any)`: Set case with condition and handler function.
- `context.default(handler: () => any)`: Set default handler function.
- `context.matcher(matcher: (subject: T, condition: any) => any)`: Set matcher function used to compare subject and each case's condition. If this returns truthy value, tha case matches.

### Example

[switch - JavaScript](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch)

```javascript
// switz
const switz = require("switz");

switz(expr, s => {
  s.matcher(switz.IncludedMatcher);

  s.case(["Oranges"], () => {
    console.log('Oranges are $0.59 a pound.');
  });

  s.case(["Apples"], () => {
    console.log('Apples are $0.32 a pound.');
  });

  s.case(["Bananas"], () => {
    console.log('Bananas are $0.48 a pound.');
  });

  s.case(["Cherries"], () => {
    console.log('Cherries are $3.00 a pound.');
  });

  s.case(["Mangoes", "Papayas"], () => {
    console.log('Mangoes and papayas are $2.79 a pound.');
  });

  s.default(() => {
    console.log('Sorry, we are out of ' + expr + '.');
  });
});

// Native switch
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Apples':
    console.log('Apples are $0.32 a pound.');
    break;
  case 'Bananas':
    console.log('Bananas are $0.48 a pound.');
    break;
  case 'Cherries':
    console.log('Cherries are $3.00 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    break;
  default:
    console.log('Sorry, we are out of ' + expr + '.');
}
```

Returns matched case's handler output.

```javascript
const value1 = switz("foo", s => {
  s.case("foo", () => "foo!");
  s.case("bar", () => "bar!");
});

console.log(value1); // foo!
```

Can match subject and conditions with preset matcher. Also, can use matcher output as handler input.

```javascript
import switz, {RegexpMatcher} from 'switz';

const message = switz("fooooooooooooooooooooooooooooooo", s => {
  s.matcher(RegexpMatcher);
  s.case(/fo{10,}/, match => `yes, ${match[0].length} "o"s.`);
  s.default(() => "no");
});

console.log(message); // yes, 32 "o"s.
```

Can be used with type parameter in TypeScript.

```typescript
const v = switz<string>("foo", s => {
  s.case("foo", () => "bar");
  s.case("bar", () => "baz");
  s.case("fuz", () => 123); // Type unmatch ERROR!
});
```

Method-chainable.

```javascript
switz("foo", s => s
  .case("foo", () => "bar")
  .case("bar", () => "baz")
);
```

The function `switz` is a wrapper of `Switch` class instance. You can use `Switch` and `Case` class directly if you would like to.

```javascript
const {Switch, Case} = require("switz");
// Or use `import`
import {Switch, Case} from "switz";

const subject = Math.floor(Math.random() * 100);

const mySwitch = new Switch(subject);

mySwitch.setMatcher((s, c) => {
  const min = c[0];
  const max = c[1];

  return min <= s && max >= s;
});

mySwitch.addCase(new Case([0, 50], () => "Between 0-50"));
mySwitch.addCase(new Case([50, 100], () => "Between 50-100"));

console.log(mySwitch.evaluate());
```

See also: [test codes](https://github.com/y13i/switz/tree/master/test)

## Develop

First.

```
$ git clone
$ cd switz
$ yarn
```

Test.

```
$ yarn test
```

Lint.

```
$ yarn run lint
```
