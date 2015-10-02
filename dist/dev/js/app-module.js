define([
    'angular',
    'jquery',
    'wow',
    'sunlight',
    'sunlight.javascript',
    'sunlight.css',
    'sunlight.xml',
    'jquery.knob',
    'components/timeline/main',
    'components/project/main',
    'components/navigation/main',
    'components/letters/main',
    'components/skill/main',
    'components/background-code/main',
    'components/views/main',
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
            'viewsModule'
        ])
        .run(['$q', '$timeout', 'TimelinePromise', 'SkillPromise', 'LettersPromise', 'BackgroundPromise',
            function ($q, $timeout, TimelinePromise, SkillPromise, LettersPromise, BackgroundPromise) {

                var sunlightOptions = {
                    lineNumbers: false
                };

                $q.all([/*TimelinePromise.getPromise(), SkillPromise.getPromise(), */BackgroundPromise.getPromise()])
                    .then(function (value) {
                        new wow().init();
                        $('[data-toggle="tooltip"]').tooltip();

                        sunlight.highlightAll(sunlightOptions);

                    })
                    .then(function () {
                        $('#skills').find('.skill').knob({
                            width: 100,
                            height: 100,
                            readOnly: true,
                            angleOffset: -120,
                            angleArc: 250
                        });
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

