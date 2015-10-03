define([
    'angular',
    'components/project/module',
    'components/project/ProjectController'
], function (ng, module) {
    'use strict';

    module.directive('uiProjectsComponent', function () {

        return {
            restrict: 'A',
            templateUrl: 'projects-template.html',
            controller: 'ProjectController'
        }
    });

    return module;
});

