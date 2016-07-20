'use strict';

angular.module('articles').controller('ConferenceCreateController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Conferences', 'Upload', '$timeout',
    function ($scope, $sce, $stateParams, $location, Authentication, Conferences, Upload, $timeout) {
        $scope.authentication = Authentication;

        $scope.conference = new Conferences({});
        $scope.create = function () {
            $scope.conference.$save(function (response) {
                // $scope.conference = new Conferences({});
                $location.path('conferences/' + response._id);
            });
        };

    }
]);

angular.module('articles').controller('ConferenceSessionController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Conferences', 'Upload', '$timeout',
    function ($scope, $sce, $stateParams, $location, Authentication, Conferences, Upload, $timeout) {
        $scope.authentication = Authentication;

        $scope.newSession = {};
        $scope.addSessionContent = function (topic, content) {
            topic.contents.push('status: true');
        };

        $scope.addSessionContent();

    }
]);

angular.module('articles').controller('ConferenceViewController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Conferences', 'Upload', '$timeout',
    function ($scope, $sce, $stateParams, $location, Authentication, Conferences, Upload, $timeout) {
        $scope.authentication = Authentication;

        $scope.agendas = [
            {
                chapter0s: 'active'
            }
        ];
        // Remove existing Article
        $scope.remove = function (conference) {
            if (conference) {
                conference.$remove();

                for (var i in $scope.conferences) {
                    if ($scope.conferences[i] === conference) {
                        $scope.conferences.splice(i, 1);
                    }
                }
            } else {
                $scope.conference.$remove(function () {
                    $location.path('/articles/list_article');
                });
            }
        };
        $scope.conference = {};
        function init() {
            $scope.conferences = Conferences.get({
                conferenceId: $stateParams.conferenceId
            }, function (r) {
                $scope.conference = r;
            });
        }

        init();


        $scope.update = function () {
            $scope.conference.$update(function () {

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.newContent = {};
        $scope.addSubContent = function (topic, content) {

            topic.contents.push(content);
            $scope.newContent = {};
            content.isEditMode = true;
        };

        $scope.removeContent = function (topic, content, index) {
            topic.contents.splice(index, 1);
            $scope.update();
        };

        $scope.removeSubDetailContent = function (content, subContent, index) {
            content.subContents.splice(index, 1);
            $scope.update();
        };

        $scope.addSubDetailContent = function (topic, content, index) {
            content.subContents.push({
                header: '',
                content: '',
                isEditMode: true
            });
        };
        $scope.toggleEditContent = function (topic, content, index) {
            if (content.isEditMode) {
                content.isEditMode = !content.isEditMode;
                $scope.update();
            } else {
                content.isEditMode = true;
            }
        };
        $scope.toggleEditDetailContent = function (topic, subContent, index) {
            if (subContent.isEditMode) {
                subContent.isEditMode = !subContent.isEditMode;
                $scope.update();
            } else {
                subContent.isEditMode = true;
            }
        };
        $scope.toggleDeleteposition = function (topic, user, index) {
            if (user.isEditMode) {
                user.isEditMode = !user.isEditMode;
                $scope.removeSubUser();
            } else {
                user.isEditMode = true;

            }
        };

        $scope.newUser = {};
        $scope.addSubUser = function (users, user) {
            users.push(user);
            $scope.newUser = {};
        };

        $scope.removeSubUser = function (users, user, index) {
            users.splice(index, 1);
            $scope.update();
        };
    }
]);


angular.module('articles').controller('ConferenceListController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Conferences', 'Upload', '$timeout',
    function ($scope, $sce, $stateParams, $location, Authentication, Conferences, Upload, $timeout) {
        $scope.authentication = Authentication;


        $scope.conferences = [];
        function init() {
            $scope.conferences = Conferences.query();
        }

        init();

    }
]);
// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Articles', 'Upload', '$timeout',
    function ($scope, $sce, $stateParams, $location, Authentication, Articles, Upload, $timeout) {
        $scope.authentication = Authentication;


        $scope.channelOptions3 = [
            {id: '1', opt: 'ประธานกรรมการ'},
            {id: '2', opt: 'กรรมการผู้ทรงคุณวุฒิ'},
            {id: '3', opt: 'กรรมการ'},
            {id: '4', opt: 'เลขานุการคณะกรรมการ'},
            {id: '5', opt: 'ผู้ช่วยเลขานุการคณะกรรมกา'}
        ];
        $scope.agendas = [
            {
                chapter1: 'active'
            }
        ];

        $scope.uploadFiles = function (file, errFiles) {
            $scope.uploadedFile = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/uploads',
                    data: {uploadedFile: file}
                });

                file.upload.then(function (response) {
                    console.log('File is successfully uploaded to ' + response.data.uploadedURL);
                    $scope.articleImageURL = response.data.uploadedURL;
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        $scope.tinymceOptions = {
            selector: 'textarea',
            inline: false,
            skin: 'lightgray',
            theme: 'modern',
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor'
            ],
            menubar: 'edit insert view format',
            toolbar: ['undo redo cut copy paste | link image | print preview fullscreen',
                'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | formatselect fontselect fontsizeselect '
            ],
            file_browser_callback: function (field_name, url, type, win) {
                //configure the file browser callback
            }
        };


        // Remove existing Article
        $scope.remove = function (article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function () {
                    $location.path('articles');
                });
            }
        };

        // Update existing Article
        $scope.update = function (isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'articleForm');

                return false;
            }

            var article = $scope.article;

            article.$update(function () {
                // $location.path('articles/' + article._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            $scope.articles = Articles.query();
        };

        // Find existing Article
        $scope.findOne = function () {
            Articles.get({
                articleId: $stateParams.articleId
            }, function (r) {
                r.topics = $sce.trustAsHtml(r.topics);
                console.log(r);
                $scope.article = r;
            });
        };
    }
]);
