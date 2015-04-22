/**
 * Created by meep_sitl on 11/02/15.
 */
define([
    'angular',
    'jquery',
    'components/background-code/module'
], function (ng, $, module) {
    'use strict';

    module.factory('BackgroundPromise', ['$q', function ($q) {

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

