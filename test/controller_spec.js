// describe('main ctrl', function(){
//   var scope,controller;
//   beforeEach(function(){
//     module('root');
//     inject (function($controller,$rootScope){
//       scope = $rootScope.$new();
//       controller = $controller('main',{$scope:scope});
//     });
//   });

//   it('should be defined', function(){
//     expect(controller).toBeDefined();
//   });
  
// });

describe('main ctrl', function(){

  beforeEach(module('quoteApp'));

  it('should create "quoteList" model with 3 quotes', inject(function($controller) {
    var scope = {},
        ctrl = $controller('main', {$scope:scope});
        var x, y;
    expect(scope.quoteList.length).toBe(2);

  }));

});