/**
 * Created by n0212893 on 6/27/2016.
 */

const gulp = require('gulp');
const semver = require('semver');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
const webserver = require('gulp-webserver');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const karma = require('gulp-karma-runner');

//start karma server
gulp.task('karma', function() {
   return gulp.src([
       'spec/**/*.js',
       'src/**/*.js'
   ],
   {'read': false}).pipe(
        karma.server({
            configFile: __dirname + '/karma.conf.js',
            'singleRun': false
        })
    );
});

//run tests in karma
gulp.task('test', function () {
    return gulp.src([
        'spec/**/*.js',
        'src/**/*.js'
    ],
        {'read': false}).pipe(
        karma.runner({
            configFile: __dirname + '/karma.conf.js',
            'singleRun': false
        })
    );
});

//jasmine test
gulp.task('jasmine', function(done) {
  gulp.src('spec/*.js')
    .pipe(jasmine({
        reporter: new reporters.TerminalReporter({
          verbosity: 3,
          color: true
        })
    }));
    done();
});

//run webserver
gulp.task('run', function () {
   gulp.src('.')
    .pipe(webserver({
           livereload: true,
           open: true,
           port: 3000,
           https: true
       }));
});

//eslint
gulp.task('eslint', function () {
   return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//check node version task
gulp.task('version', function (done) {
    console.log("Checking node version:");

    const actualVersion = process.version;
    const packageJson = require('./package.json');
    const expectedVersion = packageJson.engines.node;


    if (semver.gt(expectedVersion,actualVersion)) {
        console.log('Incorrect node version. Expected ' +
        expectedVersion + '. Actual: ' + actualVersion);
        process.exit(1);
    } else {
        console.log('Node Version:' + actualVersion);
    }
    done();
});

//Check for code style errors using Lint
gulp.task('lint', function () {
    console.log('Linting JavaScript: ');
    return gulp.src(['gulpfile.js','src/**/*.js'])
    .pipe(jshint({
            esversion: 6,
            node: true,
            browser: true,
            globals: [],
            eqeqeq: true
        }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

//default task
gulp.task('default', gulp.series(gulp.parallel('version','eslint','lint'), function (done) {
    console.log('BUILD OK');
    done();
}));
