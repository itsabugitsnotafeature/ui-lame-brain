'use strict';
let Visitor = null;
try {
  // if running from repo
  Visitor = require('../lib/auntIrma');
} catch (e) {
  console.error('Unable to get Irma Instance.')
}

const test = new Visitor.Irma();
console.log(test.askIrmaByMonth(1473307921000));
