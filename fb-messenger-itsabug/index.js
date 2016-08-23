'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const fetch = require('node-fetch');
const Regex = require("regex");
const chopraRegEx = new Regex(/&quot;(.*)&quot/);
const app = express()


let log = require('./lib/log');
let myLogger = new log.Logger(log.DEBUG);
myLogger.debug(' Debug Logger Activeted. ')
myLogger.info(' Info level activated ! ')
myLogger.warn(' Warn level activated ! ')
myLogger.error(' Error level activated ! ')

function printObj(msg) {
  console.log("\n DEBUG : ");
  console.log(JSON.stringify(msg, null, 2));
  console.log("\n");
}
function printMsj(msg) {
  console.log("\n DEBUG : " + msg);
}


let Wit = null;
try {
  // if running from repo
  Wit = require('./lib/wit').Wit;
} catch (e) {
  myLogger.error(e)
}
const WIT_TOKEN = process.env.WIT_TOKEN;

const token = process.env.FB_PAGE_ACCESS_TOKEN

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())



// Index route
app.get('/', function (req, res) {
  printObj(req.headers);
  printObj(req.body);
  myLogger.debug('Invoked generic GET call.')
  
  res.send('Hello world, I am a chat bot.')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
  printObj(req.headers);
  printObj(req.body);
  printMsj("Invoked /webhookk GET API");

  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

// app.post('/webhook/', function (req, res) {
//   printObj(req.headers);
//   printObj(req.body);
//   printMsj("Invoked /webhoook POST API.");

//   let messaging_events = req.body.entry[0].messaging
//   for (let i = 0; i < messaging_events.length; i++) {
//     let event = req.body.entry[0].messaging[i]
//     let sender = event.sender.id
//     if (event.message && event.message.text) {
//       let text = event.message.text
//       if (text === 'Generic') {
//         sendGenericMessage(sender)
//         continue
//       }
//       sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
//     }
//     if (event.postback) {
//       let text = JSON.stringify(event.postback)
//       sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
//       continue
//     }
//   }
//   res.sendStatus(200)
// })

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};
let msgSender;

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
};

const grepWisdom = () => {
  return fetch('http://wisdomofchopra.com/iframe.php#')
  .then(rsp => rsp.text() )
  .then(body => {
    return body;
  });
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      sendTextMessage(msgSender, response.text)
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
        myLogger.debug('get_wisdom returning with wisdom :' + wisery);
        return resolve(context);
      })
    });
  }
};



// Setting up our bot
const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});


// NEW WIT Message handler
app.post('/webhook', (req, res) => {
  myLogger.debug('Invoked Webhook post.');
  const data = req.body;

  if (data.object === 'page') {
    myLogger.debug('Valid data page object.');

    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {

          myLogger.debug('Yay, we got a new message. ');
          const sender = event.sender.id;
          msgSender = sender;

          // We retrieve the user's current session, or create one if it doesn't exist
          // This is needed for our bot to figure out the conversation history
          const sessionId = findOrCreateSession(sender);

          // We retrieve the message content
          const {text, attachments} = event.message;

          if (attachments) {
            myLogger.debug('Received an ATTACHMENT message ! ');
            sendTextMessage(sender, 'Sorry I can only process text messages for now.')
            .catch((err) => {
              myLogger.error('Got an error : ', err.stack || err);
            });
          } else if (text) {
            myLogger.debug('Received a TEXT message ! ')

            wit.runActions(
              sessionId, // the user's current session
              text, // the user's message
              sessions[sessionId].context // the user's current session state
            ).then((context) => {
              
              myLogger.debug('Wit engine execution finished.');
              myLogger.debug('Bot context : ');
              printObj(context);
              
              myLogger.debug('Sending context.wisdom back to user');
              // sendTextMessage(sender, context.wisdom)

              myLogger.debug('Sending back status code 200');
              res.sendStatus(200);
              
              // myLogger.debug('Waiting for next user messages');
              // Updating the user's current session state
              sessions[sessionId].context = context;
              myLogger.debug('sessions[sessionId].context is now updated.');

            })
            .catch((err) => {
              myLogger.error('Oops! Got an error from Wit: ', err.stack || err);
            })
          }
        } else {
          myLogger.debug('received event', JSON.stringify(event));
        }
      });
    });
  }
  myLogger.debug('/Webhook post call end.');
  // res.sendStatus(200);
});



function sendTextMessage(sender, text) {
  let messageData = { text:text }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}


// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
})


function sendGenericMessage(sender) {
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "First card",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
          "buttons": [{
            "type": "web_url",
            "url": "https://www.messenger.com",
            "title": "web url"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        }, {
          "title": "Second card",
          "subtitle": "Element #2 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
          "buttons": [{
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for second element in a generic bubble",
          }],
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}