define([
    'angular',
    'components/letters/module',
    'components/letters/LettersServices'
], function (ng, module) {
    'use strict';

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

