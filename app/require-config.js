/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
(function () {
    if (!window.console) {
        window.console = {};
    }
    // union of Chrome, FF, IE, and Safari console methods
    var m = [
        "log", "info", "warn", "error", "debug", "trace", "dir", "group",
        "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
        "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
    ];
    // define undefined methods as noops to prevent errors
    for (var i = 0; i < m.length; i++) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = function () {
            };
        }
    }
})();

require.config({
    baseUrl: '.',

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'angular': '../bower_components/angular/angular',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'vis': '../bower_components/vis/dist/vis',
        'wow': '../bower_components/wow/dist/wow',
        'image-scroll': '../bower_components/Parallax-ImageScroll/jquery.imageScroll',
        'app': 'js/app',
        'templates': 'js/templates'
    },

    packages: ['components/timeline', 'components/project'],

    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        }
    }
});

// Start the main app logic.
require(['angular', 'app'], function (ng) {
    "use strict";

    ng.bootstrap(document, ['resumeApp']);
});