const person: string = 'Andrés Caro';

// ************************** Inference **************************
const a = 1;
const b = 5;
const c = a + b;
// Here c is a number because typescript compiler detects that a and b are also numbers

// ************************** any **************************
let obj: any = { x: 0 };
obj.bar = 100;
obj = 'Hello';
const n: number = obj;
console.log(typeof obj, obj);
console.log(typeof n, n);

// ************************** Functions **************************

function greet(name: string) {
	console.log(`Hello ${name}`);
}
greet('Andrew');
// greet(5)

function greeting1({ name, age }: { name: string; age: number }) {
	console.log(`Hello ${name}. You're ${age} years old!`);
}
greeting1({ name: 'Andrew', age: 33 });

function greeting2(person: { name: string; age: number }) {
	const { name, age } = person;
	console.log(`Hello ${name}. You're ${age} years old!`);
}
greeting1({ name: 'Andrew', age: 33 });

function sum(x: number, y: number): string {
	return `The sum of ${x} and ${y} is ${x + y}`;
}
console.log(sum(3, 6));

// ************************** Arrow functions **************************

const runFunction = (fn: (name: string) => void) => {
	fn('Andrew');
};
runFunction((name: string) => {
	console.log(`Hello ${name}`);
});

const multiply = (x: number, y: number): number => {
	return x * y;
};
console.log(multiply(3, 6));

const multiply2: (x: number, y: number) => number = (x, y) => {
	return x * y;
};

// ************************** Never **************************
const throwError = (message: string): never => {
	throw new Error(message);
};

// ************************** Anonymous functions with context **************************
const heros = ['Batman', 'Superman', 'Spiderman'];

heros.forEach((hero) => {
	console.log(hero);
});

// ************************** Objects **************************

let hero = {
	name: 'Iron man',
	age: 42,
};

function createHero(name: string, age: number): { name: string; age: number } {
	return {
		name,
		age,
	};
}

let thor = createHero('Thor', 1500); // We do not know if this is a hero. For that, we need...

// ************************** Type Alias **************************

type Hero = {
	name: string;
	age: number;
};

// -- Form 1 to implement the type alias in a function --
function createHero2(name: string, age: number): Hero {
	return {
		name,
		age,
	};
}

let thor2 = createHero2('Thor', 1500); // Now we know that thor is a hero

// -- Form 2 to implement the type alias in a function --
function createHero3(hero: Hero): Hero {
	const { name, age } = hero;
	return {
		name,
		age,
	};
}

let thor3 = createHero3({ name: 'Thor', age: 1500 }); // Now we know that thor is a hero

// ************************** Optional properties **************************

type PowerSet = {
	name: string;
	powerOne: string;
	bonusPower?: string;
};

let powerSetX: PowerSet = {
	name: 'Power Set X',
	powerOne: 'Super strength',
	/* bonusPower: 'Flight', */
};

function createPowerSet(name: string, powerOne: string): PowerSet {
	return {
		name,
		powerOne,
		bonusPower: 'None',
	};
}

// ************************** Optional Chaining Operator **************************
let xyz = powerSetX.bonusPower?.toLowerCase(); // Check the existence of the property before calling it with the ? operator

// ************************** Mutability **************************

type Mutability = {
	name: string;
	readonly age: number;
};

let mutabilityObject: Mutability = {
	name: 'Andrew',
	age: 33,
};

mutabilityObject.name = 'Andrés';
// mutabilityObject.age = 34; // Error because age is readonly

// ************************** Template Union Types **************************

// Example 1

type Status = 'active' | 'inactive' | 'pending';

let account: Status = 'active'; // It's ok because 'active' is a valid value in the Status type
// let account: Status = 'closed'; // Error because 'closed' is not a valid value in the Status type

// Example 2

type petId = `${string}-${string}-${string}-${string}-${string}`;

type pet = {
	id: petId;
	name: string;
	color: string;
};

let myPet: pet = {
	id: crypto.randomUUID(),
	name: 'Rex',
	color: 'Brown',
};

// ************************** Intersection Types **************************

type Human = {
	name: string;
	age: number;
};

type SuperHero = {
	power: string;
};

type SuperHuman = Human & SuperHero;

let superman: SuperHuman = {
	name: 'Clark Kent',
	age: 33,
	power: 'Super strength',
};

// ************************** Type Indexing **************************

type villain = {
	name: string;
	age: number;
	address: {
		street: string;
		planet: string;
		universe: string;
	};
};

// So we can create the type VillainAddress to use it in other parts of the code...
type VillainAddress = villain['address'];

// ... or we can use it directly in the code
let address: villain['address'] = {
	street: 'Main St',
	planet: 'Earth',
	universe: 'Marvel',
};

// ************************** Type from object **************************

let car = {
	make: 'Toyota',
	model: 'Corolla',
	year: 2015,
};

type Car = typeof car;

let myCar: Car = {
	make: 'Tesla',
	model: 'S',
	year: 2042,
};

// ************************** Type from function **************************

function bookGenerator(title: string, author: string, year: number) {
	return {
		title,
		author,
		year,
	};
}

type Book = ReturnType<typeof bookGenerator>;

let myBook: Book = {
	title: 'The Hobbit',
	author: 'J.R.R. Tolkien',
	year: 1937,
};

// ************************** Arrays **************************

//const tasks = []; // It would have a type of never[] because it is an empty array, so we need to specify the type of the array as below
const tasks: string[] = [];
tasks.push('Do the laundry');
tasks.push('Buy groceries');
tasks.push('Clean the house');

// If we want to allow different types in the array, we can use the union type. Not recommended because it's better to use objects or tuples
// const mixedTasks: string[] | number[] = []; // This is wrong because it's not an array of strings AND numbers, it's an array full of strings OR numbers. (Depends on what we want)
const mixedTasks: (string | number)[] = [];
mixedTasks.push('Do the laundry');
mixedTasks.push(5);

// And we can have an Array of the type we created
const arrayHeroes: Hero[] = [];
arrayHeroes.push({ name: 'Batman', age: 33 });

// ************************** Matrixes and Tuples **************************

// Let's supose we want to create the game "Tic Tac Toe" and we want to store the board in a matrix
let ticTacToe: string[][] = [
	['X', 'O', 'X'],
	['O', 'X', 'O'],
	['O', 'X', 'X'],
];

// ... but that way is not the best because we can have a matrix with different sizes. So we can use tuples
let ticTacToe2: [string, string, string][] = [
	['X', 'O', 'X'],
	['O', 'X', 'O'],
	['O', 'X', 'X'],
];

// ... and we can use type alias to make it more readable
type TicTacToeValue = 'X' | 'O' | '';
type TickTacToeRow = [TicTacToeValue, TicTacToeValue, TicTacToeValue];
type TickTacToeBoard = [TickTacToeRow, TickTacToeRow, TickTacToeRow];

// ... and we can use it in the code
let ticTacToeGame: TickTacToeBoard = [
	['X', 'O', 'X'],
	['O', 'X', 'O'],
	['O', 'X', 'X'],
];

// ... with this, we can't have a matrix with different sizes or values that are not 'X', 'O' or '' like:
// let ticTacToeGame: TickTacToeBoard = [
// 	['X', 'A', 'X'], // Error because this row has a value that is not 'X', 'O' or ''
// 	['O', 'X', 'O'],
// 	['O', 'X', 'X', 'O'], // Error because this row has 4 values
// ];

// ************************** Tuple **************************

// Example with react useState

// Normally, the useState hook is used like this without typescript:
//const [count, setCount] = useState(0);

// Now, with typescript, we can use it like this:
// type Counter = [number, (count: number) => void];
// const [count, setCount] = useState(0);
