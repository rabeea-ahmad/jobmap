angular.module('mapService', [])
    .factory('mapService', function($rootScope, $http){
        var googleMapService = {};

        var locations = [];

        var lastMarker;
        var currentSelectedMarker;

        // Cali babyyy
        var selectedLat = 45.420469;
        var selectedLong = 75.692782;

        // Constructor for generic location
        var Location = function(lat, lng, message, name, program, position, favlang){
            this.lat = lat;
            this.lng = lng;
            this.message = message;
            this.name = name;
            this.program = program;
            this.position = position;
            this.favlang = favlang
        };


        googleMapService.refresh = function(latitude, longitude){
            locations = [];

            selectedLat = latitude;
            selectedLong = longitude;

            $http.get('/users').success(function(response){
                locations = _convertToMapPoints(response);
                initialize(selectedLat, selectedLong, false);
            }).error(function(err){
              console.log("oh no there is a refresh error: ", err);
            });
        };

        googleMapService.getCoordinates = function(address, city) {
          var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ', ' + city + '&key=AIzaSyBVycosjnbw1UHOImeEkTGK008cgWW_KVE';
          return $http({
            method: 'GET',
            url: url
          }).then(function (response) {
            return response.data.results[0].geometry.location;
          }, function(err) {
            console.log("whoops, there is an error: ", err);
          });
        }

        var _convertToMapPoints = function(response){
            var locations = [];

            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                var  contentString = '<p><b>Name</b>: ' + user.name + '<br><b>Program</b>: ' + user.program + '<br>' +
                    '<b>Company</b>: ' + user.company +'<br><b>Position</b>: ' + user.position + '</p>';

                locations.push(new Location(
                    user.location[0],
                    user.location[1],
                    new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    user.name,
                    user.program,
                    user.position,
                    user.favlang
                ));

            }
            return locations;
        };

        var initialize = function(latitude, longitude, filter) {
            var myLatLng = {lat: selectedLat, lng: selectedLong};

            if (!map){
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 5,
                    center: myLatLng
                });
            }

            locations.forEach(function(l, i) {
               var marker = new google.maps.Marker({
                   position: {'lat': l.lat, 'lng': l.lng},
                   map: map,
                   title: "Big Map",
                   icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
               });

                google.maps.event.addListener(marker, 'click', function(e){
                    currentSelectedMarker = l;
                    l.message.open(map, marker);
                });
            });

            // Set initial location as a bouncing red marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;

        };

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong)
        );

        return googleMapService;
    });
