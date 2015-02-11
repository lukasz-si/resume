define([
    'angular',
    'components/timeline'
], function (ng) {
    'use strict';

    var mainModule = ng.module('resumeApp', [
        'timelineModule'
    ]);

    return mainModule;
});

