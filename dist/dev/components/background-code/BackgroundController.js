define([
    'angular',
    'components/background-code/module',
    'components/background-code/BackgroundServices'
], function (ng, module) {
    'use strict';

    module.controller('BackgroundController', ['$scope', '$http', '$log', 'BackgroundPromise', '$timeout',
        function ($scope, $http, $log, BackgroundPromise, $timeout) {

            var counter = 0;

            $http.get('./data/background.js', {cache: true})
                .success(function (data) {
                    counter++;
                    $scope.javascript = data;
                    resolveDefer();
                    $log.log("background.js loaded");
                });

            $http.get('./data/background.css', {cache: true})
                .success(function (data) {
                    counter++;
                    $scope.css = data;
                    resolveDefer();
                    $log.log("background.css loaded");
                });

            $http.get('./data/background.html', {cache: true})
                .success(function (data) {
                    counter++;
                    $scope.html = data;
                    resolveDefer();
                    $log.log("background.html loaded");
                });

            $scope.css = '';
            $scope.javascript = '';
            $scope.html = '';

            function resolveDefer() {
                if (counter === 3) {
                    BackgroundPromise.getDefer().resolve();
                }
            }
        }
    ]);


    return module;
});

