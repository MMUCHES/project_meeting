'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
    function ($stateProvider) {
        // Articles state routing
        $stateProvider
            .state('conferences', {
                abstract: true,
                url: '/conferences',
                template: '<ui-view/>'
            })
            .state('conferences.view', {
                url: '/:conferenceId',
                templateUrl: 'modules/articles/client/views/view-conference.client.view.html'
            })
            .state('conferences.subconference', {
                url: '/:conferenceId/subconferences',
                templateUrl: 'modules/articles/client/views/sub-conference.client.view.html'
            })
            .state('conferences.subconference1', {
                url: '/:conferenceId/subconferences_1',
                templateUrl: 'modules/articles/client/views/sub-conference1.client.view.html'
            })
            .state('conferences.subconference2', {
                url: '/:conferenceId/subconferences_2',
                templateUrl: 'modules/articles/client/views/sub-conference2.client.view.html'
            })
            .state('conferences.subconference3', {
                url: '/:conferenceId/subconferences_3',
                templateUrl: 'modules/articles/client/views/sub-conference3.client.view.html'
            })
            .state('conferences.subconference4', {
                url: '/:conferenceId/subconferences_4',
                templateUrl: 'modules/articles/client/views/sub-conference4.client.view.html'
            })
            .state('conferences.subconference5', {
                url: '/:conferenceId/subconferences5',
                templateUrl: 'modules/articles/client/views/sub-conference5.client.view.html'
            })
            .state('conferences.viewarticles', {
                url: '/:conferenceId/viewarticles',
                templateUrl: 'modules/articles/client/views/view-articles.client.view.html'
            })
            .state('conferences.realtimearticle', {
                url: '/:conferenceId/realtimearticle',
                templateUrl: 'modules/articles/client/views/realtime-article.view.html'
            })
            .state('conferences.positionconference', {
                url: '/:conferenceId/positionconferences',
                templateUrl: 'modules/articles/client/views/position.conference.client.view.html'
            })
            .state('conferences.editarticle', {
                url: '/:conferenceId/editarticle',
                templateUrl: 'modules/articles/client/views/edit-article.client.view.html'
            })
            .state('articles', {
                abstract: true,
                url: '/articles',
                template: '<ui-view/>'
            })
            .state('articles.list', {
                url: 'list',
                templateUrl: 'modules/articles/client/views/list-articles.client.view.html'
            })
            .state('articles.create', {
                url: '/create',
                templateUrl: 'modules/articles/client/views/create-article.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });

            
    }
]);
