module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            test: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    dest: '.tmp',
                    src: ['images/*', 'scripts/*', 'views/*'],

                }],
            },
            run: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    dest: 'dist',
                    src: ['images/*', 'views/*'],

                }],
            },
        },
        clean: {
            test: ['.tmp'],
            run: ['dist'],
        },
        watch: {
            scripts: {
                files: ['app/index.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },

        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/output.min.js': ['app/scripts/*.js']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.html'],
                    dest: 'dist/'
                }]
            }
        },
        jade: {
            test: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    ".tmp/index.html": ["app/index.jade"]
                }
            },
            run: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "dist/index.html": ["app/index.jade"]
                }
            },
        },
        less: {
            files: {
                ".tmp/scripts": "app/scripts/*.less"
            }
        },
        jshint: {

            all: ['gruntfile.js', 'app/scripts/*.js']
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'www-root'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('serve', ['watch', 'connect', 'clean:test', 'copy:test', 'less', 'jshint', 'jade:test']);
    grunt.registerTask('build', ['clean:run', 'jade:run', 'htmlmin', 'imagemin', 'copy:run', 'uglify']);

};