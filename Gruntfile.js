module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        manifest: grunt.file.readJSON('src/manifest.json'),
        mkdir: {
            all: {
                options: {
                    mode: 0700,
                    create: ['build']
                }
            }
        },
        clean: {
            build: ["build"],
            tests: ["build/tests", "build/img/*.xcf", "build/img/screenshots"]
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**'],
                        dest: 'build/'
                    }
                ]
            }
        },
        uglify: {
            main: {
                options: {
                    report: 'min',
                    banner: "//<%= pkg.name %> v<%= manifest.version %>\n"
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: [
                            'js/**.js',
                            '!js/**.min.js'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            main: {
                options: {
                    report: 'min',
                    keepSpecialComments: 1,
                    banner: "/*<%= pkg.name %> v<%= manifest.version %>*/"
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: [
                            
                            'css/**.css',
                            '!css/**.min.css',
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: [
                            
                            '*.html',
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        qunit: {
            all: ['src/test/index.html']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            default: [
                'src/js/excellent.js',
                'src/test/test.js',
                'src/js/background.js',
                'src/js/options.js',
                'src/js/install.js'],
            dev: {
                options: {
                    jshintrc: '.jshintrc.node'
                },
                src: ['Gruntfile.js']
            }
        }
    });

    grunt.registerTask('release', 'Generate release notes', function() {
        var
            exec = require('child_process').exec,
            fs = require('fs'),
            done = this.async();
        exec('git log  --pretty=format:"<li> %ad (%h): %s</li>" --date=short', function (err, stdout) {
            fs.writeFile('build/release.html', '<ul>' + stdout + '</ul>', {flag: fs.O_TRUNC}, function (err) {
            if (err) {
                throw err;
            }
            done();
            });
        });
    });

    grunt.registerTask('default', [
        'qunit',
        'jshint',
        'clean:build',
        'mkdir',
        'copy',
        'clean:tests',
        'uglify',
        'cssmin',
        'release',
        'htmlmin'
    ]);
};