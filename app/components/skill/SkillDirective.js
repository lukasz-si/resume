define([
    'angular',
    'components/skill/module',
    'jquery',
    'components/skill/SkillController'
], function (ng, module, $, knob) {
    'use strict';

    module.directive('uiSkillComponent', [function () {

        return {
            restrict: 'A',
            templateUrl: 'skill-template.html'
        }
    }]);

    return module;
});

