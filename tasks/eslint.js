'use strict';

module.exports = function eslint(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-eslint');

    // Options
    return {
        options: {
            configFile: '.eslintrc',
            rulePaths: ['node_modules/eslint/lib/rules']
        },
        target: ['bootstarp.js',
            'utils/**/*.js',
            'services/**/*.js'
        ]
    };
};