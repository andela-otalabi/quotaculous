describe('Main Controller', function() {
  var scope, ctrl, localStorage;

  var quoteFunction = function() {
    var quotes = {
      name: "seyi",
      author: "talabi",
      category: "Religion"
    };
    return quotes;
  };

  beforeEach(module('quoteApp'));
  beforeEach(function() {
    inject(function($controller, localStorageService) {
      localStorage = localStorageService;
      scope = {};
      ctrl = $controller('main', {
        $scope: scope
      });
    });
  });

  it('checks the length of quotes in quoteList before any submit or delete function', function() {
    expect(scope.quoteList.length).toBe(1);
  });

  it('submit function should save a quote to the quoteList in the localStorage', function() {

    scope.quoteList = [];
    expect(scope.quoteList.length).toBe(0);

    scope.quoteName = "Seyi";
    scope.author = "Seyi";
    scope.category = "Religion";

    scope.submit(true);

    scope.quoteName = "Tunde";
    scope.author = "Seyi";
    scope.category = "Religion";
    scope.submit(true);
    // expect that the data has been emptied out (if successful)
    scope.load();
    console.log(scope.quoteList);
    expect(scope.quoteList[0].name).toBe('Seyi');
  });

  it('delete function should delete a quote from the quoteList in the localStorage', function() {
    scope.quoteList = [{
      name: "seyi",
      author: "talabi"
    }, {
      name: "Tunde",
      author: "talabi"
    }];

    scope.delete(0);
    console.log(scope.quoteList.length);
    expect(scope.quoteList.length).toBe(1);
  });


  describe('edit function', function() {
    it('edit function should replace a quote with a new quote in the quoteList ', function() {
      
      expect(scope.quoteList[1].name).toBe('seyi');

      scope.editQuote(scope.quoteList[1], 1);
      scope.quoteList[1].name = "Sam";

      //expect(localStorage.quoteList[1].name)).toBe();
    });
  });

  // describe('edit button', function() {
  //   var ModalService, $httpBackend, $timeout;
  //   beforeEach(function() {
  //     inject(function(_ModalService_, $injector) {
  //       ModalService = _ModalService_;
  //       $httpBackend = $injector.get('$httpBackend');
  //       $timeout = $injector.get('$timeout');
  //       $httpBackend.when('GET', 'modal.html').respond("<div id='controllertemplate'>controller template</div>");
  //     });
  //   });

  //   afterEach(function() {
  //     $httpBackend.verifyNoOutstandingExpectation();
  //     $httpBackend.verifyNoOutstandingRequest();
  //   });

  //   it('edit function should edit a quote', function() {
  //     var quote = {
  //       name: "rrrr",
  //       author: "seyi"
  //     };
  //     scope.editQuote(quote, 1);
  //     $httpBackend.flush();


  //   });
  // });
});
