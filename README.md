# gulp-comps
[![npm version](https://badge.fury.io/js/gulp-comps.svg)](https://badge.fury.io/js/gulp-here)

Using comps in gulp stream.


## Install

```bash
npm install gulp-comps --save-dev
```

## Usage

```js
var CompsStream = require('gulp-comps')
gulp.src('asserts/*.html')
    .pipe(CompsStream())
    .pipe(gulp.dest('dist'))
```