define([
    'angular',
    'components/background-code/module',
    'components/background-code/BackgroundServices'
], function (ng, module) {
    'use strict';

    module.controller('BackgroundController', ['$scope', '$http', '$log', 'BackgroundPromise', '$timeout', '$q',
        function ($scope, $http, $log, BackgroundPromise, $timeout, $q) {

            var counter = 0;

            $q.all([
                    $http.get('%%VERSION%%/data/background.js', {cache: true}),
                    $http.get('%%VERSION%%/data/background.scss', {cache: true}),
                    $http.get('%%VERSION%%/data/background.html', {cache: true})
                ])
                .then(function (values) {
                    $scope.javascript = values[0].data;
                    $scope.css = values[1].data;
                    $scope.html = values[2].data;

                    $timeout(function () {
                        BackgroundPromise.getDefer().resolve();
                    }, 100);
                });

            $scope.css = '';
            $scope.javascript = '';
            $scope.html = '';
        }
    ]);

    return module;
});

