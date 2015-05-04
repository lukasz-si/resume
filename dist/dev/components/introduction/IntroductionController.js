define([
    'angular',
    'components/introduction/module',
    'components/introduction/Service'
], function (ng, module) {
    'use strict';

    module.controller('IntroductionController', ['$scope', '$http', '$log',
        function ($scope, $http, $log) {

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

                    $scope.rows = LettersService.generateRandomLetters(data);

                    LettersPromise.getPromise().then(function () {
                        LettersService.setInterval($scope.rows);
                    });
                });

            $scope.rows = [];
        }
    ]);

    return module;
});

