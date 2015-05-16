var app = angular.module('root');

app.controller('main', ['$scope', 'localStorageService', 'ModalService', function($scope, localStorageService, ModalService) {

  if (localStorageService.get('quotes')) {
    $scope.quoteList = localStorageService.get('quotes');

  } else {
    $scope.quoteList = [];
  }

  $scope.hideQs = false;
  $scope.showQs = false;

  $scope.submit = function(isValid) {
    if (!isValid) {
      alert('quote fields cannot be empty');
    } else {
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
    }
  };

  $scope.editQuote = function(quote, index) {
    ModalService.showModal({
      templateUrl: "modal.html",
      controller: "edit",
      inputs: {
        'quote': quote
      }
    }).then(function(modal) {

      //it's a bootstrap element, use 'modal' to show it
      modal.element.modal();
      modal.close.then(function(result) {
        console.log('after editing this is the quote', result);
        $scope.quoteList[index] = result;
        localStorageService.set('quotes', $scope.quoteList);
      });
    });
  };

  $scope.delete = function(index) {
    var delQuote = confirm("Are you sure you want to delete?");
    if (delQuote === true) {
      $scope.quoteList.splice(index, 1);
      localStorageService.set('quotes', $scope.quoteList);
    }
  };

  $scope.like = function(index) {
    $scope.quoteList[index].ratings.likes = 1;
    if ($scope.quoteList[index].ratings.dislikes > 0) {
      $scope.quoteList[index].ratings.dislikes -= 1;
    }
    localStorageService.set('quotes', $scope.quoteList);
  };

  $scope.dislike = function(index) {
    $scope.quoteList[index].ratings.dislikes = 1;
    if ($scope.quoteList[index].ratings.likes > 0) {
      $scope.quoteList[index].ratings.likes -= 1;
    }
    localStorageService.set('quotes', $scope.quoteList);
  };

  $scope.getQuotes = function(args) {
    $scope.allQuotes = [];
    $scope.q = localStorageService.get('quotes');
    for (i = 0; i < $scope.q.length; i++) {
      if ($scope.q[i].category === args) {
        $scope.allQuotes.push($scope.q[i]);
      }
    }
    $scope.hideQs = !$scope.hideQs;
  };

  $scope.load = function() {
    $scope.showQs = !$scope.showQs;
  };
}]);
