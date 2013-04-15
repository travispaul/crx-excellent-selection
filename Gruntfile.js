var fs = require('fs');

module.exports = function(grunt) {

    // NPM tasks
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            tests: ["build/tests"]
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
        }
        uglify: {
            main: {
                options: {
                    report: 'min',
                    banner: "// <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> \n"
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
                    banner: "/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */"
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
        }
    });

    grunt.registerTask('default', [
        'clean:build',
        'mkdir',
        'copy',
        'clean:tests',
        'uglify',
        'cssmin'
    ]);

};