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
        .run(['$q', '$timeout', 'TimelinePromise', 'SkillPromise', 'LettersPromise', 'BackgroundPromise',
            function ($q, $timeout, TimelinePromise, SkillPromise, LettersPromise, BackgroundPromise) {

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
                        $('#skills').find('.skill').knob({
                            width: 100,
                            height: 100,
                            readOnly: true,
                            angleOffset: -120,
                            angleArc: 250
                        });
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
