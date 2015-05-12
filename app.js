var app = angular.module('root', ['LocalStorageModule']);

//app.run(function(editableOptions) {
//  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
//});

app.controller('main', ['$scope', 'localStorageService', function($scope, localStorageService) {
  $scope.quoteList = localStorageService.get('quotes');
  $scope.loveQs = false;
  $scope.showQs = false;

  $scope.submit = function() {
    var quote = {
      'name': $scope.quoteName,
      'author': $scope.author,
      'category': $scope.category,
      ratings: {
        'likes': 0,
        'dislikes': 0
      }
    };

    $scope.quoteList.push(quote);
    localStorageService.set('quotes', $scope.quoteList);
    //clears input field on submit
    $scope.quoteName = '';
    $scope.author = '';
    $scope.category = '';
  };

  $scope.delete = function(index) {
    var delQuote = confirm("Are you sure you want to delete?");
    if (delQuote === true) {
      $scope.quoteList.splice(index, 1);
      localStorageService.set('quotes', $scope.quoteList);
    }
  };

  $scope.like = function(index) {
    $scope.quoteList[index].ratings.likes += 1;
    localStorageService.set('quotes', $scope.quoteList);
  };

  $scope.dislike = function(index) {
    $scope.quoteList[index].ratings.dislikes += 1;
    localStorageService.set('quotes', $scope.quoteList);
  };

  $scope.toggleLove = function() {
    $scope.loveQuotes = [];
    $scope.q = localStorageService.get('quotes');
    for (var i = 0; i < $scope.q.length; i++) {
      if ($scope.q[i].category === "love") {
        $scope.loveQuotes.push($scope.q[i]);
      }
    }
    $scope.loveQs = !$scope.loveQs;
  };

  $scope.load = function() {
    // $scope.category = getUrl();
    $scope.categories = [];
    localStorageService.set('category', $scope.categories);

    $scope.data = localStorageService.get('quotes');
    for (var i = 0; i < $scope.data.length; i++) {
      $scope.categories.push($scope.data[i].category);
    }
    $scope.showQs = !$scope.showQs;
    // $scope.allCategories = 
    console.log($scope.categories);
    // $scope.categoryData = localStorageService.get('category');
    // console.log($scope.categoryData);
  };
}]);
