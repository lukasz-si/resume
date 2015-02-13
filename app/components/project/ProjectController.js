define([
    'angular',
    'components/project/module'
], function (ng, module) {
    'use strict';

    var animationTypes = ['fadeInLeft', 'fadeInRight'],
        counter = 0;

    module.controller('ProjectController', ['$scope', '$http', '$log',
        function ($scope, $http, $log) {

            $http.get('data/work.json', {cache: true})
                .success(function (data) {
                    $log.log("work.json loaded - project");

                    $scope.companies = data.companies;
                    $scope.projects = data.projects;

                });
            $scope.companies = [];
            $scope.projects = [];

            $scope.setAnimationType = function() {
                return animationTypes[counter++ % 2];
            }
        }
    ]);


    return module;
});

