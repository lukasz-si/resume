define([
    'angular',
    'jquery',
    'js/appModule'
], function (ng, $) {
    'use strict';

    $(document).ready(function () {
        ng.bootstrap(document, ['resumeApp']);
    });
});

