angular
  .module('addController', ['mapService'])
  .controller('addController', function($scope, $http, $rootScope, mapService){
    var vm = this;

    // Variable declarations
    vm.formData = {};
    vm.formData.longitude = -75.692782;
    vm.formData.latitude = 45.420469;

    // Function declarations
    vm.createUser = createUser;

    function _init() {
      mapService.refresh(vm.formData.latitude, vm.formData.longitude);
    }

    _init();

    /*
    * @name: createUser
    * @description: adds user to db
    */
    function createUser() {
      var location;

      // Get the latitude and longitude of the company by address, city
      mapService.getCoordinates(vm.formData.address, vm.formData.city)
      .then(function(response) {
        location = response;

          var userData = {
              name: vm.formData.name,
              program: vm.formData.program,
              position: vm.formData.position,
              favlang: vmformData.favlang,
              company: vm.formData.company,
              city: vm.formData.city,
              address: vm.formData.address,
              location: [location.lat, location.lng]
          };
          return $http.post('/users', userData)
              .success(function (data) {
                console.log("here is the data: ", data);
                  vm.formData.name = "";
                  vm.formData.program = "";
                  vm.formData.position = "";
                  vm.formData.address = "";
                  vm.formData.favlang = "";
                  vm.formData.company = "";
                  vm.formData.city = "";

                  // Update the map to add the new location
                  mapService.refresh(location.lat, location.lng);
              })
              .error(function (data) {
                  console.log('Error: ' + data);
              });
      });


    };
});
