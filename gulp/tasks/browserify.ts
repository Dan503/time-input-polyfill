'use strict'

import { TaskCallback } from 'undertaker'
import gulp from 'gulp'

import path from 'path'
import glob from 'glob'
import browserify from 'browserify'
import watchify from 'watchify'
import envify from 'envify'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import tsify from 'tsify'
import vsource from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gulpif from 'gulp-if'
import chalk from 'chalk'
import sourcemaps from 'gulp-sourcemaps'

import { args, jsWatch, browserSync, dirs, entries, join, taskTarget } from '../utils'

let browserifyTask = (done: TaskCallback, files: Array<string>) => {
	files.map((entry) => {
		let dest = join(taskTarget, dirs.scripts)

		// Options
		let customOpts = {
			debug: true,
			transform: [
				babelify, // Enable ES6 features
				envify, // Sets NODE_ENV for better optimization of npm packages
			],
		}

		const createBundler = (options: any) => browserify(options).add(entry).plugin(tsify)

		let bundler = createBundler(customOpts)

		if (jsWatch.isEnabled) {
			// need to call done early or the task never ends
			done()

			// Setup Watchify for faster builds
			bundler = watchify(createBundler({ ...watchify.args, ...customOpts }))
		}

		let rebundle = function () {
			let startTime = new Date().getTime()
			return bundler
				.transform("babelify", { global: true, plugins: ['@babel/plugin-transform-modules-commonjs'] })
				.bundle()
				.on('error', function (err: Error) {
					console.log('Browserify compile error:');
					console.error(err.message);
				})
				.pipe(vsource(entry))
				.pipe(buffer())
				.pipe(sourcemaps.init({ loadMaps: true }))
				.pipe(gulpif(args.production, uglify()))
				// .pipe(
				// 	rename(function (filepath) {
				// 		// Remove 'source' directory as well as prefixed folder underscores
				// 		// Ex: 'src/_scripts' --> '/scripts'
				// 		filepath.dirname = filepath.dirname
				// 			.replace(dirs.source, '')
				// 			.replace('_', '')
				// 	})
				// )
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(dest))
				// Show which file was bundled and how long it took
				.on('end', function () {
					let time = (new Date().getTime() - startTime) / 1000
					console.log(
						chalk.cyan(entry) +
						' was browserified: ' +
						chalk.magenta(time + 's')
					)
					browserSync.reload('*.js')

					// es5_test()

					done()
				})
		}

		if (!args.production) {
			bundler.on('update', rebundle) // on any dep update, runs the bundler
			bundler.on('log', console.log) // output build logs to terminal
		}
		rebundle()
	})
}

// Browserify Task
gulp.task('browserify', (done) => {
	glob(
		'./' +
		[
			dirs.source,
			dirs.scripts,
			`{${entries.js},run_tests.js,polyfills.js}`,
		].join('/'),
		function (err, files) {
			// if (err) {
			// 	done(err)
			// }

			browserifyTask(done, files)
		}
	)
})
