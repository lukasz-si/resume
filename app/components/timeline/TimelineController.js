define([
    'angular',
    'components/timeline/module',
    'components/timeline/TimelineServices'
], function (ng, module) {
    'use strict';

    module.controller('TimelineController', ['$scope', '$http', '$log', 'TimelineServices', 'TimelinePromise', '$timeout',
        function ($scope, $http, $log, TimelineServices, TimelinePromise, $timeout) {

            $http.get('%%VERSION%%/data/work.json', {cache: true})
                .success(function (data) {
                    var projects = ng.isArray(data.projects) ? data.projects.slice() : [],
                        months, timeline, monthsText;

                    $log.log("work.json loaded");

                    ng.forEach(projects, function (value) {
                        months = TimelineServices.calculateMonths(value.start, value.end);
                        if (months >= 0) {
                            monthsText = ' (' + months + ' month' + (months !== 1 ? 's' : '') + (value.end ? '' : ', until now') + ')';
                            value.contentParsed = value.content;
                            value.content += '<br>' + monthsText;
                            value.months = monthsText;
                        }
                    });

                    timeline = TimelineServices.createTimeline('#timeline-container', data.projects, data.companies);
                    timeline.on('select', function (selectedItems) {
                        var items = selectedItems.items, i, j,
                            itemsLength = items.length,
                            selectedItems = [];

                        if (ng.isArray(items)) {
                            for (j = 0; j < itemsLength; j++) {
                                for (i = $scope.projects.length; i--;) {
                                    if ($scope.projects[i].id === items[j]) {
                                        selectedItems.push($scope.projects[i]);
                                        break;
                                    }
                                }
                            }
                        }

                        $timeout(function () {
                            $scope.selectedProjects = selectedItems;
                            $log.log(items);
                            $log.log($scope.selectedProjects)
                        }, 0);
                    });

                    $scope.companies = data.companies;
                    $scope.projects = projects;
                    $scope.technologies = data.technologies;

                    TimelineServices.move(-0.4);
                    $timeout(function () {
                        TimelineServices.zoom(-0.4);
                    }, 1000);

                    TimelinePromise.getDefer().resolve();
                });
            $scope.companies = [];
            $scope.projects = [];
            $scope.technologies = [];
            $scope.selectedProjects = [];
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
            };
            $scope.zoomIn = function () {
                TimelineServices.zoom(-0.2);
            };
            $scope.zoomOut = function () {
                TimelineServices.zoom(0.2);
            };
            $scope.moveLeft = function () {
                TimelineServices.move(0.2);
            };
            $scope.moveRight = function () {
                TimelineServices.move(-0.2);
            };
        }
    ]);


    return module;
});

