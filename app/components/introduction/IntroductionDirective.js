define([
    'angular',
    'components/introduction/module',
    'jquery',
    'components/introduction/Service'
], function (ng, module, $) {
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

    module.directive('uiLettersComponent', function () {
        return {
            restrict: 'A',
            templateUrl: 'letters-template.html',
        }
    });

    return module;
});

