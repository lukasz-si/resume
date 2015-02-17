define([
    'angular',
    'components/project/module'
], function (ng, module) {
    'use strict';

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
            $scope.selectedTechnology.search = "all";
//            $scope.selectedTechnology.$ = 1;
            $scope.selectedTechnology.compareTechnologies = function (value, index) {

                var result = false,
                    technology = $scope.selectedTechnology.search;

                if (technology === "all" || ng.isArray(value.technologies) && value.technologies.indexOf(technology) !== -1) {
                    result = true;
                }
//                $log.log(technology)
//                $log.log(value)
                return result;
            };
        }
    ]);

    return module;
})
;

