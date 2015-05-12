var app = angular.module('root', ['LocalStorageModule']);

app.controller('main', ['$scope', 'localStorageService', function($scope, localStorageService) {
  $scope.quoteList = localStorageService.get('quotes') || [];

  $scope.submit = function() {
    var quote = {
      'name': $scope.quoteName,
      'author': $scope.author,
      'category': $scope.category
    };
    $scope.quoteList.push(quote);
    localStorageService.set('quotes', $scope.quoteList);
    //clears input field on submit
    $scope.quoteName = '';
    $scope.author = '';
    $scope.category = '';
  };

  $scope.delete = function(index) {
    var delQuote = confirm("Are you sure you want to edit?");
    if (delQuote === true) {
      $scope.quoteList.splice(index, 1);
      localStorageService.set('quotes', $scope.quoteList);
    }
  };

  $scope.load = function() {
    // $scope.category = getUrl();
    $scope.categories = [];
    localStorageService.set('category', $scope.categories);

    $scope.data = localStorageService.get('quotes');
    for (var i = 0; i < $scope.data.length; i++) {
      $scope.categories.push($scope.data[i].category);
    }
    // $scope.allCategories = 
    console.log($scope.categories);
    // $scope.categoryData = localStorageService.get('category');
    // console.log($scope.categoryData);
  };
}]);
