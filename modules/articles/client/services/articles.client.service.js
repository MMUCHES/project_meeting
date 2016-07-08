'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
    function ($resource) {
        return $resource('api/articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);


angular.module('articles').factory('Conferences', ['$resource', function ($resource) {
    return $resource('api/conferences/:conferenceId', {
        conferenceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);