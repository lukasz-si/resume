define([
    'angular',
    'components/timeline',
    'components/project',
    'bootstrap'
], function (ng) {
    'use strict';

    return ng.module('resumeApp', [
        'timelineModule',
        'projectModule'
    ]);
});

