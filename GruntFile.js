/*global module:false*/
module.exports = function (grunt) {
    var fs = require('fs-sync'),
        baseUrl = 'app',
        debug = true;

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
                    out: function (text) {
                        var configFile = grunt.file.readJSON('bower.json'),
                            version = configFile.version,
                            newDirectory = "dist/" + version,
                            appendVersion = false;

                        if (!fs.exists(newDirectory)) {
                            fs.mkdir(newDirectory);
//                            appendVersion = true;
                        }

                        fs.write("dist/" + version + "/js/resume-no-version.js", text);

//                        fs.copy("app/js/styles/resume.css", newDirectory + "/resume.css", {force: true});
//                        fs.copy("app/js/styles/resume.css", "dist/resume.css", {force: true});
                    },
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
                sourceMap: false,
                outputStyle: "compressed" // nested | compressed
            },
            dist: {
                files: {
                    'dist/<%= pkg.version %>/css/resume.css': 'app/sass/resume.scss'
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
                    'dist/index.html': 'dist/index-uncompressed.html'
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    'dist/index-uncompressed.html': 'app/index.html',
                    'dist/<%= pkg.version %>/js/resume.js': 'dist/<%= pkg.version %>/js/resume-no-version.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: /%%VERSION%%/g,
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            pattern: /%%BASE_SCRIPT%%/g,
                            replacement: debug ? '<script data-main="../app/require-config" src="../bower_components/requirejs/require.js"></script>' :
                                '<script src="<%= pkg.version %>/js/resume.js"></script>'
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
                src: 'app/fonts/*',
                dest: 'dist/<%= pkg.version %>/fonts/',
                expand: true,
                flatten: true
            },
            data: {
                src: 'app/data/*',
                dest: 'dist/<%= pkg.version %>/data/',
                expand: true,
                flatten: true
            }
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
        jasmine: {
            coverage: {
                src: "app/js/**/*.js",
                options: {
                    specs: 'test/unit/**/*Test.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'test/code-coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: 'test/code-coverage/html'
                                }
                            },
                            {
                                type: 'text',
                                options: {
                                    file: 'test/code-coverage/summary/summary.txt'
                                }
                            },
                            {
                                type: 'text'
                            }
                        ],
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfig: {
                                baseUrl: ".grunt/grunt-contrib-jasmine/" + baseUrl,
                                paths: {
                                    "jquery": "../../../bower_components/jquery/dist/jquery"
                                }
                            }
                        }
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
        },
        jsdoc: {
            dist: {
                src: ['app/js/**/*.js', 'README.md'],
                options: {
//                    tutorials: "tutorials/",
                    private: false,
                    destination: 'doc',
                    template: "node_modules/ink-docstrap/template",
                    config: "jsdoc.conf.json"
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['sass', 'ngtemplates', 'requirejs', 'string-replace', 'copy', 'htmlmin'/*, 'uglify'*/]);

    grunt.registerTask('doc', ['jsdoc']);
    grunt.registerTask('test', ['jasmine:coverage']);
};
