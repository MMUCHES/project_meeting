'use strict';

//Articles service used for communicating with the articles REST endpoints
//noinspection JSAnnotator
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


//noinspection JSAnnotator
angular.module('articles').factory('Conferences', ['$resource', function ($resource) {
    return $resource('api/conferences/:conferenceId', {
        conferenceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

//noinspection JSAnnotator
angular.module('articles').factory('SessionConference', ['$resource', function ($resource) {
    return $resource('api/session-conference/:sessionId', {
        sessionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);