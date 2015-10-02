define([
    'angular',
    'components/letters/module',
    'jquery',
    'components/letters/LettersServices'
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

