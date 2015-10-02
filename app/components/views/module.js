define([
    'angular',
    'angular-animate',
    'angular-route'
], function (ng) {
    'use strict';

    return ng.module('viewsModule', ['ngAnimate', 'ngRoute'])
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider
                .when("/introduction", {templateUrl: 'introduction-view-template.html', controller: 'IntroductionController'})
                .when("/timeline", {templateUrl: "timeline-view-template.html"})
                .when("/projects", {templateUrl: 'projects-view-template.html'})
                .when("/skills", {templateUrl: 'skills-view-template.html'})
                .when("/links", {templateUrl: 'links-view-template.html'})
                .when("/print", {templateUrl: 'print-view-template.html'})
                .otherwise({
                    redirectTo: "/introduction"
                })
        }]);
});

