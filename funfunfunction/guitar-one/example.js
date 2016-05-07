"use strict";

class Funfunfunctions {
	constructor() {}
	
	flatten(inputObj) {
		return JSON.stringify(inputObj, 0, 2)
	}

	show(showObj) {
		console.log("\n\n\t ***** :: Showing :: *****\n " + this.flatten(showObj) )
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

fun.show(names)



























































