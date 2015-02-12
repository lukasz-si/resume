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
//                    var projects = [];

                    $log.log("work.json loaded");

//                    if (ng.isArray(data.projects)) {
//                        ng.forEach(data.projects, function (value) {
//                            projects.push(TimelineServices.convertStringToDate(value));
//                        });
//                        $log.log(projects);
//                    }

                    TimelineServices.createTimeline('#timeline-container', data.projects, data.companies);
                    $scope.companies = data.companies;
                    $scope.projects = data.projects;

                });
            $scope.companies = [];
            $scope.projects = [];
        }
    ]);


    return module;
});

