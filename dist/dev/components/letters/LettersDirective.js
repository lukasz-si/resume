define([
    'angular',
    'components/letters/module',
    'jquery',
    'components/letters/LettersController'
], function (ng, module, $) {
    'use strict';

    module.directive('uiLettersComponent', function () {
        return {
            restrict: 'A',
            templateUrl: 'letters-template.html',
            controller: 'LettersController'
        }
    });

    return module;
});

