'use strict';
const fetch = require('node-fetch');
let Regex = require("regex");
let chopraRegEx = new Regex(/&quot;(.*)&quot/);
/*
Wisdom URL : http://wisdomofchopra.com/iframe.php#
Wisdom RegEx : &quot;(.*)&quot;
*/

let Wit = null;
try {
  // if running from repo
  Wit = require('../').Wit;
} catch (e) {
  Wit = require('node-wit').Wit;
}

let Visitor = null;
let visitorsList = {};

try {
  Visitor = require('../lib/auntIrma');
} catch (e) {
  console.error('Unable to get Irma Instance.')
}
visitorsList.defaultKryptonite = new Visitor.Irma();

const accessToken = (() => {
  return process.env.WIT_TOKEN ;
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
  Array.isArray(entities[entity]) &&
  entities[entity].length > 0 &&
  entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const print = (msg) => {
  console.log('Debug : \n', JSON.stringify(msg, null, 2 ) ); 
};

const grepWisdom = () => {
  return fetch('http://wisdomofchopra.com/iframe.php#')
  .then(rsp => rsp.text() )
  .then(body => {
    return body;
  });
};

//Define your bot functions here
const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  getForecast({context, entities}) {
    return new Promise(function(resolve, reject) {
      var location = firstEntityValue(entities, 'location')
      if (location) {
        context.forecast = 'sunny in ' + location; // we should call a weather API here
        delete context.missingLocation;
      } else {
        context.missingLocation = true;
        delete context.forecast;
      }
      return resolve(context);
    });
  },
  findTheater({context,entities}) {
    return new Promise(function(resolve, reject) {
      const movie_title = firstEntityValue(entities, 'movie');
      const showtime = firstEntityValue(entities, 'datetime');
      console.log('11 ...', movie_title);               // Broken down query  
      console.log('22 ...', JSON.stringify(context));   // Always Null 
      console.log('33 ...', JSON.stringify(entities));  // Broken down query  

      if (movie_title) {
        context.movie = movie_title;
      }
      // TODO
      if (showtime) {
        context.showtime = showtime;
        delete context.missingTime;
      } else {
        context.missingTime = true;
        delete context.showtime;
      }

      context.theaterLocation = "Century 12 Cinema, San Mateo CA";

      //call the API here
      return resolve(context);
    });
  },
  survey_input({context,entities}) {
    return new Promise(function(resolve, reject) {
      const userInput = firstEntityValue(entities, 'sport');
      let usrResponse = {};

      if ('results' in context) {
        // Results Exists 
        context.results.totalQuestions += 1
        let answerNumber = 'Ans' + context.results.totalQuestions.toString();
        usrResponse[answerNumber] = userInput ;

      } else {
        // Results NOT Exist
        context.results = { 'totalQuestions' : 1 , 'surveyData' : [] };
        usrResponse = { 'Ans1' : userInput };
      }
      context.results.surveyData.push(usrResponse);
      return resolve(context);
    });
  },
  survey_results({context,entities}) {
    return new Promise(function(resolve, reject) {
      const userInput = firstEntityValue(entities, 'yes_no');
      let usrResponse = {};

      if ('results' in context) {
        // Results Exists 
        context.results.totalQuestions += 1
        let answerNumber = 'Ans' + context.results.totalQuestions.toString();
        usrResponse[answerNumber] = userInput ;
      } else {
        // Results NOT Exist
        context.results = { 'totalQuestions' : 1 , 'surveyData' : [] };
        usrResponse = { 'Ans1' : userInput };
      }
      
      context.results.surveyData.push(usrResponse);
      return resolve(context);
    });
  },
  get_wisdom({context,entities}) {
    return new Promise(function(resolve, reject) {
      grepWisdom().then(function(wisdom) {
        let wisery = wisdom
          .toString()
          .replace(/(\r\n|\n|\r)/gm,"")
          .match(/&quot;(.*)&quot/g)
          .toString()
          .replace(/&quot/gm,"")
          .replace(/;/gm,"");
        context.wisdom = wisery;
        print(context)
        return resolve(context);
      })
    });
  },
  askIrmasSchedule({context,entities}) {
    if ( Object.keys(visitorsList).length < 1 ) { 
      return "Holy shit, Something is wrong with Aunt Irma. \nCall the Doctor, QUICK !!!!"
    }
    console.log(" Calculating prediction for current moment of time " + visitorsList.defaultKryptonite.askIrmaByMonth(Date.now()) ) ;
    return new Promise(function(resolve, reject) {      
      return resolve(context);
    });
  },
};


const client = new Wit({accessToken, actions});
client.interactive();
actions.askIrmasSchedule("{'context','entities'}");