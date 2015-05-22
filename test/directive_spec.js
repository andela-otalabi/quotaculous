describe('testing my view directive', function() {
  beforeEach(module('quoteApp'));
  beforeEach(module('templates/myquote.html'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<body><view></view></body>');

    scope = $rootScope;
    $compile(elm)(scope); // loads the elm into the DOM
    scope.$digest(); // tell angular to update itself
  }));



  it('should create clickable titles', function() {
    console.log(elm.html()); // gets the content of elm
    //var div = elm.find('div.quotes-list');
    //console.log("hello",div.length);
    expect(elm.html()).toMatch(/quotes\-list/); // use regExp to check if the div with the class exits
});
});
