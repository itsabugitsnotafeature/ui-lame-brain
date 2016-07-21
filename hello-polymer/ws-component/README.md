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

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
