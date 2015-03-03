define([
    'angular',
    'jquery',
    'wow',
    'components/timeline',
    'components/project',
    'components/navigation',
    'components/introduction',
    'components/skill',
    'bootstrap'
], function (ng, $, wow) {
    'use strict';

    return ng.module('resumeApp', [
            'timelineModule',
            'projectModule',
            'navigationModule',
            'introductionModule',
            'skillModule'
        ])
        .run(['$q', '$timeout', 'OnImageLoadService', 'TimelinePromise', 'SkillPromise', function ($q, $timeout, OnImageLoadService, TimelinePromise, SkillPromise) {

            $q.all([TimelinePromise.getPromise(), SkillPromise.getPromise()/*OnImageLoadService.getPromise()*/])
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

