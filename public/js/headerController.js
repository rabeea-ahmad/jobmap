angular
  .module('headerController', [])
  .controller('headerController', headerController);

  function headerController ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  }
