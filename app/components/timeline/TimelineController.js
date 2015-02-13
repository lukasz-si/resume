define([
    'angular',
    'components/timeline/module',
    'components/timeline/TimelineServices'
], function (ng, module) {
    'use strict';

    module.controller('TimelineController', ['$scope', '$http', '$log', 'TimelineServices',
        function ($scope, $http, $log, TimelineServices) {

            $http.get('data/work.json', {cache: true})
                .success(function (data) {
                    var projects = ng.isArray(data.projects) ? data.projects.slice() : [],
                        months;

                    $log.log("work.json loaded");

                    ng.forEach(projects, function (value) {
                        months = TimelineServices.calculateMonths(value.start, value.end);
                        if (months >= 0) {
                            value.content += '<br>(' + months + ' month' + (months !== 1 ? 's' : '') + (value.end ? '' : ', until now') + ')';
                        }
                    });
                    $log.log(projects);

                    TimelineServices.createTimeline('#timeline-container', data.projects, data.companies);
                    $scope.companies = data.companies;
                    $scope.projects = projects;

                });
            $scope.companies = [];
            $scope.projects = [];
        }
    ]);


    return module;
});

