/*global module:false*/
module.exports = function (grunt) {
    var fs = require('fs-sync'),
        baseUrl = "app/js",
        paths = {
            "jquery": "../../bower_components/jquery/dist/jquery"
        };
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
                    baseUrl: baseUrl,
                    paths: paths,
                    // build file destination, relative to the build file itself
                    out: function (text, sourceMapText) {
                        var configFile = grunt.file.readJSON('bower.json'),
                            version = configFile.version,
                            newDirectory = "dist/" + version,
                            appendVersion = false;

                        if (!fs.exists(newDirectory)) {
                            fs.mkdir(newDirectory);
                            appendVersion = true;
                        }

                        fs.write("dist/resume.js", text);
                        fs.copy("dist/resume.js", newDirectory + "/resume.js", {force: true});

                        fs.copy("app/js/styles/resume.css", newDirectory + "/resume.css", {force: true});
                        fs.copy("app/js/styles/resume.css", "dist/resume.css", {force: true});

                        if (appendVersion) {
                            var file = fs.read('dist/versions.txt'),
                                versions = file.split('\n'),
                                output = "",
                                alreadyinList = false,
                                i;

                            versions.splice(versions.length - 1, 1);

                            for (i = 0; i < versions.length; i++) {
                                if (versions[i] === version) {
                                    alreadyinList = true;
                                    break;
                                }
                            }
                            if (!alreadyinList) {
                                versions.push(version);
                            }

                            for (i = 0; i < versions.length; i++) {
                                output += versions[i] + '\n';
                            }

                            fs.write('dist/versions.txt', output);
                        }
                    },
                    // uglify | uglify2
                    optimize: "none"

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
                    'dist/css/resume.css': 'app/sass/resume.scss'
                }
            }
        },
        watch: {
            scss: {
                files: ['app/sass/*.scss'],
                tasks: ['sass']
            }
        },
        ngtemplates: {
            app: {
                cwd: '',
                src: 'app/components/**/**.html',
                dest: 'app/js/templates.js',
                options: {
                    module: 'templates',
                    standalone: true,
                    url: function (url) {
                        return url.replace(/.*\//g, '');
                    },
                    bootstrap:  function(module, script) {
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
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
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

    // Default task.
    grunt.registerTask('default', ['sass', 'jasmine:coverage', 'requirejs', 'concat', 'uglify']);

    grunt.registerTask('doc', ['jsdoc']);
    grunt.registerTask('test', ['jasmine:coverage']);
};
