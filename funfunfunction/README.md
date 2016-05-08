# Functional Programming Concepts 
	Source : https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84

## Higher Order Functions
	Functions are values.
	Composition : Taking one function, and putting it into another function 
	Example : Filter , Map etc etc


### Filter 
	[ _ARRAY_ ] => transform to => [ smaller_ARRAY_ ] 
	Consider example :
		let dogs = animals.filter(function(animals){
				return animals.species === 'dog'
			})
	The Above example is a filter function to only return animals which have species specified as 'dog'
	
	Filters, accepts one arguement, which is another function. And is used over an array object.
	
	Functions like this, that you send into other functions, are called CALLBACK functions. This is because the hose function will eventually call back to them.

	Filter will loop through each item in the array. And for each item it will pass it into, the CALLBACK function. 

	Filter will then expect the CALLBACK to return either a TRUE or FALSE, to tell teh filter function weather that ITEM will be into the NEW-FILTERED-ARRAY.


### REJECT
	Polar opposite of filter.


### MAP
	[ _ARRAY_ ] => transform to => [ ARRAY_OF_SAME_LENGTH_ANY_ITEM ] 
	It goes throug hhe array and transforms them.
	
	MAP expects the callback function to return a transormed object. 
	
	This CALLBACL object, or return object, does not necessarily habe to be the subset of the existing object. It can be ANY object.


### FIND
	[ _ARRAY_ ] => transform to => SINGLE_ITEM


### REDUCE
	It is the multi-tool of list transformation
	It is a fall-back list transsformation, if you can not find any pre-build list tranformation.
	It can reduce it to any thing. Can be a number, list, array or a complex onject