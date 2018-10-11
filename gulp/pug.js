'use strict';

var fs = require('fs');
var path = require('path');
var foldero = require('foldero');
var yaml = require('js-yaml');
var pkg = require('../package.json');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var dest = path.join(taskTarget);
  var dataPath = path.join(dirs.source, dirs.data);

  // Pug template compile
  gulp.task('pug', function() {
    var siteData = {};
    if (fs.existsSync(dataPath)) {
      // Convert directory to JS Object
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.+\.(json|ya?ml)$',
        loader: function loadAsString(file) {
          var json = {};
          try {
            if (path.extname(file).match(/^.ya?ml$/)) {
              json = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
            }
            else {
              json = JSON.parse(fs.readFileSync(file, 'utf8'));
            }
          }
          catch(e) {
            console.log('Error Parsing JSON file: ' + file);
            console.log('==== Details Below ====');
            console.log(e);
          }
          return json;
        }
      });
    }

    // Add --debug option to your gulp task to view
    // what data is being loaded into your templates
    if (args.debug) {
      console.log('==== DEBUG: site.data being injected to templates ====');
      console.log(siteData);
      console.log('\n==== DEBUG: package.json config being injected to templates ====');
      console.log(config);
    }

    function pugRequire (providedPath) {
      // Test to see if the path starts with a dot
      if (/^\./.test(providedPath)) {
        throw new Error([
          'Relative paths in `require()` statements are not supported.',
          'Use an absolute path from the root folder instead.',
          'require("/from/root/to/file.js")',
          ''
        ].join('\n'));
      }
      // Test to see if the path starts with a slash
      var isLocal = /^\//.test(providedPath);
      // Make new path relative from root folder.
      var newPath = isLocal ? '..'+ providedPath : providedPath;
      return require(newPath);
    }

    return gulp.src([
      path.join(dirs.source, '**/*.pug'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
    ])
    .pipe(plugins.changed(dest))
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true,
      locals: {
        require: pugRequire,
        config: config,
        pkg: pkg,
        debug: true,
        site: {
          data: siteData
        }
      }
    }))
    .pipe(plugins.htmlmin({
      collapseBooleanAttributes: true,
      conservativeCollapse: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true
    }))
    .pipe(gulp.dest(dest))
    .on('end', browserSync.reload);
  });
};
