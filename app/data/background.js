define([
    'angular',
    'jquery',
    'wow',
    'components/timeline/main',
    'components/project/main',
    'components/navigation/main',
    'components/introduction/main',
    'components/skill/main',
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
        .run(['$q', '$timeout', 'OnImageLoadService', 'TimelinePromise', 'SkillPromise', 'LettersPromise',
            function ($q, $timeout, OnImageLoadService, TimelinePromise, SkillPromise, LettersPromise) {

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

                        LettersPromise.getDefer().resolve();
                    });
            }]);

});

