/**
 * Created by n0212893 on 6/27/2016.
 */

const gulp = require('gulp');
const semver = require('semver');
const jshint = require('gulp-jshint');

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
            globals: []
        }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

//default task
gulp.task('default', gulp.series(gulp.parallel('version','lint'), function (done) {
    console.log('BUILD OK');
    done();
}));
