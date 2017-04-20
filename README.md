# Switz - Yet another switch-like control structure.

It's just a wheel reinventing.

Switch-like control structure written in TypeScript.

## Installation

```
$ npm install --save switz
```

## Usage

Example: [switch - JavaScript](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch)

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

See also: [test codes](https://github.com/y13i/switz/tree/master/test)
