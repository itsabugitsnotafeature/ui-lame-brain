"use strict";

class Funfunfunctions {
	constructor() {}
	
	flatten(inputObj) {
		return JSON.stringify(inputObj, 0, 2)
	}

	show(showObj) {
		console.log("\n\n\t ***** :: Showing :: *****\n " + showObj)
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
	Implementation # 1
*/
let dogs = animals.filter( function(eachAnimal) {
	return eachAnimal.species === 'dog'
})

/*
	Implementation # 2
*/
let alsoDogs = animals.filter(isDog)


fun.show(fun.flatten(animals))
fun.show(fun.flatten(dogs))
fun.show(fun.flatten(alsoDogs))
