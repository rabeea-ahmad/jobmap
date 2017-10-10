
var app = angular.module('jobMapApp',
  ['addController',
    'headerController',
    'mapService',
    'ngRoute'
  ])
  .config(function($routeProvider){
      $routeProvider.when('/join', {
          controller: 'addController',
          controllerAs: 'add',
          templateUrl: 'partials/addForm.html'
      }).otherwise({redirectTo:'/join'})
    });
