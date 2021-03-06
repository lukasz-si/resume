define([
    'angular',
    'components/project/module'
], function (ng, module) {
    'use strict';

    var technologies = ["JavaScript", "Java", "PHP", "HTML5", "CSS5", "jQuery", "AngularJS", "RequireJS",
        "Smarty", "Sass", "Less", "Grunt", "Bower", "Jasmine", "Git", "Scrum", "D3"];

    module.controller('ProjectController', ['$scope', '$http', '$log', '$sce', 'Utils',
        function ($scope, $http, $log, $sce, Utils) {

            Utils.getResumeData().then(function (data) {
                $log.log("work.json loaded");
                $scope.projects = data.data.projects;
                $scope.companies = data.data.companies;
            });

            $scope.companies = [];
            $scope.technologies = technologies;
            $scope.projects = [];
            $scope.trustAsHtml = function (html) {
                return $sce.trustAsHtml(html);
            };
            $scope.projectFilter = {};
            $scope.projectFilter.company = "all";
            $scope.projectFilter.technology = "all";

            $scope.projectFilter.filter = function (value) {

                var result = false,
                    technology = $scope.projectFilter.technology,
                    company = $scope.projectFilter.company;

                if ((company === "all" || value.group === company)
                    && (technology === "all" || ng.isArray(value.technologies) && value.technologies.indexOf(technology) !== -1)) {
                    result = true;
                }
                return result;
            };

            $scope.getCompany = function (groupName) {
                var companies = $scope.companies,
                    company, i;

                if (ng.isArray(companies) && companies.length > 0) {
                    for (i = companies.length; i--;) {
                        if (companies[i].id === groupName) {
                            company = companies[i];
                            break;
                        }
                    }
                }

                return company || {};
            }
        }
    ]);

    return module;
});

