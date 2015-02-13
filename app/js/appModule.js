define([
    'angular',
    'components/timeline',
    'components/project',
    'components/navigation',
    'bootstrap'
], function (ng) {
    'use strict';

    return ng.module('resumeApp', [
        'timelineModule',
        'projectModule',
        'navigationModule'
    ]);
});

