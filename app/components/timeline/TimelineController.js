define([
    'angular',
    'components/timeline/module',
    'components/timeline/TimelineServices'
], function (ng, module) {
    'use strict';

    module.controller('TimelineController', ['$scope', '$http', '$log', 'TimelineServices', '$timeout',
        function ($scope, $http, $log, TimelineServices, $timeout) {

            $http.get('data/work.json', {cache: true})
                .success(function (data) {
                    var projects = ng.isArray(data.projects) ? data.projects.slice() : [],
                        months, timeline;

                    $log.log("work.json loaded");

                    ng.forEach(projects, function (value) {
                        months = TimelineServices.calculateMonths(value.start, value.end);
                        if (months >= 0) {
                            value.content += ' (' + months + ' month' + (months !== 1 ? 's' : '') + (value.end ? '' : ', until now') + ')';
                        }
                    });

                    timeline = TimelineServices.createTimeline('#timeline-container', data.projects, data.companies);
                    timeline.on('select', function (selectedItems) {
                        var items = selectedItems.items, i;


                        if (ng.isArray(items) && items.length > 0) {
                            for (i = $scope.projects.length; i--;) {
                                if ($scope.projects[i].id === items[0]) {
                                    updateScope(i);
                                    break;
                                }
                            }
                        }
                        else {
                            updateScope(null);
                        }
                    });

                    $scope.companies = data.companies;
                    $scope.projects = projects;
                    $scope.technologies = data.technologies;

                });
            $scope.companies = [];
            $scope.projects = [];
            $scope.technologies = [];
            $scope.selectedProject = {};

            function updateScope(i) {
                $timeout(function () {
                    if (i !== null) {
                        $scope.selectedProject = $scope.projects[i];
                    }
                    else {
                        $scope.selectedProject = {};
                    }
                    $log.log($scope.selectedProject)
                }, 0);
            }
        }
    ]);


    return module;
});

