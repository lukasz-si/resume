/**
 * Created by meep_sitl on 11/02/15.
 */
define([
    'angular',
    'jquery',
    'components/introduction/module'
], function (ng, $, module) {
    'use strict';

    module.factory('OnImageLoadService', ['$q', function ($q) {

        var deferred = $q.defer();

        console.log('aaa aaa');

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

