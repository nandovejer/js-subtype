# js-subtype

[![npm version](https://badge.fury.io/js/js-subtype.svg)](https://badge.fury.io/js/js-subtype)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

`js-subtype` is a lightweight library that allows you to determine JavaScript subtypes, making it easy to identify the exact type of an object (like `Array`, `Date`, etc.).

## Features

- Supports multiple subtypes (`Array`, `Date`, `Map`, `RegExp`, etc.).
- Lightweight and easy to use.
- Zero dependencies.
- Works in both Node.js and modern browsers.

## Installation

Install using npm:

```bash
npm install js-subtype
```

Or with yarn:

```bash
yarn add js-subtype
```

## Usage

Here’s a quick example of how to use `js-subtype`:

```javascript
const { getType } = require("js-subtype");

console.log(getType([1, 2, 3])); // Output: "Array"
console.log(getType(new Date())); // Output: "Date"
console.log(getType(/regex/)); // Output: "RegExp"
```

### API

#### `getType(value)`

Returns a string representing the subtype of the given value.

- **Parameters**:
  - `value`: Any JavaScript value.
- **Returns**: The string subtype (`Array`, `Date`, `Map`, etc.).

## Use Cases

### Advanced Type Validation

Use `js-subtype` to validate inputs or types precisely in your applications:

```javascript
function validateInput(input) {
  if (getType(input) !== "Array") {
    throw new Error("Input must be an array.");
  }
  // Additional logic...
}
```

### Identifying Native JavaScript Objects

Determine the exact native type of an object, such as `Map` or `Set`:

```javascript
console.log(getType(new Map())); // Output: "Map"
console.log(getType(new Set())); // Output: "Set"
```

## Contribution

We welcome contributions! Please submit a pull request or open an issue if you encounter any problems. Make sure to follow the guidelines outlined in the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the [MIT License](LICENSE).
