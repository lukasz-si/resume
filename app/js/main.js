define([
    'angular',
    'jquery',
    'wow',
    'js/appModule'
], function (ng, $, wow) {
    'use strict';

    ng.bootstrap(document, ['resumeApp']);

    new wow().init();
});

