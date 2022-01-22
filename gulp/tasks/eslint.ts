/*eslint no-process-exit:0 */

'use strict'

import gulpif from 'gulp-if'
import gulp from 'gulp'
import { plugins, config, browserSync } from '../utils'

let dirs = config.directories

// ESLint
gulp.task('eslint', () => {
	return gulp
		.src(
			[
				'../gulpfile.babel',
				'**/*',
				// Ignore all vendor folder files
				'!**/vendor/**/*',
			],
			{ cwd: dirs.source }
		)
		.pipe(browserSync.reload({ stream: true }))
		.pipe(
			plugins.eslint({
				useEslintrc: true,
			})
		)
		.pipe(plugins.eslint.format())
		.pipe(gulpif(!browserSync.active, plugins.eslint.failAfterError()))
		.on('error', function () {
			if (!browserSync.active) {
				process.exit(1)
			}
		})
})
