'use strict';

var path = require('path');
var glob = require('glob');
var browserify = require('browserify');
var watchify = require('watchify');
var envify = require('envify');
var _ = require('lodash');
var vsource = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');

var fileHeader = require('../core/static-values/header');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var entries = config.entries;

  var browserifyTask = function({
    files,
    dest,
    rename = false,
    header = '',
  }) {
    return files.map(function(entry) {

      // Options
      var customOpts = {
        entries: [entry],
        debug: true,
        transform: [
          envify  // Sets NODE_ENV for better optimization of npm packages
        ]
      };

      var bundler = browserify(customOpts);

      // Setup Watchify for faster builds
      var opts = _.assign({}, watchify.args, customOpts);
      bundler = watchify(browserify(opts));

      var rebundle = function() {
        var startTime = new Date().getTime();
        bundler.bundle()
          .on('error', function(err) {
            plugins.util.log(
              plugins.util.colors.red('Browserify compile error:'),
              '\n',
              err,
              '\n'
            );
            this.emit('end');
          })
          .pipe(vsource(entry))
          .pipe(buffer())
          .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(gulpif(args.production, plugins.uglify()))
            .on('error', plugins.util.log)
          .pipe(plugins.rename(function(filepath) {
            // Remove 'source' directory as well as prefixed folder underscores
            // Ex: 'src/_scripts' --> '/scripts'
            filepath.dirname = filepath.dirname.replace(dirs.source, '').replace('_', '');
            if (rename) {
              filepath.basename = rename;
            }
          }))
          .pipe(plugins.header(header))
          .pipe(plugins.sourcemaps.write('./'))
          .pipe(gulp.dest(dest))
          // Show which file was bundled and how long it took
          .on('end', function() {
            var time = (new Date().getTime() - startTime) / 1000;
            console.log(
              plugins.util.colors.cyan(entry)
              + ' was browserified: '
              + plugins.util.colors.magenta(time + 's'));
            return browserSync.reload('*.js');
          });
      };

      bundler.on('update', rebundle); // on any dep update, runs the bundler
      bundler.on('log', plugins.util.log); // output build logs to terminal

      return rebundle();
    });
  };

  function dist_compile({ done, src, type = '', header }) {
    if (!args.production) return done();
    return glob(src, function(err, files) {
      if (err) done(err);
      var dest = path.resolve('./dist');
      return browserifyTask({
        files,
        dest,
        rename: 'time-input-polyfill'+type+'.min',
        header,
      });
    });
  }

  // Browserify JS library
  gulp.task('browserify:dist:manual', function(done) {
    return dist_compile({ done, src: './index.js', header: fileHeader });
  });

  // Browserify JS library
  gulp.task('browserify:dist:auto', function(done) {
    return dist_compile({ done, src: './auto.js', type: '.auto', header: [
      '// == TIME INPUT POLYFILL AUTO LOADER ==\n',
      '// This file checks input[type=time] support, ',
      'loads the polyfill if not supported, ',
      'then applies the polyfill to all input[type=time] elements if not supported.\n',
      '// This is not the actual time input polyfill\n',
    ].join('')
  });
  });

  gulp.task('browserify:dist', ['browserify:dist:manual', 'browserify:dist:auto']);

  // Browserify demo site
  gulp.task('browserify:site', function(done) {
    return glob('./' + path.join(dirs.source, dirs.scripts, entries.js), function(err, files) {
      if (err) done(err);
      var dest = path.resolve(taskTarget);
      return browserifyTask({ files, dest });
    });
  });

  gulp.task('browserify', ['browserify:dist', 'browserify:site'])
};
