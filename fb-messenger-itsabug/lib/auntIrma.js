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
    constructor(date = T_DATE, month = T_MONTH, year = T_YEAR, cycle = T_CYCLE, visitDuration = T_DURATION){
        this.controlDate 		= date;
        this.controlMonth 	= month;
        this.controlYear 		= year;
        this.controlEpoch   = new Date(this.controlYear.toString() + '.' + this.controlMonth.toString() + '.' + this.controlDate.toString()).getTime()

		    this.controlCyclePeriod = cycle;
        this.daysOfVisit 		= visitDuration;
        this.yearlyPredictions = {};
        this.IRMA_MAX_RECORD = 20 ;

        myLogger.debug("New Object Created !");
        this.calculateFutureVisits();
    }

    getIrmaPredictionsArray() {
      let thisUser = this;
      let predictionsArray = new Array();
      let i = 1;

      for ( let i = 1 ; i < (thisUser.IRMA_MAX_RECORD + 1 ) ; i++ ) {
        let delta = ( i * thisUser.controlCyclePeriod );
        let newDate = new Date(thisUser.controlEpoch);
        let datapoint = {};

        newDate.setDate(newDate.getDate() + delta);

        datapoint.string  = newDate.toDateString();
        datapoint.date    = newDate.getDate() ;
        datapoint.month   = newDate.getMonth() ;
        datapoint.year    = newDate.getFullYear() ; ;
        datapoint.epoch   = newDate.getTime() ;
        datapoint.index   = i ;
        
        predictionsArray.push(datapoint);
      }
      return predictionsArray;  
    }

    calculateFutureVisits() {
      let thisUser = this;
      myLogger.debug("calculateFutureVisits : Called.");
    	thisUser.yearlyPredictions.VisitMap = new Array();
            
      thisUser.yearlyPredictions.VisitMap = thisUser.getIrmaPredictionsArray();
      myLogger.debug("List of her predictions..." );
      myLogger.debug( JSON.stringify(thisUser.yearlyPredictions, null, 2) );
    }

    /*
      Returns Visits for given month in a year.
    */ 
    askIrmaByMonth(queryMonth) {
      let thisUser = this;
      let hits = new Array();
      let forecast = '';
      
      myLogger.debug("AskIrma : Called with query for - " + (new Date(queryMonth)).toString() );
      hits = thisUser.yearlyPredictions.VisitMap.filter(function(monthlyVisit) {
        return ( (new Date(queryMonth).getMonth()) === monthlyVisit.month && (new Date(queryMonth).getFullYear()) === monthlyVisit.year );
      })
      
      myLogger.debug("hits Found is : " + JSON.stringify(hits , null, 2) );

      if ( hits.length === 0 ) {
        forecast = ' Looks like we have ourselves an incorrect month love. Lets quickly check it and try agina ;-) ';
      } else if  ( hits.length === 1 ) {
        forecast = 'Alrighty, I got what you looking for. \n Irma is planning to visit you the day after ' + hits[0].string;
      } else if  ( hits.length === 2 ) {
        forecast = 'Well well, what do we have here. I\'m all set and packed to visit you twice this month sweetie' + 
        '\n My first visit is the day after ' + hits[0].string + 
        '\n and second visit is the day after ' + hits[1].string;
      }

      forecast += "\n\n XOXO\n Aunt Irma."
      return forecast;
    }


}

const inst = new Irma();

console.log(inst.askIrmaByMonth(1483344000000))



























/*

Example of date time json structure : 
{
  "VisitMap": [
    {
      "string": "Tue Sep 20 2016 00:00:00 GMT-0700 (PDT)",
      "date": 20,
      "month": 8,
      "year": 2016,
      "epoch": 1474354800000,
      "index": 1
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
      "string": "Fri Nov 11 2016 00:00:00 GMT-0800 (PST)",
      "date": 11,
      "month": 10,
      "year": 2016,
      "epoch": 1478851200000,
      "index": 3
    },
    {
      "string": "Wed Dec 07 2016 00:00:00 GMT-0800 (PST)",
      "date": 7,
      "month": 11,
      "year": 2016,
      "epoch": 1481097600000,
      "index": 4
    },
    {
      "string": "Mon Jan 02 2017 00:00:00 GMT-0800 (PST)",
      "date": 2,
      "month": 0,
      "year": 2017,
      "epoch": 1483344000000,
      "index": 5
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
      "string": "Thu Feb 23 2017 00:00:00 GMT-0800 (PST)",
      "date": 23,
      "month": 1,
      "year": 2017,
      "epoch": 1487836800000,
      "index": 7
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
      "string": "Sun Apr 16 2017 00:00:00 GMT-0700 (PDT)",
      "date": 16,
      "month": 3,
      "year": 2017,
      "epoch": 1492326000000,
      "index": 9
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
      "string": "Wed Jun 07 2017 00:00:00 GMT-0700 (PDT)",
      "date": 7,
      "month": 5,
      "year": 2017,
      "epoch": 1496818800000,
      "index": 11
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
      "string": "Sat Jul 29 2017 00:00:00 GMT-0700 (PDT)",
      "date": 29,
      "month": 6,
      "year": 2017,
      "epoch": 1501311600000,
      "index": 13
    },
    {
      "string": "Thu Aug 24 2017 00:00:00 GMT-0700 (PDT)",
      "date": 24,
      "month": 7,
      "year": 2017,
      "epoch": 1503558000000,
      "index": 14
    },
    {
      "string": "Tue Sep 19 2017 00:00:00 GMT-0700 (PDT)",
      "date": 19,
      "month": 8,
      "year": 2017,
      "epoch": 1505804400000,
      "index": 15
    },
    {
      "string": "Sun Oct 15 2017 00:00:00 GMT-0700 (PDT)",
      "date": 15,
      "month": 9,
      "year": 2017,
      "epoch": 1508050800000,
      "index": 16
    },
    {
      "string": "Fri Nov 10 2017 00:00:00 GMT-0800 (PST)",
      "date": 10,
      "month": 10,
      "year": 2017,
      "epoch": 1510300800000,
      "index": 17
    },
    {
      "string": "Wed Dec 06 2017 00:00:00 GMT-0800 (PST)",
      "date": 6,
      "month": 11,
      "year": 2017,
      "epoch": 1512547200000,
      "index": 18
    },
    {
      "string": "Mon Jan 01 2018 00:00:00 GMT-0800 (PST)",
      "date": 1,
      "month": 0,
      "year": 2018,
      "epoch": 1514793600000,
      "index": 19
    },
    {
      "string": "Sat Jan 27 2018 00:00:00 GMT-0800 (PST)",
      "date": 27,
      "month": 0,
      "year": 2018,
      "epoch": 1517040000000,
      "index": 20
    }
  ]
}


DATE Api Reference
"Friday, November 11, 2016"

var date = new Date(1313564400000);
var month = date.getMonth();
OUTPUT : 7

*/