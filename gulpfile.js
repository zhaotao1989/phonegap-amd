(function (factory) {
    "use strict";

    module.exports = factory(require('gulp'), require, require('path'), require('bower-files'), require('gulp-clean'));
}(function(gulp, require, path, bower, clean) {
    'use strict';

    // Override default options
    var options = {
        // Set task matching pattern.
        // See `minimatch` for more details about pattern format.
        // Type: `String|Array`
        // Default: 'tasks/**/*.js'
        pattern: ['tasks/**/*.js'],

        // Provide argument options.
        // Useful for creating conditional tasks.
        // For example, `gulp deploy --port=3000`
        // Type: `Object`
        // Default: require('yarg').argv
        argv: require('minimist')(process.argv),

        // Current working directory.
        // Useful e.g. for location config files,
        // like `configFile: path.join(options.cwd, 'karma.conf.js')`
        // Type: `String`
        // Default: process.cwd()
        cwd: 'src/',

        // Add any additional parameters
        foo: 'bar',

        // gulp util template required
        file: '',

        // 第三方依赖脚本目录
        deps: 'www/libs'
    };

    gulp.task('deps:clean', function(){
        return gulp.src(options.deps)
            .pipe(clean());
    });

    gulp.task('deps:install', ['deps:clean'], function(){
        return gulp.src(bower().files).pipe(gulp.dest('www/libs'));
    });

    gulp.task('setup', ['deps:install']);

    gulp.task('default', ['setup']);
}));