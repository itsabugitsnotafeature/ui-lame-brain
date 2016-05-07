# Functional Programming Concepts 
	Source : https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84

## Higher Order Functions
	Functions are values.
	Composition : Taking one function, and putting it into another function 
	Example : Filter , Map etc etc


## Filter 
	Consider example :
		let dogs = animals.filter(function(animals){
				return animals.species === 'dog'
			})
	The Above example is a filter function to only return animals which have species specified as 'dog'
	
	Filters, accepts one arguement, which is another function. And is used over an array object.
	
	Functions like this, that you send into other functions, are called CALLBACK functions. This is because the hose function will eventually call back to them.

	Filter will loop through each item in the array. And for each item it will pass it into, the CALLBACK function. 

	Filter will then expect the CALLBACK to return either a TRUE or FALSE, to tell teh filter function weather that ITEM will be into the NEW-FILTERED-ARRAY.

