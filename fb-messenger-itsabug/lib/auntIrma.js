'use strict';
const log = require('./log');
const Regex = require("regex");
const fetch = require('node-fetch');

let myLogger = new log.Logger(log.DEBUG);
let dateRegEx = "<h2>Result: (.*)<\/h2>";

const T_DATE  = 25 ;
const T_MONTH = 8 ;
const T_YEAR  = 2016 ;
const T_CYCLE = 26 ;
const T_DURATION = 5 ;

/*
  
*/ 


class Irma {

  /*
		Constructor : Returns new object initialized with master data, month, year, cycle time and visitDuration
    Default returns mater date time 
	*/ 
    constructor(  date          = T_DATE, 
                  month         = T_MONTH, 
                  year          = T_YEAR, 
                  cycle         = T_CYCLE, 
                  visitDuration = T_DURATION ){

        this.controlDate 		= date;
        this.controlMonth 		= month;
        this.controlYear 		= year;
		    this.controlCyclePeriod = cycle;
        this.daysOfVisit 		= visitDuration;
        this.yearlyPredictions = {};
        this.IRMA_MAX_RECORD = 20 ;

        myLogger.debug("New Object Created !");
        this.calculateFutureVisits();
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
        for( let i = 1 ; i < (thisUser.IRMA_MAX_RECORD + 1 ) ; i++ ) {
          let delta = ( i * thisUser.controlCyclePeriod );
          let deltaUrl = thisUser.getDeltaDateApi(delta);
          thisUser.getDate(deltaUrl.toString())
            .then(date => {
              let receivedDate = new Date(date);
              let datapoint = {};
              datapoint.string  = receivedDate.toString()
              datapoint.date    = receivedDate.getDate() ;
              datapoint.month   = receivedDate.getMonth() ;
              datapoint.year    = receivedDate.getFullYear() ; ;
              datapoint.epoch   = receivedDate.getTime() ;
              datapoint.index   = i ;
              
              predictionsArray.push(datapoint);
              if ( predictionsArray.length === thisUser.IRMA_MAX_RECORD ) {
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

        for ( let i = 0 ; i < thisUser.yearlyPredictions.VisitMap.length ; i++ ) {
          myLogger.debug("I IS : " + i );
          myLogger.debug("FOR LOOP  is : " + JSON.stringify(thisUser.yearlyPredictions.VisitMap[i] , 2, null) );
          myLogger.debug("FOR LOOP  is : " + JSON.stringify(thisUser.yearlyPredictions.VisitMap[i][(i+1).toString()] , 2, null) );
        }
      }
    }


}

const inst = new Irma();

// let hit = inst.queryVisit("November","2016");
// myLogger.debug("HIT is : " + hit );





























/*

Example of date time json structure : 
{
  "VisitMap": [
    {
      "string": "Wed Dec 07 2016 00:00:00 GMT-0800 (PST)",
      "date": 7,
      "month": 11,
      "year": 2016,
      "epoch": 1481097600000,
      "index": 4
    },
    {
      "string": "Sun Apr 16 2017 00:00:00 GMT-0700 (PDT)",
      "date": 16,
      "month": 3,
      "year": 2017,
      "epoch": 1492326000000,
      "index": 9
    },
    {
      "string": "Sun Oct 16 2016 00:00:00 GMT-0700 (PDT)",
      "date": 16,
      "month": 9,
      "year": 2016,
      "epoch": 1476601200000,
      "index": 2
    },
    {
      "string": "Wed Jun 07 2017 00:00:00 GMT-0700 (PDT)",
      "date": 7,
      "month": 5,
      "year": 2017,
      "epoch": 1496818800000,
      "index": 11
    },
    {
      "string": "Thu Feb 23 2017 00:00:00 GMT-0800 (PST)",
      "date": 23,
      "month": 1,
      "year": 2017,
      "epoch": 1487836800000,
      "index": 7
    },
    {
      "string": "Sat Jan 28 2017 00:00:00 GMT-0800 (PST)",
      "date": 28,
      "month": 0,
      "year": 2017,
      "epoch": 1485590400000,
      "index": 6
    },
    {
      "string": "Fri Nov 11 2016 00:00:00 GMT-0800 (PST)",
      "date": 11,
      "month": 10,
      "year": 2016,
      "epoch": 1478851200000,
      "index": 3
    },
    {
      "string": "Tue Sep 20 2016 00:00:00 GMT-0700 (PDT)",
      "date": 20,
      "month": 8,
      "year": 2016,
      "epoch": 1474354800000,
      "index": 1
    },
    {
      "string": "Mon Jul 03 2017 00:00:00 GMT-0700 (PDT)",
      "date": 3,
      "month": 6,
      "year": 2017,
      "epoch": 1499065200000,
      "index": 12
    },
    {
      "string": "Fri May 12 2017 00:00:00 GMT-0700 (PDT)",
      "date": 12,
      "month": 4,
      "year": 2017,
      "epoch": 1494572400000,
      "index": 10
    },
    {
      "string": "Tue Mar 21 2017 00:00:00 GMT-0700 (PDT)",
      "date": 21,
      "month": 2,
      "year": 2017,
      "epoch": 1490079600000,
      "index": 8
    },
    {
      "string": "Mon Jan 02 2017 00:00:00 GMT-0800 (PST)",
      "date": 2,
      "month": 0,
      "year": 2017,
      "epoch": 1483344000000,
      "index": 5
    }
  ]
}


DATE Api Reference
"Friday, November 11, 2016"

var date = new Date(1313564400000);
var month = date.getMonth();
OUTPUT : 7

*/