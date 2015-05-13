var app = angular.module('root', ['LocalStorageModule', 'angularModalService']);

//app.run(function(editableOptions) {
//  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
//});

app.controller('main', ['$scope', 'localStorageService', 'ModalService', function($scope, localStorageService, ModalService) {

  if (localStorageService.get('quotes')) {
    $scope.quoteList = localStorageService.get('quotes');
    console.log($scope.quoteList);
    // $scope.quoteList = JSON.parse($scope.quoteList);
  } else {
    $scope.quoteList = [];
    console.log($scope.quoteList);
  }


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
    var quoteSaved = alert("Your quote has been saved");
    //clears input field on submit
    $scope.quoteName = '';
    $scope.author = '';
    $scope.category = '';
  };


  $scope.editQuote = function(index) {
    console.log('haha');
    ModalService.showModal({
      templateUrl: "modal.html",
      controller: "main"
    }).then(function(modal) {
      console.log(modal);
      //it's a bootstrap element, use 'modal' to show it
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result);
      });
    });
    // get the quote that was clicked
    // use the index
    // go through the array and pick the right quote
    // then set $scope.author to the one to picked above
    // then set $scope.quotename to the one to picked above
    //console.log('it should show this', $scope.quoteList[index].name);
    /*$scope.quoteName = $scope.quoteList[index].name;
    $scope.author = $scope.quoteList[index].author;*/

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
    if ($scope.quoteList[index].ratings.dislikes > 0) {
      $scope.quoteList[index].ratings.dislikes -= 1;
    } else if ($scope.quoteList[index].ratings.dislikes == 1) {
      $scope.quoteList[index].ratings.dislikes = 0;
    } else {
      $scope.quoteList[index].ratings.dislikes = 0;
    }

    localStorageService.set('quotes', $scope.quoteList);
  };

  $scope.dislike = function(index) {
    $scope.quoteList[index].ratings.dislikes += 1;
    if ($scope.quoteList[index].ratings.likes > 0) {
      $scope.quoteList[index].ratings.likes -= 1;
    } else if ($scope.quoteList[index].ratings.likes == 1) {
      $scope.quoteList[index].ratings.likes = 0;
    } else {
      $scope.quoteList[index].ratings.likes = 0;
    }

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
