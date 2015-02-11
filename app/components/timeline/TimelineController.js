define([
    'angular',
    'components/timeline/module',
    'vis'
], function (ng, module) {
    'use strict';

    var controller = module.controller('TimelineController', ['$scope', '$http', '$log',
        function ($scope, $http, $log) {

            $http.get('data/work.json')
                .success(function (data) {
                    var projects = [],
                        project,
                        array;

                    $scope.companies = data.companies;
                    $log.log("work.json loaded");

                    if (ng.isArray(data.projects)) {
                        ng.forEach(data.projects, function (value) {
                            projects.push(convert(value));
                        });
                        $log.log(projects);
                    }

                });
            $scope.companies = [];
            $scope.projects = [];
        }
    ]);

    // TODO: create a service
    function convert(value) {
        var project = ng.extend({}, value),
            dateArray = project.start.split('-');

        if (dateArray.length === 3) {
            project.start = new Date(dateArray[0], dateArray[1], dateArray[2]);
        }

        if (ng.isString(project.end)) {
            dateArray = project.end.split('-');
            if (dateArray.length === 3) {
                project.end = new Date(dateArray[0], dateArray[1], dateArray[2]);
            }
        }

        return project;
    }

    return controller;
});

