'use strict'

import fs from 'fs'
import path from 'path'
import foldero from 'foldero'
import pug from 'pug'
import yaml from 'js-yaml'
import gulp from 'gulp'
import { plugins, args, config, taskTarget, browserSync, join } from '../utils'
import pkg from '../../package.json'
import autoImports from 'gulp-auto-imports'

let dirs = config.directories
let dest = join(taskTarget)
let dataPath = join(dirs.source, dirs.data)

const pug_auto_imports = () => {
	const dest = 'src/_layouts'
	return gulp
		.src('src/_modules/**/*.pug')
		.pipe(autoImports({ preset: 'pug', dest }))
		.pipe(gulp.dest(dest))
}

const compile_pug = () => {
	let siteData = {}
	if (fs.existsSync(dataPath)) {
		// Convert directory to JS Object
		siteData = foldero(dataPath, {
			recurse: true,
			whitelist: '(.*/)*.+.(json|ya?ml)$',
			loader: function loadAsString(file) {
				let json = {}
				try {
					if (path.extname(file).match(/^.ya?ml$/)) {
						json = yaml.safeLoad(fs.readFileSync(file, 'utf8'))
					} else {
						json = JSON.parse(fs.readFileSync(file, 'utf8'))
					}
				} catch (e) {
					plugins.util.log(`Error Parsing DATA file: ${file}`)
					plugins.util.log('==== Details Below ====')
					plugins.util.log(e)
				}
				return json
			},
		})
	}

	// Add --debug option to your gulp task to view
	// what data is being loaded into your templates
	if (args.debug) {
		plugins.util.log(
			'==== DEBUG: site.data being injected to templates ===='
		)
		plugins.util.log(siteData)
		plugins.util.log(
			'\n==== DEBUG: package.json config being injected to templates ===='
		)
		plugins.util.log(config)
	}

	return (
		gulp
			// Ignore underscore prefix folders/files (ex. _custom-layout.pug)
			.src(['**/*.pug', '!{**/_*,**/_*/**}'], { cwd: dirs.source })
			.pipe(plugins.changed(dest))
			.pipe(
				plugins.pug({
					pug: pug,
					pretty: true,
					locals: {
						config: config,
						debug: true,
						pkg,
						args,
						site: {
							data: siteData,
						},
					},
				})
			)
			.pipe(
				plugins.htmlmin({
					collapseBooleanAttributes: true,
					conservativeCollapse: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
				})
			)
			.pipe(gulp.dest(dest))
			.on('end', browserSync.reload)
	)
}

// Pug template compile
gulp.task('pug', gulp.series(pug_auto_imports, compile_pug))
