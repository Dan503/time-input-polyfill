# Time-Input-Polyfill readme

Generated on 2018-10-06 using
[generator-yeogurt@1.5.2](https://github.com/larsonjj/generator-yeogurt)

## Description

This is an example readme file.
Describe your site/app here.

## Technologies used

JavaScript
- [Browserify](http://browserify.org/)
- [Node](https://nodejs.org/)

Styles
- [Sass](http://sass-lang.com/) via ([node-sass](https://github.com/sass/node-sass))

Markup
- [Jade](http://jade-lang.com/)

Optimization
- [Imagemin](https://github.com/imagemin/imagemin)
- [Uglify](https://github.com/mishoo/UglifyJS)

Server
- [BrowserSync](http://www.browsersync.io/)

Linting
- [ESlint](http://eslint.org/)

Automation
- [Gulp](http://gulpjs.com)

Code Management
- [Editorconfig](http://editorconfig.org/)
- [Git](https://git-scm.com/)


## Automated tasks

This project uses [Gulp](http://gulpjs.com) to run automated tasks for development and production builds.
The tasks are as follows:

`gulp --production`: Same as `gulp serve --production` also run `gulp test` and  not boot up production server

`gulp serve`: Compiles preprocessors and boots up development server
`gulp serve --open`: Same as `gulp serve` but will also open up site/app in your default browser
`gulp serve --production`: Same as `gulp serve` but will run all production tasks so you can view the site/app in it's final optimized form

`gulp test`: Lints all `*.js` file in the `source` folder using eslint

***Adding the `--debug` option to any gulp task displays extra debugging information (ex. data being loaded into your templates)***
