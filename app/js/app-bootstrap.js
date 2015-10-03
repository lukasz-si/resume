define([
    'angular',
    'jquery',
    'resumeApp'
], function (ng, $) {
    'use strict';

    $(document).ready(function () {
        ng.bootstrap(document, ['resumeApp']);
    });
});

