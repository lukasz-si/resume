(function () {

    require.config({
        baseUrl: '.',

        paths: {
            // statement "('%%VERSION%%'.length === 1 ? '../' : '')" must be repeated because r.js doesn't read variables
            'jquery': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/jquery/dist/jquery',
            'angular': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/angular/angular',
            'angular-animate': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/angular-animate/angular-animate',
            'angular-route': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/angular-route/angular-route',
            'bootstrap': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/bootstrap/dist/js/bootstrap.min',
            'vis': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/vis/dist/vis',
            'wow': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/wow/dist/wow',
            'moment': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/moment/moment',
            'one-page-nav': ('%%VERSION%%'.length === 1 ? '../' : '') + '../bower_components/jQuery-One-Page-Nav/jquery.nav',
            'app-bootstrap': 'js/app-bootstrap',
            'app-module': 'js/app-module',
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
            'angular-route': {
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
    require(['app-bootstrap'], function () {
        "use strict";
    });

})();