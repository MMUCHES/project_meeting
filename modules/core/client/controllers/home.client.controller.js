'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.alerts = [
      {
        description1: 'Google Chrome',
        description2: 'Firefox',
        description3: 'Internet Explorer 9'
      }
    ];
  }
]);



