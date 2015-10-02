define([
    'angular'
], function (ng) {
    'use strict';

    var module = ng.module('CommonModule', []);

    module.factory('CommonService', ['$http', function ($http) {

        return {
            getData: function () {
                return $http.get('%%VERSION%%/data/work.json', {cache: true});
            }
        };
    }]);

    return module;
});
