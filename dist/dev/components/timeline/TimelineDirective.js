define([
    'angular',
    'components/timeline/module',
    'components/timeline/TimelineController',
    'components/timeline/TimelineServices'
], function (ng, module) {
    'use strict';

    module.directive('uiTimelineComponent', [function () {

        return {
            restrict: 'A',
            templateUrl: 'timeline-template.html',

            link: function (scope, element, attrs) {

            }
        }
    }]);

    return module;
});

