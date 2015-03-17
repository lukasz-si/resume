define([
    'angular',
    'jquery',
    'wow',
    'sunlight',
    'sunlight.javascript',
    'sunlight.css',
    'sunlight.xml',
    'components/timeline/main',
    'components/project/main',
    'components/navigation/main',
    'components/introduction/main',
    'components/skill/main',
    'components/background-code/main',
    'bootstrap'
], function (ng, $, wow, sunlight) {
    'use strict';

    return ng.module('resumeApp', [
            'timelineModule',
            'projectModule',
            'navigationModule',
            'introductionModule',
            'skillModule',
            'backgroundModule'
        ])
        .run(['$q', '$timeout', 'OnImageLoadService', 'TimelinePromise', 'SkillPromise', 'LettersPromise', 'BackgroundPromise',
            function ($q, $timeout, OnImageLoadService, TimelinePromise, SkillPromise, LettersPromise, BackgroundPromise) {

                var sunlightOptions = {
                    lineNumbers: false
                };

                $q.all([TimelinePromise.getPromise(), SkillPromise.getPromise(), BackgroundPromise.getPromise()])
                    .then(function (value) {
                        new wow().init();
                        $('[data-toggle="tooltip"]').tooltip();

                        sunlight.highlightAll(sunlightOptions);

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

