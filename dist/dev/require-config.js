(function () {

    require.config({
        baseUrl: '.',

        paths: {
            // statement "('.'.length === 1 ? '../' : '')" must be repeated because r.js doesn't read variables
            'jquery': ('.'.length === 1 ? '../' : '') + '../bower_components/jquery/dist/jquery',
            'angular': ('.'.length === 1 ? '../' : '') + '../bower_components/angular/angular',
            'angular-animate': ('.'.length === 1 ? '../' : '') + '../bower_components/angular-animate/angular-animate',
            'bootstrap': ('.'.length === 1 ? '../' : '') + '../bower_components/bootstrap/dist/js/bootstrap.min',
            'vis': ('.'.length === 1 ? '../' : '') + '../bower_components/vis/dist/vis',
            'wow': ('.'.length === 1 ? '../' : '') + '../bower_components/wow/dist/wow',
            'moment': ('.'.length === 1 ? '../' : '') + '../bower_components/moment/moment',
            'one-page-nav': ('.'.length === 1 ? '../' : '') + '../bower_components/jQuery-One-Page-Nav/jquery.nav',
            'main': 'js/main',
            'templates': 'js/templates',
            'jquery.knob': 'js/libs/jquery.knob',
            'chroma-js': ('.'.length === 1 ? '../' : '') + '../bower_components/chroma-js/chroma',
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