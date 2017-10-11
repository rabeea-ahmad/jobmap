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

      // Get the latitude and longitude of the company by address, city
      mapService.getCoordinates($scope.formData.address, $scope.formData.city)
      .then(function(response) {
        location = response;

          var userData = {
              name: $scope.formData.name,
              program: $scope.formData.program,
              position: $scope.formData.position,
              favlang: $scope.formData.favlang,
              company: $scope.formData.company,
              city: $scope.formData.city,
              address: $scope.formData.address,
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

                  // Update the map to add the new location
                  mapService.refresh(location.lat, location.lng);
              })
              .error(function (data) {
                  console.log('Error: ' + data);
              });
      });


    };
});
