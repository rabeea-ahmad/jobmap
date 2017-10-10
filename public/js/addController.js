angular
  .module('addController', ['mapService'])
  .controller('addController', function($scope, $http, $rootScope, mapService){

    $scope.formData = {};
    $scope.formData.longitude = -75.692782;
    $scope.formData.latitude = 45.420469;

    function _init() {
      mapService.refresh($scope.formData.latitude, $scope.formData.longitude);
    }

    _init();

    // Creates a new user
    $scope.createUser = function() {
      var location;
      mapService.getCoordinates($scope.formData.address, $scope.formData.city)
      .then(function(response) {
        location = response;
        console.log("here is the location: ", location);
          var userData = {
              name: $scope.formData.name,
              program: $scope.formData.program,
              age: 19,
              position: $scope.formData.position,
              favlang: $scope.formData.favlang,
              company: $scope.formData.company,
              city: $scope.formData.city,
              location: [location.lat, location.lng]
          };
          return $http.post('/users', userData)
              .success(function (data) {
                  $scope.formData.name = "";
                  $scope.formData.program = "";
                  $scope.formData.position = "";
                  $scope.formData.address = "";
                  $scope.formData.favlang = "";
                  $scope.formData.company = "";
                  $scope.formData.city = "";

                  mapService.refresh(location.lat, location.lng);
              })
              .error(function (data) {
                  console.log('Error: ' + data);
              });
      });


    };
});
