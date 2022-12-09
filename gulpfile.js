'use strict';
const { series, src, dest } = require('gulp');
const cssmin = require('gulp-cssmin');

function cssminFn() {
  return src(["./lib/index.min.css"])
    .pipe(cssmin())
    .pipe(dest("./lib"));
}

exports.build = series(cssminFn);