define([
    'angular',
    'components/timeline',
    'components/project',
    'components/navigation',
    'components/introduction',
    'bootstrap'
], function (ng) {
    'use strict';

    return ng.module('resumeApp', [
        'timelineModule',
        'projectModule',
        'navigationModule',
        'introductionModule'
    ]);
});

