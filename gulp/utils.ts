'use strict'

import gulpLoadPlugins from 'gulp-load-plugins'
import browserSyncLib from 'browser-sync'
import pjson from '../package.json'
import minimist from 'minimist'

type GulpPluginNames =
	| 'autoImports'
	| 'changed'
	| 'cssnano'
	| 'data'
	| 'eslint'
	| 'filter'
	| 'header'
	| 'htmlmin'
	| 'if'
	| 'imagemin'
	| 'loadPlugins'
	| 'plumber'
	| 'postcss'
	| 'pug'
	| 'rename'
	| 'rev'
	| 'revDeleteOriginal'
	| 'revRewrite'
	| 'sass'
	| 'sourcemaps'
	| 'terser'
	| 'uglify'
	| 'util'

type GulpPlugins = Record<GulpPluginNames, any>

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
export const plugins = gulpLoadPlugins<GulpPlugins>()

// Get package.json custom configuration
export const config = Object.assign({}, pjson.config)

// Gather arguments passed to gulp commands
export const args = minimist(process.argv.slice(2))

// Alias config directories
export const dirs = config.directories

// Alias config entries
export const entries = config.entries

// Determine gulp task target destinations
export const taskTarget = args.production ? dirs.destination : dirs.temporary

// Create a new browserSync instance
export const browserSync = browserSyncLib.create()

export const join = (...paths: Array<string>) => paths.join('/')

export const jsWatch = {
	isEnabled: true,
}
