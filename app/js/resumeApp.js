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
    'components/letters/main',
    'components/skill/main',
    'components/background-code/main',
    'components/views/main',
    'commonModule',
    'bootstrap'
], function (ng, $, wow, sunlight) {
    'use strict';

    return ng.module('resumeApp', [
            'timelineModule',
            'projectModule',
            'navigationModule',
            'lettersModule',
            'skillModule',
            'backgroundModule',
            'viewsModule',
            'commonModule'
        ])
        .run(['$q', '$timeout', 'TimelinePromise', 'SkillPromise', 'LettersPromise', 'BackgroundPromise',
            function ($q, $timeout, TimelinePromise, SkillPromise, LettersPromise, BackgroundPromise) {

                var sunlightOptions = {
                    lineNumbers: false
                };

                $q.all([/*TimelinePromise.getPromise(), SkillPromise.getPromise(), */BackgroundPromise.getPromise()])
                    .then(function () {
//                        new wow().init();
                        $('[data-toggle="tooltip"]').tooltip();

                        sunlight.highlightAll(sunlightOptions);

                    })
                    .then(function () {
                        $('.loader-wrapper').remove();

                        $timeout(function () {
                            $('.main-wrapper').animate({
                                opacity: 1
                            }, 2000);

                            $timeout(function () {
                                LettersPromise.getDefer().resolve();
                            }, 1000);
                        }, 300);
                    });
            }]);
});

