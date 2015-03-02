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
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'vis': '../bower_components/vis/dist/vis',
        'wow': '../bower_components/wow/dist/wow',
        'image-scroll': '../bower_components/Parallax-ImageScroll/jquery.imageScroll',
        'moment': '../bower_components/moment/moment',
        'one-page-nav': '../bower_components/jQuery-One-Page-Nav/jquery.nav',
        'main': 'js/main',
        'templates': 'js/templates'
    },

    packages: ['components/timeline', 'components/project', 'components/navigation', 'components/introduction'],

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
        },
        'one-page-nav': {
            deps: ['jquery']
        },
        'wow': {
            exports: 'WOW'
        }
    },

    config: {
        moment: {
            noGlobal: true
        }
    }
});

// Start the main app logic.
require(['main'], function () {
    "use strict";

});