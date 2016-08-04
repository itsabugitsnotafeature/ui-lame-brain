# \<ws-component\>


## Installation

### Installing Polymer CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.


### Installing Other Dependencies

Navigate to '/test/Websocket-Server-Test' and install all necessary modules by issuing command.
```
$ npm install
```



## Demo

Navigate to '/test/Websocket-Server-Test' and start websocket server using follwoing command.
```
$ node app.js
```

In new terminal tab, go to ws-component home folder and start component using following command.
```
$ polymer serve
```
Then on browser tab, 
navigate to : "http://localhost:8080/components/ws-component/demo/index.html"

Enjoy !! 




## Running Tests

```
$ polymer test
```

### Configuration for debugging tests 

Edit the following file, "/ws-component/bower_components/mocha/mocha.js"

Replace timeout for the following TWO functions with the following code:
'''
/**
 * Reset the timeout.
 *
 * @api private
 */
Runnable.prototype.resetTimeout = function() {
  var self = this;
  var ms = 1000000;		// MANUALLY UPDATED TIMEOUT VALUE

  if (!this._enableTimeouts) {
    return;
  }
  this.clearTimeout();
  this.timer = setTimeout(function() {
    if (!self._enableTimeouts) {
      return;
    }
    self.callback(new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.'));
    self.timedOut = true;
  }, ms);
};

...

// finished
  function done(err) {
    var ms = 1000000;       // MANUALLY UPDATED TIMEOUT VALUE
    if (self.timedOut) {
      return;
    }
    if (finished) {
      return multiple(err || self._trace);
    }

    self.clearTimeout();
    self.duration = new Date() - start;
    finished = true;
    if (!err && self.duration > ms && self._enableTimeouts) {
      err = new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.');
    }
    fn(err);
  }


'''

Next Run the test using command : 

```
$ polymer test -p
```

Now, open NEW TAB, and navigte to url : 
"http://localhost:2000/components/ws-component/generated-index.html?cli_browser_id=0"

NOTE : 
To test suite without WS connection, comment out the second test suite.
To test suite WITH WS connection, comment out the first test suite AND start the websocket server.


## References : 
1. Polymer.or starter kit.

2. Patterns in polymers by chris strom. And this link : 
http://japhr.blogspot.com/2015/04/the-debugger-and-breakpoints-with-web.html

3. Redux / Immutable Starter kit.

4. Google code labs : 
https://codelabs.developers.google.com/codelabs/polymer-es2015/index.html?index=..%2F..%2Findex#0




