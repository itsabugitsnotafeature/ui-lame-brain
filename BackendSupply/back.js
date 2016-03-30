var request = require('request');
var Q = require("q");

var loginPayload = {
    username: 'righthookjab',
    password: 'okcupidd0tc0m',
    okc_api: 1
};

var loginHeaders_Get = {
    'method': 'GET',
    'path': '/login',
    'scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, sdch',
    'accept-language': 'en-US,en;q=0.8',
    'cookie': '__cfduid=d9dd0a1796ac1a3af490cc72a0b0614a31457618015; authlink=2eedfce0; signup_exp_2014_09_13=2014_simpleblue; override_session=0; session=4189691054006106998%3a5041153874916367572; nano=k%3Diframe_prefix_lock_-1%2Ce%3D1457705757603%2Cv%3D1',
    'referer': 'https://www.okcupid.com/login',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
};

var loginHeaders_Post = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, sdch',
    'accept-language': 'en-US,en;q=0.8',
    'cookie': '__cfduid:d9dd0a1796ac1a3af490cc72a0b0614a31457618015; authlink=2eedfce0; signup_exp_2014_09_13=2014_simpleblue; override_session=0; session=4189691054006106998%3a5041153874916367572; nano=k%3Diframe_prefix_lock_-1%2Ce%3D1457705757603%2Cv%3D1',
    'referer': 'https://www.okcupid.com/login',
    'upgrade-insecure-requests': 1,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
};

var quickMatchHeaders = {
	'cookie'	: '__cfduid=d6f860b052b27e03acc0906152a6136a71457814366; signup_exp_2014_09_13=2014_simpleblue; override_session=0; session=4189691054006106998%3a5041153874916367572; authlink=2eedfce0'
}

var userIdMap = ['13399857601778960028','11034283835073135267','3667072311429765207','268518740401639235','14257732343757467160','3588118366650315814','9470056284635913955','170268963133241204','367552241516525649','6089078098557208554','750896838680465959','6074315924206687791','16583042956239662902','394099262064065688','17142823878789728301','10016895140522101962','242218633549595025','362227273465464228','18137818147218496751','14150754541117692950','18219866272303051408'];

var CH_OKC_API 			= 1,
	CH_REACT_ID			= 1, 
	CH_TARGET_USER_ID	= '',
	CH_EXCLUDE 			= '',
	CH_TEXT_QUEUE 		= null,
	CH_VOTE_TYPE 		= 'personality',
	CH_SCORE 			= 4, 
	quickMatchUrlTemplate = 'http://www.okcupid.com/quickmatch?okc_api=CH_OKC_API&react=CH_REACT_ID&target_userid=CH_TARGET_USER_ID&exclude=CH_EXCLUDE&vote_type=CH_VOTE_TYPE&text_queue=CH_TEXT_QUEUE&score=CH_SCORE';


/**
 * Main Method
 */
function main() {
    var that = this;
    printLog("\n\n Here we go ! ");

    var target	= '7850659575138706597';

    var matchUrl = constructQuickmatchUrl(target);
    printLog("\n\n URL to Hit is   " + matchUrl );
    printLog("\n\n Template URL is   " + quickMatchUrlTemplate );

};

var constructQuickmatchUrl = function (target) {
	var tmpUrl =  quickMatchUrlTemplate;
	CH_TEXT_QUEUE = userIdMap.toString().replace(new RegExp(',', 'g'), '%2C');


	tmpUrl = tmpUrl.replace('CH_OKC_API',CH_OKC_API);
	tmpUrl = tmpUrl.replace('CH_REACT_ID',CH_REACT_ID);
	tmpUrl = tmpUrl.replace('CH_TARGET_USER_ID',target);
	tmpUrl = tmpUrl.replace('CH_EXCLUDE',target);
	tmpUrl = tmpUrl.replace('CH_TEXT_QUEUE',CH_TEXT_QUEUE);
	tmpUrl = tmpUrl.replace('CH_VOTE_TYPE',CH_VOTE_TYPE);
	tmpUrl = tmpUrl.replace('CH_SCORE',CH_SCORE);

	return tmpUrl;

};







/*
 *  Function : Makes GET request for user defined URL
 */
var makePost = function(postUrl, payload) {

    var deferred = Q.defer();

    printLog("Making POST Request for URL ");
    printLog("URL :: " + getUrl);

    request(getUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            deferred.resolve(body);
        } else {
            deferred.resolve("ERROR Making Get Call to URL :" + getUrl);
        }
    })
    return deferred.promise;
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
        } else {
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
    printLog("Request Headers :" + JSON.stringify(options.headers));

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            deferred.resolve(response);
        } else {
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
 * Method to make api call
 */
function back() {
    var that = this;

    var okcGetLoginOptions = {
        // url: 'http://www.okcupid.com/login',
        url: 'http://www.google.com/',
        headers: ''
    };

    okcGetLoginOptions.headers = loginHeaders_Get;
    // printLog("UD 1:" + that.loginHeaders_Get);
    // printLog("UD 2:" + JSON.stringify(loginHeaders_Get) );

    var getter = getRequest(okcGetLoginOptions);

    printLog("ok I have started ");

    getter
        .then(function(resp) {
            printLog("\n\n");
            printLog(" \n\n Here is the response received :: " + JSON.stringify(resp));
        })
        .then(function() {
            printLog(" \n\n   THEE ENDDDDDD ");
        })
};



main();
