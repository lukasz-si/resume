define([
    'angular',
    'components/background-code/module',
    'sunlight',
    'sunlight.javascript',
    'sunlight.css',
    'sunlight.xml',
    'components/background-code/BackgroundController',
    'components/background-code/BackgroundServices'
], function (ng, module, sunlight) {
    'use strict';

    module.directive('uiBackgroundComponent', ['BackgroundPromise', '$timeout', function (BackgroundPromise, $timeout) {

        var highlighter = new sunlight.Highlighter();

        return {
            restrict: 'A',
            templateUrl: 'background-template.html',

            link: function (scope, element, attrs) {
//console.log(element[0])
//                var node = highlighter.highlightNode(element[0]);
//console.log(element[0])

                $timeout(function () {
                    BackgroundPromise.getDefer().resolve();

                }, 1000);
            }
        }
    }]);

    return module;
});

