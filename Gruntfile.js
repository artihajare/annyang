module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'annyang.js',
        'sites/facebook.js',
        'sites/geektime.js',
        'test/spec/*Spec.js'
      ],
      options: {
        jshintrc: true
      }
    },
    watch: {
      files: ['annyang.js', 'sites/facebook.js', 'sites/geektime.js', 'demo/css/main.css', 'test/spec/*Spec.js', '!**/node_modules/**'],
      tasks: ['default'],
    },
    uglify: {
      options: {
        preserveComments: /^\! /
      },
      all: {
        files: {
          'annyang.min.js': ['annyang.js'],
          'sites/facebook.min.js': ['annyang.js', 'sites/facebook.js'],
          'sites/geektime.min.js': ['annyang.js', 'sites/geektime.js'],
        }
      }
    },
    imagemin: {
      demoimages: {                       // Target
        options: {                        // Target options
        },
        files: [{
          expand: true,                   // Enable dynamic expansion
          cwd: 'demo/images',             // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'],       // Actual patterns to match
          dest: 'demo/images'             // Destination path prefix
        }]
      },
    },
    cssmin: {
      combine: {
        files: {
          'demo/css/main.min.css': ['demo/css/main.css', 'demo/vendor/css/default.css', 'demo/vendor/css/github.css']
        }
      }
    },
    markdox: {
      target: {
        files: [
          {src: 'annyang.js', dest: 'docs/README.md'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          protocol: 'https',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'https://localhost:8443/demo'
        }
      }
    },
    jasmine: {
      testAndCoverage: {
        src: ['annyang.js'],
        options: {
          specs: ['test/spec/*Spec.js'],
          outfile: 'test/SpecRunner.html',
          polyfills: ['test/vendor/corti.js', 'test/init_corti.js'],
          keepRunner: true,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'test/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'test/coverage'
                }
              },
              {
                type: 'text'
              }
            ],
            thresholds: {
              lines: 0,
              statements: 0,
              branches: 0,
              functions: 0
            }
          }
        }
      }
    }
  });

  // Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-markdox');

  // Register tasks
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'jasmine', 'markdox']);
  grunt.registerTask('dev', ['default', 'connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'jasmine']);

};
