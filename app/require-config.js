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

(function () {

    require.config({
        baseUrl: '.',

        paths: {
            // statement "('%%VERSION%%'.length === 1 ? '../' : '')" must be repeated because r.js doesn't read variables
            'jquery': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/jquery/dist/jquery',
            'angular': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/angular/angular',
            'angular-animate': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/angular-animate/angular-animate',
            'bootstrap': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/bootstrap/dist/js/bootstrap.min',
            'vis': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/vis/dist/vis',
            'wow': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/wow/dist/wow',
//            'image-scroll': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/Parallax-ImageScroll/jquery.imageScroll',
            'moment': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/moment/moment',
            'one-page-nav': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/jQuery-One-Page-Nav/jquery.nav',
            'main': 'js/main',
            'templates': 'js/templates',
            'jquery.knob': 'js/libs/jquery.knob',
            'chroma-js': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/chroma-js/chroma',
            'sunlight': 'js/libs/sunlight-min',
            'sunlight.css': 'js/libs/sunlight.css-min',
            'sunlight.javascript': 'js/libs/sunlight.javascript-min',
            'sunlight.xml': 'js/libs/sunlight.xml-min'
        },
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
            'angular-animate': {
                deps: ['angular']
            },
            'one-page-nav': {
                deps: ['jquery']
            },
            'wow': {
                exports: 'WOW'
            },
            'sunlight': {
                exports: 'Sunlight'
            },
            'sunlight.css': {
                deps: ['sunlight']
            },
            'sunlight.javascript': {
                deps: ['sunlight']
            },
            'sunlight.xml': {
                deps: ['sunlight']
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

})();