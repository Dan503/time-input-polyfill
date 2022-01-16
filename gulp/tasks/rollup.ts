'use strict'

import gulp from 'gulp'
import { TaskCallback } from 'undertaker'
import {
	plugins,
	args,
	taskTarget,
	browserSync,
	dirs,
	entries,
	join,
} from '../utils'
import { ModuleFormat } from 'rollup'
import rollup from '@rollup/stream'
import babel from '@rollup/plugin-babel'

import pkg from '../../package.json'
import glob from 'glob'
import vsource from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gulpif from 'gulp-if'
import gulpRename from 'gulp-rename'

import fileHeader from '../../core/static-values/header'

let cache: { [key: string]: any } = {}

interface RollupParams {
	entryFile: string
	done: TaskCallback,
	dest: string,
	outputFileName?: string
	header?: string
	format?: ModuleFormat
}

const rollupJS = ({
	entryFile,
	done,
	dest,
	outputFileName = 'main.js',
	header = '',
	// Intended for use with browsers by default
	format = 'iife',
}: RollupParams) => {
	const startTime = new Date().getTime()
	return (
		rollup({
			input: entryFile,
			// sourcemap: !args.production,
			cache: cache[entryFile],
			plugins: [babel()],
			output: {
				sourcemap: !args.production,
				format,
				name: 'TimePolyfill_bundle',
			}
		})
			.on('bundle', function (bundle) {
				// update cache data after every bundle is created
				cache[entryFile] = bundle
			})
			// create the initial output file
			.pipe(vsource(outputFileName))
			// we need to buffer the output, since many gulp plugins don't support streams.
			.pipe(buffer())
			.pipe(plugins.sourcemaps.init({ loadMaps: true }))
			// minify code if production mode
			.pipe(gulpif(args.production, plugins.terser()))
			.pipe(
				gulpRename(function (filepath) {
					// Remove 'source' directory as well as prefixed folder underscores
					// Ex: 'src/_scripts' --> '/scripts'
					filepath.dirname = filepath.dirname.replace(
						dirs.source + '/',
						''
					)
				})
			)
			.pipe(plugins.header(header))
			.pipe(plugins.sourcemaps.write('.'))
			// and output to ./dist/app.js as normal.
			.pipe(gulp.dest(dest.replace(/^_|(\/)_/g, '$1')))
			.on('end', function () {
				var time = (new Date().getTime() - startTime) / 1000
				console.log(
					plugins.util.colors.cyan(entryFile) +
					' was compiled: ' +
					plugins.util.colors.magenta(time + 's')
				)
				gulp.series('copy:dist')(done)
				return browserSync.reload('*.js')
			})
	)
}

interface Rollup_multiple_files_params {
	src: string,
	done: TaskCallback,
	dest: string,
	outputFileName?: string,
	header?: string,
	format?: ModuleFormat
}

const rollup_multiple_files = ({
	src,
	done,
	dest,
	outputFileName,
	header,
	format,
}: Rollup_multiple_files_params) => {
	return glob(src, function (err, files) {
		if (err) done(err)
		return Promise.all(
			files.map(function (entryFile) {
				return rollupJS({
					entryFile,
					done,
					dest,
					outputFileName,
					header,
					format,
				})
			})
		)
	})
}

interface Dist_compile_params {
	done: TaskCallback,
	src: string,
	type?: string,
	header?: string
}

function dist_compile({ done, src, type = '', header }: Dist_compile_params) {
	if (!args.production) return done()
	return rollup_multiple_files({
		src,
		done,
		dest: './dist',
		outputFileName: `time-input-polyfill${type}.min.js`,
		header,
	})
}

// Rollup JS library
gulp.task('rollup:dist:manual', function (done) {
	return dist_compile({ done, src: './index.js', header: fileHeader })
})

// Rollup JS library
gulp.task('rollup:dist:auto', function (done) {
	return dist_compile({
		done,
		src: './auto.js',
		type: '.auto',
		header: [
			'// == TIME INPUT POLYFILL AUTO LOADER ==\n',
			'// This is not the actual time input polyfill. ',
			'This file checks for input[type=time] support.\n',
			'// If not supported, it will load the real polyfill, then ',
			'apply it to all input[type=time] elements.\n',
			'\n',
			'// The actual polyfill is found here:\n',
			`// https://cdn.jsdelivr.net/npm/time-input-polyfill@${pkg.version}/dist/time-input-polyfill.min.js\n\n`,
		].join(''),
	})
})

gulp.task(
	'rollup:dist',
	gulp.parallel('rollup:dist:manual', 'rollup:dist:auto')
)

// Rollup demo site
gulp.task('rollup:site', function (done) {
	return rollup_multiple_files({
		src: './' + join(dirs.source, dirs.scripts, entries.js),
		dest: join('.', taskTarget, dirs.scripts),
		done,
	})
})

const supports_time_CJS = (done: TaskCallback) =>
	rollup_multiple_files({
		src: './core/helpers/supportsTime.js',
		dest: '.',
		done,
		format: 'cjs',
		outputFileName: 'supportsTime.js',
	})

const supports_time_MJS = (done: TaskCallback) =>
	rollup_multiple_files({
		src: './core/helpers/supportsTime.js',
		dest: '.',
		done,
		format: 'es',
		outputFileName: 'supportsTime.mjs',
	})

export const npm_rollup_index_CJS = (done: TaskCallback) =>
	rollup_multiple_files({
		src: './index.mjs',
		dest: '.',
		done,
		format: 'cjs',
		outputFileName: 'index.cjs.js',
	})

export const npm_rollup_auto_CJS = (done: TaskCallback) =>
	rollup_multiple_files({
		src: './auto.mjs',
		dest: '.',
		done,
		format: 'cjs',
		outputFileName: 'auto.js',
	})

export const npm_rollup_supportsTime = gulp.parallel(
	supports_time_MJS,
	supports_time_CJS
)

gulp.task('rollup', gulp.parallel('rollup:dist', 'rollup:site'))
