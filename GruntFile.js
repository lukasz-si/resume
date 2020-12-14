/*global module:false*/
module.exports = function (grunt) {
    const fs = require('fs-sync');
    const baseUrl = 'app';
    const debug = false;
    const sass = require('node-sass');

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('bower.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* see: " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors.join(", ") %>\n' +
            '* Licensed: <%= pkg.license.type %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['dist/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    // build file destination, relative to the build file itself
                    out: "dist/prod/<%= pkg.version %>/js/resume-no-version.js",
                    // none | uglify | uglify2
                    optimize: debug ? "none" : "uglify2",
                    name: "js/main",
                    insertRequire: ["js/main"],
                    mainConfigFile: "app/require-config.js",
                    include: "../bower_components/requirejs/require",
                    exclude: [],
                    wrap: {
                        startFile: "startLib.js",
                        endFile: "endLib.js"
                    }
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: false,
                outputStyle: "compressed" // nested | compressed
            },
            dist: {
                files: {
                    'dist/prod/<%= pkg.version %>/css/resume.css': 'app/sass/resume.scss',
                    'dist/dev/css/resume.css': 'app/sass/resume.scss'
                }
            }
        },
        watch: {
            scss: {
                files: ['app/sass/**/*.scss'],
                tasks: ['sass']
            },
            ngtemplates: {
                files: ['app/**/*-template.html'],
                tasks: ['ngtemplates']
            },
            'fonts-dev': {
                files: ['app/fonts/**'],
                tasks: ['copy:fonts-dev']
            },
            dev: {
                files: ['app/**/*.html', 'app/**/*.js', 'app/data/*.json'],
                tasks: ['string-replace:dev']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true, // Only if you don't use comment directives!
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/prod/index.html': 'dist/prod/index-uncompressed.html'
                }
            }
        },
        'string-replace': {
            prod: {
                files: {
                    'dist/prod/index-uncompressed.html': 'app/index.html',
                    'dist/prod/<%= pkg.version %>/js/resume.js': 'dist/prod/<%= pkg.version %>/js/resume-no-version.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: /%%VERSION%%/g,
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            pattern: /%%BASE_SCRIPT%%/g,
                            replacement: '<script src="<%= pkg.version %>/js/resume.js"></script>'
                        }
                    ]
                }
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        dest: 'dist/dev/',
                        src: ['index.html', 'require-config.js', 'js/**', 'components/**', 'data/**']
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern: /%%VERSION%%/g,
                            replacement: '.'
                        },
                        {
                            pattern: /%%BASE_SCRIPT%%/g,
                            replacement: '<script data-main="require-config" src="../../bower_components/requirejs/require.js"></script>'
                        }
                    ]
                }
            }
        },
        copy: {
//            index: {
//                src: 'app/index.html',
//                dest: 'dist/index-uncompressed.html',
//                options: {
//                    process: function (content, srcpath) {
//                        var configFile = grunt.file.readJSON('bower.json');
//
//                        return content.replace(/%%VERSION%%/g, configFile.version);
//                    }
//                }
//            },
            fonts: {
                src: '**',
                dest: 'dist/prod/<%= pkg.version %>/fonts/',
                cwd: 'app/fonts/',
                expand: true,
                flatten: false
            },
            'fonts-dev': {
                src: '**',
                dest: 'dist/dev/fonts/',
                cwd: 'app/fonts/',
                expand: true,
                flatten: false
            },
            data: {
                src: 'app/data/*',
                dest: 'dist/prod/<%= pkg.version %>/data/',
                expand: true,
                flatten: true
            },
            favicon: {
                src: 'app/favicon.ico',
                dest: 'dist/prod/',
                expand: true,
                flatten: true
            }
        },
        clean: {
            prod: ['dist/prod'],
            dev: ['dist/dev']
        },
        ngtemplates: {
            app: {
                cwd: '',
                src: 'app/components/**/*-template.html',
                dest: 'app/js/templates.js',
                options: {
                    module: 'templates',
                    standalone: true,
                    url: function (url) {
                        return url.replace(/.*\//g, '');
                    },
                    bootstrap: function (module, script) {
                        return 'define(["angular"], function(ng) { ng.module("' + module + '", []).run(["$templateCache", function($templateCache) {' + script + ' }]); return ng; });';
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'dist/<%= pkg.version %>/js/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.version %>/js/<%= pkg.name %>.min.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task.
    grunt.registerTask('default', ['dev', 'prod']);

    grunt.registerTask('prod', ['clean:prod', 'sass', 'ngtemplates', 'requirejs', 'string-replace:prod', 'copy:fonts', 'copy:data', 'copy:favicon', 'htmlmin']);
    grunt.registerTask('dev', ['clean:dev', 'sass', 'ngtemplates', 'string-replace:dev', 'copy:fonts-dev']);
};
