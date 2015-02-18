define([
    'angular',
    'components/introduction/module',
    'components/introduction/Service'
], function (ng, module) {
    'use strict';


    module.directive('onImageLoad', ['$q', 'OnImageLoadService', '$log', function ($q, OnImageLoadService, $log) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                element.bind('load', function () {
                    OnImageLoadService.getDefer().resolve(attrs.onImageLoad);
                });
            }
        }
    }]);

    return module;
});

