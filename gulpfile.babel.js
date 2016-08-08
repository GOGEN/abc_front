const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const rename     = require('gulp-rename');
const gutil      = require('gulp-util');

const stylus     = require('gulp-stylus');
const stylint    = require('gulp-stylint');
const nib        = require('nib');
const rupture    = require('rupture');
const jeet       = require('jeet');

const ghPages    = require('gulp-gh-pages');

const njRender    = require('gulp-nunjucks-render');
const nj       = njRender.nunjucks;

const jshint = require('gulp-jshint');
const inject = require('gulp-inject');
const filter = require('gulp-filter');
const mainBowerFiles = require('main-bower-files');

const browserSync   = require('browser-sync');
const reload        = browserSync.reload;

gulp.task('scripts:vendor', () => {
  const jsFilter = filter('**/*.js');
  return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['scripts-linter'], () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts-linter', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', () => {
  return gulp.src('src/styles/index.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
        use: [nib(), jeet(), rupture()],
        compress: true,
        'include css': true
    }))
    .on('error', (err) => {
        gutil.log(gutil.colors.red('Stylus'), err.toString());
        this.emit('end');
      })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('styles-linter', () => {
  return gulp.src('src/styles/**/*.styl')
    .pipe(stylint({config: 'stylintrc.json'}))
    .pipe(stylint.reporter());
})

gulp.task('markup', ['scripts', 'scripts:vendor'], () => {
  nj.configure(['src/templates'], {watch: false});
  const sources = gulp.src(['./dist/vendor.min.js', './dist/main.min.js'], {read: false});
  return gulp.src('src/pages/**/*.+(html|nj|nunjucks)')
    .pipe(njRender())
    .pipe(inject(sources, {
      ignorePath: ['/dist'],
      addRootSlash: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*.+(gif|jpg|png|svg)')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*.otf')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.+(html|nj|nunjucks)', ['markup', reload]);
  gulp.watch(['src/pages/**/*.+(html|nj|nunjucks)'], ['markup', reload]);
  gulp.watch('src/styles/**/*.styl', ['styles', reload]);
  gulp.watch('src/scripts/**/*.js', ['scripts', reload]);
  gulp.watch(['src/images/**/*.+(gif|jpg|png|svg)'], ['images', reload]);
  gulp.watch("*.html", reload);
});

gulp.task('sync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('deploy', ['default'], () => {
  return gulp.src('dist/**/*')
    .pipe(ghPages({
      remoteUrl: 'https://github.com/GOGEN/abc_front.git'
    }));
});

gulp.task('serve', ['markup', 'styles', 'images', 'fonts', 'sync', 'watch']);

gulp.task('default', ['markup', 'styles', 'images', 'fonts']);
