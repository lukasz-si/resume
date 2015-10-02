define([
    'angular',
    'components/navigation/module',
    'jquery'
], function (ng, module, $) {
    'use strict';

    module.directive('uiNavigationComponent', function () {

        return {
            restrict: 'A',
            templateUrl: 'navigation-template.html',
            controller: 'NavigationController',
            link: function (scope, element, attrs) {

            }
        }
    });

    return module;
});

