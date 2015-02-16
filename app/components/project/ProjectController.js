define([
    'angular',
    'components/project/module'
], function (ng, module) {
    'use strict';

    module.filter('filterByCompany', ['$log', function ($log) {

        return function (project, selectedCompany) {

                $log.log(project);
                $log.log(selectedCompany);
            return true;
        };
    }
    ]);

    module.controller('ProjectController', ['$scope', '$http', '$log', '$sce',
        function ($scope, $http, $log, $sce) {

            $http.get('data/work.json', {cache: true})
                .success(function (data) {
                    $log.log("work.json loaded - project");

                    $scope.projects = data.projects;
                    $scope.technologies = data.technologies;
                    $scope.companies = data.companies;
                    $scope.selectedCompany = {};
                    $scope.selectedCompany.$ = 1;

                });
            $scope.companies = [];
            $scope.technologies = [];
            $scope.projects = [];
            $scope.trustAsHtml = function (html) {
                return $sce.trustAsHtml(html);
            };
            $scope.selectedTechnology = {};
            $scope.selectedTechnology.$ = 1;
            $scope.selectedTechnology.compareTechnologies = function (actual, expected) {

                $log.log(actual)
                $log.log(expected)
                return false;
            }
            $scope.compareTechnologies = $scope.selectedTechnology.compareTechnologies;
        }
    ]);


    return module;
});

