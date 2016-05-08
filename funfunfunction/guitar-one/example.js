"use strict";

let fs = require("fs")

class Funfunfunctions {
	constructor() {}
	
	flatten(inputObj) {
		return JSON.stringify(inputObj, 0, 2)
	}

	show(showObj) {
		console.log("\n\n\t ***** :: Showing :: *****\n " + this.flatten(showObj) )
	}

	print(text) {
		console.log("\n\n\t ##### :: Printing :: #####\n " + text )
	}

	getFileData(filePath) { 
		return fs.readFileSync(filePath,'utf8')
	}

}

let fun = new Funfunfunctions()

let animals = [{
	"name": "John",
	"species": "fish"
	}, {
	"name": "Anna",
	"species": "rabbit"
	}, {
	"name": "triangle",
	"species": "fish"
	}, {
	"name": "ursa",
	"species": "dog"
	}, {
	"name": "caro",
	"species": "cat"
	}, {
	"name": "Peter",
	"species": "dog"
}];

let orders = [
	{ amount : 111},
	{ amount : 222},
	{ amount : 333},
	{ amount : 444},
	{ amount : 555},
	{ amount : 666},
	{ amount : 777},
	{ amount : 888},
	{ amount : 999}
]


let isDog = function(animal) {
	return animal.species === 'dog'
}

/*
	Implementation Filter # 1
*/
let dogs = animals.filter( (eachAnimal) => {
	return eachAnimal.species === 'dog'
})

/*
	Implementation Filter # 2
*/
let alsoDogs = animals.filter(isDog)

// fun.show(animals)
// fun.show(dogs)
// fun.show(alsoDogs)


/*
	Implementation MAP # 1
*/

// let names = animals.map( function (eachAnimal){
// 	return eachAnimal.name + " is a " + eachAnimal.species
// })
// let names = animals.map( function (eachAnimal){ return eachAnimal.name + " is a " + eachAnimal.species })
// let names = animals.map( (eachAnimal) => { return eachAnimal.name + " is a " + eachAnimal.species })
let names = animals.map( (eachAnimal) => eachAnimal.name + " is a " + eachAnimal.species )
// fun.show(names)


/*
	Implementation REDUCE # 1
*/


// let totalAmount = orders.reduce( function( sum, order ){
// 	return sum + order.amount
// },0 )
// let totalAmount = orders.reduce( ( sum, order ) => {return sum + order.amount} ,0 )
let totalAmount = orders.reduce( ( sum, order ) => sum + order.amount ,0 )
// fun.print(totalAmount)


/*
	Implementation REDUCE # 2
*/
let path = 'data/data.txt'

let output = fs.readFileSync(path,'utf8')
				.trim()
				.split('\n')
				.map( line => line.split('\t') )
				.reduce((customers, line) => {
					customers[line[0]] = customers[line[0]] || []
					customers[line[0]].push({
						name: 		line[1],
						profession: line[2],
						salary: 	line[3]
					})
					return customers
				}, {} )


console.log('output', JSON.stringify(output, null, 2))


















































