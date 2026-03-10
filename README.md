# 📘 JavaScript Basic Concepts

## 1️⃣ Difference between `var`, `let`, and `const`

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they behave differently.

### `var`

* `var` is function scoped.
* Can be redeclared and updated.

```javascript
var name = "Arnob";
var name = "Niloy"; // redeclared
```

### `let`

* Block scoped.
* Can be updated but not redeclared.

```javascript
let age = 20;
age = 21; // allowed
```

### `const`

* Block scoped.
* Cannot be updated or redeclared.

```javascript
const country = "Bangladesh";
```

---

## 2️⃣ Spread Operator (`...`)

Used to expand elements of an array or object.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const newArray = [...arr1, ...arr2]; // [1, 2, 3, 4]

const user = { name: "Arnob" };
const info = { age: 20 };
const profile = { ...user, ...info };
```

---

## 3️⃣ Difference between `map()`, `filter()`, and `forEach()`

### `map()`

* Returns a new array.
* Transforms each element.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2); // [2, 4, 6]
```

### `filter()`

* Returns a new array with elements that match a condition.

```javascript
const even = numbers.filter(num => num % 2 === 0); // [2]
```

### `forEach()`

* Executes a function for each element.
* Does not return a new array.

```javascript
numbers.forEach(num => console.log(num));
```

---

## 4️⃣ Arrow Function

Shorter way to write functions.

```javascript
const add = (a, b) => a + b;
```

---

## 5️⃣ Template Literals

Used to create strings with variables inside using backticks.

```javascript
const name = "Arnob";
const age = 20;
const message = `My name is ${name} and I am ${age} years old.`;
```

---
