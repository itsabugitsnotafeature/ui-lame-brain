var request = require('request');
var Q = require("q");

var loginPayload = {
	username 	: 	'righthookjab',
	password 	: 	'okcupidd0tc0m',
	okc_api		: 	1
};

var loginHeaders_Get = {
	'method' 						:'GET', 
	'path'							:'/login', 
	'scheme'						:'https', 
	'accept' 						:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 
	'accept-encoding'				:'gzip, deflate, sdch', 
	'accept-language'				:'en-US,en;q=0.8', 
	'cookie'						:'__cfduid=d9dd0a1796ac1a3af490cc72a0b0614a31457618015; authlink=2eedfce0; signup_exp_2014_09_13=2014_simpleblue; override_session=0; session=4189691054006106998%3a5041153874916367572; nano=k%3Diframe_prefix_lock_-1%2Ce%3D1457705757603%2Cv%3D1', 
	'referer'						:'https://www.okcupid.com/login', 
	'upgrade-insecure-requests'	:'1', 
	'user-agent'					:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
};

var loginHeaders_Post = {
	'accept' 						: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 
	'accept-encoding'				:'gzip, deflate, sdch', 
	'accept-language'				:'en-US,en;q=0.8', 
	'cookie'						: '__cfduid:d9dd0a1796ac1a3af490cc72a0b0614a31457618015; authlink=2eedfce0; signup_exp_2014_09_13=2014_simpleblue; override_session=0; session=4189691054006106998%3a5041153874916367572; nano=k%3Diframe_prefix_lock_-1%2Ce%3D1457705757603%2Cv%3D1', 
	'referer'						:'https://www.okcupid.com/login', 
	'upgrade-insecure-requests'		:1,
	'user-agent'					:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
};



/*
 *  Function : Makes GET request for user defined URL
*/
var makeGet = function(getUrl) {
 	
 	var deferred = Q.defer();

 	printLog("Making Get Request for URL ");
 	printLog("URL :: " + getUrl);

 	request(getUrl, function(error, response, body) {
 		if (!error && response.statusCode == 200) {
 			deferred.resolve(body);
 		}
 		else {
 			deferred.resolve("ERROR Making Get Call to URL :" + getUrl);
 		}
 	})
 	return deferred.promise;
 };




/*
 *  Function : Makes GET request for user defined URL
*/
var getRequest = function(options, callback) {
 	
 	var deferred = Q.defer();

 	printLog("Request URL :" + options.url);
 	printLog("Request Headers :" + JSON.stringify(options.headers)) ;

 	request(options, function(error, response, body) {
 		if (!error && response.statusCode == 200) {
 			deferred.resolve(response);
 		}
 		else {
 			deferred.resolve("ERROR Making Get Call to URL :" + getUrl);
 		}
 	})

 	return deferred.promise;
 };




/*
 *  Prints Console Log.
*/
var printLog = function(logToPrint) {
 	console.log("\n" + logToPrint);
};


/**
 * Main Method
*/
function back() {
	var that = this;

	var okcGetLoginOptions = {
		url: 'http://www.okcupid.com/login',
		headers: ''
	};

	okcGetLoginOptions.headers = loginHeaders_Get;
 	// printLog("UD 1:" + that.loginHeaders_Get);
 	// printLog("UD 2:" + JSON.stringify(loginHeaders_Get) );

 	var getter = getRequest(okcGetLoginOptions);
 	
 	printLog("ok I have started ");
 	
 	getter
 	.then(function(resp){
 		printLog("\n\n");
 		printLog(" \n\n Here is the response received :: " + JSON.stringify(resp));
 	})
 	.then (function(){
 		printLog(" \n\n   THEE ENDDDDDD ");  
 	})

};





 back();