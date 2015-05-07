'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('');

  it('should automatically redirect to Index Home Page by default', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/indexHome");
  });


  describe('view1', function() {

    beforeEach(function() {
      // browser.get('index.html#/view1');
    });
    it('should render view1 when user navigates to /view1', function() {
      // expect(element.all(by.css('[ng-view] p')).first().getText()).
      //   toMatch(/partial for view 1/);
    });

  });


});
