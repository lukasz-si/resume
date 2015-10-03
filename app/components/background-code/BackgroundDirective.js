define([
    'angular',
    'components/background-code/module',
    'components/background-code/BackgroundController',
    'components/background-code/BackgroundServices'
], function (ng, module, sunlight) {
    'use strict';

    module.directive('uiBackgroundComponent', [function () {

        return {
            restrict: 'A',
            templateUrl: 'background-template.html',
            controller: 'BackgroundController',

            link: function (scope, element, attrs) {

            }
        }
    }]);

    return module;
});

