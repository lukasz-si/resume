define([
    'angular',
    'components/introduction/module',
    'jquery',
    'components/introduction/Service'
], function (ng, module, $) {
    'use strict';

    module.directive('uiLettersComponent', function () {
        return {
            restrict: 'A',
            templateUrl: 'letters-template.html'
        }
    });

    return module;
});

