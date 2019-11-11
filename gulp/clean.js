'use strict'

var del = require('del')

module.exports = function(
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync,
) {
  // Clean
  gulp.task('clean', del.bind(null, [taskTarget]))
}
