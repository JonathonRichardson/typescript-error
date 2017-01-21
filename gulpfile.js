const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const Reporter = require('jasmine-console-reporter');
const merge = require('merge2');
var ts = require("gulp-typescript");

gulp.task("build", function () {
    var tsProject = ts.createProject("tsconfig.json");
    var compiled = tsProject.src().pipe(tsProject());

    var js  = compiled.js;
    var dts = compiled.dts;

    var dest = gulp.dest("./src");

    return merge([
        js.pipe(dest),
        dts.pipe(dest)
    ]);
});

gulp.task('test', ['build'], function() {
    gulp.src('spec/**/*.js')
        .pipe(jasmine({
            reporter: new Reporter()
        }));
});
