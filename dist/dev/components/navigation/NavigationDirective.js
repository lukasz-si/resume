define([
    'angular',
    'components/navigation/module',
    'jquery',
    'one-page-nav'
], function (ng, module, $) {
    'use strict';

    module.directive('uiNavigationComponent', function () {

        return {
            restrict: 'A',
            templateUrl: 'navigation-template.html',
            link: function (scope, element, attrs) {
                $(element).onePageNav({
                    currentClass: 'current',
                    changeHash: false,
                    scrollSpeed: 750,
                    scrollThreshold: 0.2,
                    filter: '',
                    easing: 'swing',
                    begin: function() {
                        //I get fired when the animation is starting
                    },
                    end: function() {
                        //I get fired when the animation is ending
                    },
                    scrollChange: function($currentListItem) {
                        //I get fired when you enter a section and I pass the list item of the section
                    }
                });
            }
        }
    });

    return module;
});

