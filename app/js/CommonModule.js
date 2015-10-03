define([
    'angular'
], function (ng) {
    'use strict';

    var module = ng.module('commonModule', []);

    module.factory('Utils', ['$http', function ($http) {
        var workPromise = null;

        return {
            getResumeData: function () {
                if (workPromise === null) {
                    workPromise = $http.get('%%VERSION%%/data/work.json', {cache: true});
                }
                return workPromise;
            }
        };
    }]);

    return module;
});
