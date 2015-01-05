(function () {
    'use strict';
    console.log('2-config loaded');
    
    var core = angular.module('app.core');

    core.config(['$routeProvider',
         function ($routeProvider) {
                    $routeProvider
                    .when('/feature', {
                        templateUrl: 'feature/feature.html',
                        controller: 'Feature'
                    }) // end of when arguments
                    .otherwise({
                        redirectTo: '/'
                    });
         }
                 
    ]); //end config

})();