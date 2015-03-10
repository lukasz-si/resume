define([
    'angular',
    'jquery',
    'components/skill/module',
    'chroma-js',
    'jquery.knob',
    'components/skill/SkillServices'
], function (ng, $, module, chroma) {
    'use strict';

    var scale = chroma.scale(['lightyellow', 'lightyellow', 'yellow', 'orange', 'red']);

    module.controller('SkillController', ['$scope', '$http', 'SkillPromise', '$log', '$timeout',
        function ($scope, $http, SkillPromise, $log, $timeout) {

            $http.get('./data/work.json', {cache: true})
                .success(function (data) {

                    var skills = ng.isArray(data.skills) ? data.skills.slice() : [];

                    $log.log("work.json loaded - skill");

                    $scope.skills = skills;

                    $timeout(function () {

                        $('#skills').find('.skill').knob({
                            width: 100,
                            height: 100,
                            readOnly: true,
                            angleOffset: -120,
                            angleArc: 250
                        });

                        SkillPromise.getDefer().resolve();

                    }, 100);

                });
            $scope.skills = [];
            $scope.getColor = function (level) {

                if (isNaN(level)) {
                    return scale(0).hex();
                }

                return scale(level / 100).hex();
            };
        }
    ]);


    return module;
});

