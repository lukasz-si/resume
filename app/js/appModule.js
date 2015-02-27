define([
    'angular',
    'jquery',
    'wow',
    'components/timeline',
    'components/project',
    'components/navigation',
    'components/introduction',
    'bootstrap'
], function (ng, $, wow) {
    'use strict';

    return ng.module('resumeApp', [
            'timelineModule',
            'projectModule',
            'navigationModule',
            'introductionModule'
        ])
        .run(['$q', '$timeout', 'OnImageLoadService', 'TimelinePromise', function ($q, $timeout, OnImageLoadService, TimelinePromise) {

            $q.all([TimelinePromise.getPromise()/*OnImageLoadService.getPromise()*/])
                .then(function (value) {
                    new wow().init();
                    $('[data-toggle="tooltip"]').tooltip();
                })
                .then(function () {
                    $('.main-wrapper').animate({
                        opacity: 1
                    }, 2000);
                    $('.loader-wrapper').remove();
                });
        }]);

});

