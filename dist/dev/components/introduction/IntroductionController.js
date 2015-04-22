define([
    'angular',
    'components/introduction/module',
    'components/introduction/Service'
], function (ng, module) {
    'use strict';

    var imageList = ['keyboard.jpg', 'keyboard2.jpg', 'www.jpg', 'www2.jpg'];

    module.controller('IntroductionController', ['$scope', '$http', '$log', '$sce',
        function ($scope, $http, $log, $sce) {

            $http.get('./data/work.json', {cache: true})
                .success(function (data) {
                    $log.log("work.json loaded - intro");

                    $scope.hobbies = data.hobbies;
                });
        }
    ]);

    module.controller('LettersController', ['$scope', '$http', '$log', 'LettersService', 'LettersPromise',
        function ($scope, $http, $log, LettersService, LettersPromise) {
            $http.get('./data/letters.json', {cache: true})
                .success(function (data) {
                    LettersPromise.getPromise().then(function () {
                        $scope.rows = LettersService.generateRandomLetters(data);
                        LettersService.setInterval($scope.rows);
                    });
                });

            $scope.rows = [];
        }
    ]);

    return module;
});

