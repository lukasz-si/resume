define([
    'angular',
    'jquery',
    'components/skill/module'
], function (ng, $, module) {
    'use strict';

    module.factory('SkillPromise', ['$q', function ($q) {

        var deferred = $q.defer();

        return {
            getPromise: function () {
                return deferred.promise;
            },
            getDefer: function () {
                return deferred;
            }
        };
    }]);

    return module;
});

