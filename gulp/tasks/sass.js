import gulp from 'gulp'
import autoprefixer from 'autoprefixer'
import gulpif from 'gulp-if'
import autoImports from 'gulp-auto-imports'
import { plugins, args, config, taskTarget, browserSync, join } from '../utils'

let dirs = config.directories
let entries = config.entries
let dest = join(taskTarget, dirs.styles.replace(/^_/, ''))

const sass_auto_imports = () => {
	const dest = 'src/_styles'
	return (
		gulp
			.src('src/_modules/**/*.scss')
			// Using the "scss" preset ("dest" must be provided here as well)
			.pipe(autoImports({ preset: 'scss', dest }))
			.pipe(gulp.dest(dest))
	)
}

const sass_compile = () => {
	return gulp
		.src(entries.css, { cwd: join(dirs.source, dirs.styles) })
		.pipe(
			gulpif(
				!args.production,
				plugins.sourcemaps.init({ loadMaps: true })
			)
		)
		.pipe(
			plugins.sass({
				outputStyle: 'expanded',
				precision: 10,
				includePaths: [
					join(dirs.source, dirs.styles),
					join(dirs.source, dirs.modules),
				],
			})
		)
		.on('error', function (err) {
			plugins.util.log(err)
		})
		.pipe(plugins.postcss([autoprefixer({ grid: 'autoplace' })]))
		.pipe(
			plugins.rename(function (path) {
				// Remove 'source' directory as well as prefixed folder underscores
				// Ex: 'src/_styles' --> '/styles'
				path.dirname = path.dirname
					.replace(dirs.source, '')
					.replace('_', '')
			})
		)
		.pipe(gulpif(args.production, plugins.cssnano({ rebase: false })))
		.pipe(gulpif(!args.production, plugins.sourcemaps.write('./')))
		.pipe(gulp.dest(dest))
		.pipe(browserSync.stream({ match: '**/*.css' }))
}

// Sass compilation
gulp.task('sass', gulp.series(sass_auto_imports, sass_compile))
