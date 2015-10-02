define([
    'angular',
    'jquery',
    'app-module'
], function (ng, $) {
    'use strict';

    $(document).ready(function () {
        ng.bootstrap(document, ['resumeApp']);
    });
});

