1️⃣ Difference between var, let, and const

In JavaScript, var, let, and const are used to declare variables, but they behave differently.

var

var is the older way of declaring variables.

It is function scoped, meaning it works inside the whole function.

It can be redeclared and updated.

Because of these behaviors, it can sometimes cause unexpected bugs.

Example:

var name = "Arnob";
var name = "Niloy"; // redeclared
let

let was introduced in ES6.

It is block scoped (works only inside { }).

It can be updated but cannot be redeclared in the same scope.

Example:

let age = 20;
age = 21; // allowed
const

const is also block scoped.

It cannot be updated or redeclared.

A value must be assigned when it is declared.

Example:

const country = "Bangladesh";
2️⃣ What is the Spread Operator (...)?

The spread operator (...) is used to expand elements of an array or object.

It helps to copy or combine data easily.

Example with arrays:

const arr1 = [1, 2];
const arr2 = [3, 4];

const newArray = [...arr1, ...arr2];
// [1, 2, 3, 4]

Example with objects:

const user = { name: "Arnob" };
const info = { age: 20 };

const profile = { ...user, ...info };
3️⃣ Difference between map(), filter(), and forEach()

These methods are used to work with arrays.

map()

Creates a new array.

Transforms each element.

const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);
// [2, 4, 6]
filter()

Creates a new array with elements that match a condition.

const numbers = [1, 2, 3, 4];

const even = numbers.filter(num => num % 2 === 0);
// [2, 4]
forEach()

Executes a function for each element.

Does not return a new array.

const numbers = [1, 2, 3];

numbers.forEach(num => {
  console.log(num);
});
4️⃣ What is an Arrow Function?

An arrow function is a shorter way to write functions in JavaScript.
It was introduced in ES6 and makes the code cleaner and easier to read.

Example:

Normal function:

function add(a, b) {
  return a + b;
}

Arrow function:

const add = (a, b) => a + b;
5️⃣ What are Template Literals?

Template literals are used to create strings easily and insert variables inside them.

They use backticks ( ) instead of quotes.

Example:

const name = "Arnob";
const age = 20;

const message = `My name is ${name} and I am ${age} years old.`;
