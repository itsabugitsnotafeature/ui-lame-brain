// server.js

// set up ======================================================================
var express			=	require('express');		
var app				=	express();								// create App with express
var mongoose		=	require('mongoose');					// mongoose for mongodb
var port  	 		= process.env.PORT || 8080; 				// set the port
var database 		= require('./config/database'); 			// load the database config

var morgan			=	require('morgan');		// log request to the console (express4)
var bodyParser		=	require('body-parser');	// Pull information from HTML POST (express4)
var methodOverride	=	require('method-override');	// simulate DELETE and PUT (express4)

// Configuration ==========================================================
mongoose.connect(database.url); // Connect to nomgoDB database on modulus.io

app.use(express.static(__dirname + '/public'));			// set the static files location /public/img will be /img for users
app.use(morgan('dev'));									//  log every request to console
app.use(bodyParser.urlencoded({'extended':'true'}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());								// parse application/json 
app.use(bodyParser.json({type: 'application/vnd.api+json'}));	// parse application/vnd.api+json
app.use(methodOverride());								// 

// define model ==========================================================
var Todo = mongoose.model('Todo', {
	text : String,
	done : Boolean
});


// routes ==========================================================
	// 	api --------------------------------------------------------
	// 	get all todos

	app.get('/api/todos', function(req, res) {
		// use mongo to get all todo items from database
		Todo.find(function(err, todos) {
			// if there is an error retrieving, send the error. Nothing after res.send(err) will execute
			if(err)
				res.send(err)

			res.json(todos); // return all todos in JSON format

		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text	: 	req.body.text,
			done	: 	false	
		}, function(err, todo) {
			if(err)
				res.send(err);

			// get and return all the todos after your create another 
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// delete a todo (after marking complete)
	app.delete('/api/todos/:todo_id', function(req,res) {
		Todo.remove({
			_id 	: req.params.todo_id
		}, function(err, todo) {
			if(err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err,todos) {
				if(err)
					res.send(err);
				res.json(todos);
			});
		});
	});



// application ==========================================================
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); //
});




// listen (Start app with node server.js) ==========================================================
app.listen(8080);
console.log("App listening on port 8080");























