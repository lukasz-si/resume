define([
    'angular',
    'components/views/module'
], function (ng, module) {
    'use strict';

    module.controller('IntroductionController', ['$scope', '$http', '$log',
        function ($scope, $http, $log) {

            $http.get('%%VERSION%%/data/work.json', {cache: true})
                .success(function (data) {
                    $log.log("work.json loaded - intro");

                    $scope.hobbies = data.hobbies;
                });
        }
    ]);

    return module;
});

