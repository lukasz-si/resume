define([
    'angular',
    'components/navigation/module'
], function (ng, module) {
    'use strict';

    module.controller('NavigationController', ['$scope', '$location',
        function ($scope, $location) {

            var currentView = '#' + $location.path(),
                selectedClassName = 'current';

            $scope.menu = [
                {href: '#/introduction', name: 'Home', liClass: '', iconClass: 'fa fa-home'},
                {href: '#/timeline', name: 'Timeline', liClass: 'hidden-xs', iconClass: 'fa fa-clock-o'},
                {href: '#/projects', name: 'Projects', liClass: '', iconClass: 'fa fa-tasks'},
                {href: '#/skills', name: 'Skills', liClass: '', iconClass: 'fa fa-link'},
                {href: '#/links', name: 'Links', liClass: '', iconClass: 'fa fa-link'},
                {href: '#/print', name: 'Print', liClass: 'visible-lg visible-md', iconClass: 'fa fa-print'}
            ];

            ng.forEach($scope.menu, function (value) {
                if (value.href == currentView) {
                    value.liClass += ' ' + selectedClassName;
                }
            });

            $scope.changeView = function (item) {
                ng.forEach($scope.menu, function (value) {
                    value.liClass = value.liClass.replace(selectedClassName, '');
                    if (value.name == item.name) {
                        value.liClass += ' ' + selectedClassName;
                    }
                });
            };
        }
    ]);

    return module;
});

