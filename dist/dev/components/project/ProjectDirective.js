define([
    'angular',
    'components/project/module',
    'components/project/ProjectController'
], function (ng, module) {
    'use strict';

    module.directive('uiProjectsComponent', function () {

        return {
            restrict: 'A',
//            controller: 'ProjectController',
            templateUrl: 'projects-template.html'
        }
    });

    return module;
});

