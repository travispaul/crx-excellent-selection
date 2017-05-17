module.exports = function(grunt) {

    // NPM tasks
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

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
        }
    });

    grunt.registerTask('default', [
        'clean:build',
        'mkdir',
        'copy',
        'clean:tests',
        'uglify',
        'cssmin',
        'htmlmin'
    ]);

};
