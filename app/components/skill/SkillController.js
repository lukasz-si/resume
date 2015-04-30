define([
    'angular',
    'jquery',
    'components/skill/module',
    'chroma-js',
    'components/skill/SkillServices'
], function (ng, $, module, chroma) {
    'use strict';

    var scale = chroma.scale(['lightyellow', 'lightyellow', 'yellow', 'orange', 'red']);

    module.controller('SkillController', ['$scope', '$http', 'SkillPromise', '$log', '$timeout',
        function ($scope, $http, SkillPromise, $log, $timeout) {

            $http.get('%%VERSION%%/data/work.json', {cache: true})
                .success(function (data) {

                    var skills = ng.isArray(data.skills) ? data.skills.slice() : [];

                    $log.log("work.json loaded - skills");

                    $scope.skills = skills;

                    SkillPromise.getDefer().resolve();
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

