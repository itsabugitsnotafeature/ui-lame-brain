'use strict';
const log = require('./log');
const Regex = require("regex");
const fetch = require('node-fetch');

let myLogger = new log.Logger(log.DEBUG);
let dateRegEx = "<h2>Result: (.*)<\/h2>";

const T_DATE = 25 ;
const T_MONTH = 8 ;
const T_YEAR = 2016 ;
const T_CYCLE = 2016 ;
const T_DURATION = 5 ;

/*
  
*/ 


class Irma {

  /*
		Constructor : Returns new object initialized with master data, month, year, cycle time and visitDuration
    Default returns mater date time 
	*/ 
    constructor(  date = T_DATE, 
                  month=T_MONTH, 
                  year=T_YEAR, 
                  cycle=T_CYCLE, 
                  visitDuration=T_DURATION) {
        this.controlDate 		= date;
        this.controlMonth 		= month;
        this.controlYear 		= year;
		    this.controlCyclePeriod = cycle;
        this.daysOfVisit 		= visitDuration;
        this.yearlyPredictions = {};
        myLogger.debug("New Object Created !");
        // this.calculateFutureVisits();
    }

    getDate(url) {
      return fetch(url)
      .then(rsp => rsp.text() )
      .then(body => {
        return body.match(/<h2>Result: (.*)<\/h2>/g).toString().replace(/<h2>Result: /gm,"").replace(/<\/h2>/gm,"");
      });
    }

    showControlParams() {
        let thisUser = this;
        myLogger.debug("showControlParams : Called.");
        myLogger.debug(`\nDate:${thisUser.controlDate},\nMonth: ${thisUser.controlMonth},\nYear: ${thisUser.controlYear},\nCycle Period ${thisUser.controlCyclePeriod},\nDays Of Visit: ${thisUser.daysOfVisit}\n`);
    }

    getDeltaDateApi(delta) {
        let thisUser = this;
        // myLogger.debug("getDeltaDateApi : Called.");

        return 'http://www.timeanddate.com/date/dateadded.html?m1=' + 
               thisUser.controlMonth.toString() + 
               '&d1=' + 
               thisUser.controlDate.toString() + 
               '&y1=' + 
               thisUser.controlYear.toString() + 
               '&type=add&ay=&am=&aw=&ad=' + 
               delta.toString();
    }

    getPredictionsArray() {
      let thisUser = this;
      let predictionsArray = new Array();
      let i = 1;
      let doublyMonthDetected = false;

      return new Promise(function(resolve, reject) {
        for( let i = 1 ; i < 13 ; i++ ) {
          let delta = ( i * thisUser.controlCyclePeriod );
          let deltaUrl = thisUser.getDeltaDateApi(delta);
          thisUser.getDate(deltaUrl.toString())
            .then(date => {
              let datapoint = {};
              datapoint[i] = date;
              predictionsArray.push(datapoint);
              if ( predictionsArray.length === 12 ) {
                return resolve(predictionsArray);  
              }
          })
        }
      });
    }

    calculateFutureVisits() {
      let thisUser = this;
      myLogger.debug("calculateFutureVisits : Called.");

    	let predictions = {};
    	thisUser.yearlyPredictions.VisitMap = new Array();
      
      thisUser.getPredictionsArray()
        .then(herPredictions => {
          thisUser.yearlyPredictions.VisitMap = herPredictions;
          myLogger.debug("List of her predictions..." );
          myLogger.debug( JSON.stringify(thisUser.yearlyPredictions, 2, null) );
        });
    }

    queryVisit(month, year) {
      let thisUser = this;
      let hits = new Array();

      if(thisUser.yearlyPredictions.VisitMap.length === 0) {
        // this.calculateFutureVisits();
        setTimeout(function () {
            thisUser.queryVisit(month, year);
        }, 5000);
      } else {
        let predictions = thisUser.yearlyPredictions.VisitMap;
        myLogger.debug("queryDate : Called.");

        predictions.forEach(function(monthlyPrediction) {
          myLogger.debug("forEach is : " + JSON.stringify(monthlyPrediction , 2, null) );
        });
      }
    }


}

const inst = new Irma();
inst.calculateFutureVisits();

let hit = inst.queryVisit("November","2016");
myLogger.debug("HIT is : " + hit );





























/*

Example of date time json structure : 
{
  "VisitMap": [
    {
      "2": "Sunday, October 16, 2016"
    },
    {
      "4": "Wednesday, December 7, 2016"
    },
    {
      "3": "Friday, November 11, 2016"
    },
    {
      "8": "Tuesday, March 21, 2017"
    },
    {
      "1": "Tuesday, September 20, 2016"
    },
    {
      "12": "Monday, July 3, 2017"
    },
    {
      "5": "Monday, January 2, 2017"
    },
    {
      "10": "Friday, May 12, 2017"
    },
    {
      "6": "Saturday, January 28, 2017"
    },
    {
      "9": "Sunday, April 16, 2017"
    },
    {
      "11": "Wednesday, June 7, 2017"
    },
    {
      "7": "Thursday, February 23, 2017"
    }
  ]
}


DATE Api Reference
var date = new Date(1313564400000);
var month = date.getMonth();
OUTPUT : 7

*/