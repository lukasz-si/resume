define([
    'angular',
    'jquery',
    'wow',
    'js/appModule',
    'bootstrap'
], function (ng, $, wow) {
    'use strict';

    ng.bootstrap(document, ['resumeApp']);

    new wow().init();

    $('[data-toggle="tooltip"]').tooltip();
});

