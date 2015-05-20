var app = angular.module('quoteApp');

app.controller('edit', ['$scope', 'localStorageService', 'ModalService', 'quote', 'close', function($scope, localStorageService, ModalService, quote, close) {
  $scope.editQuote = angular.copy(quote); // creates a copy of quote and assign it to the editted quote

  $scope.close = function() {
    close($scope.editQuote, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.cancel = function() {
    close(quote, 500); // ignore edit and return old quote
  };
}]);
