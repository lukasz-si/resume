define([
    'angular',
    'components/skill/module',
    'jquery',
    'jquery.knob',
    'components/skill/SkillController',
    'components/skill/SkillServices'
], function (ng, module, $) {
    'use strict';

    module.directive('uiSkillComponent', ['SkillPromise', '$timeout',
        function (SkillPromise, $timeout) {

            return {
                restrict: 'A',
                templateUrl: 'skill-template.html',
                controller: 'SkillController',

                link: function (scope, element) {

                    SkillPromise.getPromise().then(function () {
                        $timeout(function () {

                            element.find('.skill').knob({
                                width: 100,
                                height: 100,
                                readOnly: true,
                                angleOffset: -120,
                                angleArc: 250
                            });

                            element.find('.skills-container').removeClass('hidden');

                        }, 0);

                    });
                }
            }
        }]);

    return module;
});

