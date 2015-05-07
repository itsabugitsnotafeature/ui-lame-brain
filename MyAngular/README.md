**********************************
****        UD Notes          ****
**********************************

  To make UNIT-TEST : 
    1. "karma.conf.js" : Update and Save
        Update if any new files created under "// include js files". This is source code.
        Update if any new files created under "// unit test specs". This is Unit test code.
    2. "npm test" : Start Unit Tests
        If Console Log :: all Green -> All unit test pass.
        If Console Log :: RED       -> Unit test fail.
    3. Just update unit test, the test will automatically run the second you save.
    4. THIS IS JUST SICK !!


  To Start e2e Testing using protractor, do Following steps :
    Location :
    "/Users/ununoctium/Development/ui/AngularProjects/six/angular-seed-master".
          
    1. "npm start"            : Start Selenium server
    2. "npm run protractor"   : Launch e2e Tests



  To Debug using Element Explorer, Simply use parent command command : 
    1. Tab 1 : "goProtSelServ"
    2. Tab 2 : "goElemExplorer"


**********************************
****    Directory Structure   ****
**********************************
  Directory Structure Source : 
    https://scotch.io/tutorials/angularjs-best-practices-directory-structure

    app/
    ----- shared/   // acts as reusable components or partials of our site
    ---------- sidebar/
    --------------- sidebarDirective.js
    --------------- sidebarView.html
    ---------- article/
    --------------- articleDirective.js
    --------------- articleView.html
    ----- components/   // each component is treated as a mini Angular app
    ---------- home/
    --------------- homeController.js
    --------------- homeService.js
    --------------- homeView.html
    ---------- blog/
    --------------- blogController.js
    --------------- blogService.js
    --------------- blogView.html
    ----- app.module.js
    ----- app.routes.js
    assets/
    ----- img/      // Images and icons for your app
    ----- css/      // All styles and style related files (SCSS or LESS files)
    ----- js/       // JavaScript files written for your app that are not for angular
    ----- libs/     // Third-party libraries such as jQuery, Moment, Underscore, etc.
    index.html

