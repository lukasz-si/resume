define([
    'angular',
    'components/project/module',
    'components/project/ProjectController',
    'templates'
], function (ng, module) {
    'use strict';

    module.directive('uiProjectComponent', function () {

        return {
            restrict: 'E',
            controller: 'ProjectController',
            templateUrl: 'project-template.html'
        }
    });

    return module;
});

