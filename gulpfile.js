import { src, dest, watch, parallel, series, lastRun, task } from "gulp";
import sourcemaps from "gulp-sourcemaps";
import concat from "gulp-concat";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
import include from "gulp-include";
import clean from "gulp-clean";
import image from "gulp-image";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import gulpSass from "gulp-sass";
import cache from "gulp-cache";
import a11y from "gulp-a11y";
const sass = gulpSass(dartSass);

const srcDir = "src/";
const buildDir = "build/";

function reset(cb) {
  return src(`./${buildDir}`, { allowEmpty: true, read: false }).pipe(clean());
}

function reload(cb) {
  browserSync.reload();
  cb();
}

export function bootstrap() {
  return (
    src(`${srcDir}scss/bootstrap.scss`)
      .pipe(
        sass().on("error", function (err) {
          console.log("ERROR", err);
        })
      )
      .pipe(cleanCSS())
      // .pipe(rename("bootstrap.min.css"))
      .pipe(dest(`${buildDir}css`))
      .pipe(browserSync.stream())
  );
}

function css() {
  return src(srcDir + "scss/**/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass().on("error", (err) => {
        console.log("ERROR", err);
      })
    )
    .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions", ">5%"] }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(rename("styles.min.css"))
    .pipe(dest(`${buildDir}css`))
    .pipe(browserSync.stream());
}

function html() {
  return src(`${srcDir}html/**/*.html`)
    .pipe(include())
    .on("error", (err) => {
      console.log("ERROR", err);
    })
    .pipe(dest(`./${buildDir}`));
}

function img() {
  return src(`${srcDir}img/**/*`, {
    encoding: false,
    since: lastRun(img),
  })
    .pipe(image())
    .pipe(dest(`${buildDir}/img`))
    .pipe(browserSync.stream());
}

function vendor(cb) {
  moveCSS(`${srcDir}css/font-awesome.BootstrapV5.bundle.css`); // Out of the box css
  // moveCSS(`${srcDir}css/bootstrap.css`); // Comment in to use out of the box css
  moveCSS(`${srcDir}css/theme.css`); // Out of the box css
  moveCSS(`${srcDir}css/portalbasictheme.css`); // Out of the box css
  moveCSS(`${srcDir}css/preform.BootstrapV5.bundle.css`); // Out of the box css
  moveCSS(`${srcDir}css/pwa-style.bundle.css`); // Out of the box css
  moveCSS(`${srcDir}css/pcf-style.bundle.css`); // Out of the box css

  cb();
}

function fonts(cb) {
  src(`${srcDir}fonts/**/*`).pipe(dest(`${buildDir}fonts`), {
    encoding: false,
  });
  cb();
}
function jsResources(cb) {
  return src(`${srcDir}js-resources/**/*.js`).pipe(dest(`${buildDir}js/`));
}

function js(cb) {
  return (
    src(`${srcDir}js/**/*.js`)
      .pipe(concat("main.js"))
      .pipe(include())
      .on("error", console.log)
      // .pipe(gulpif(env.p, uglify()))
      .pipe(dest(`${buildDir}js/`))
  );
}

function moveCSS(path) {
  return src(path).pipe(dest(`${buildDir}css`));
}

function a11yTest(cb) {
  return src(`${buildDir}**/*.html`).pipe(a11y()).pipe(a11y.reporter());
}

const build = series(
  cache.clearAll,
  reset,
  parallel(img, vendor, fonts, html, bootstrap, css, jsResources, js)
);

const watchFiles = (done) => {
  build();

  browserSync.init({
    watch: true,
    server: {
      baseDir: buildDir,
    },
  });
  watch(`${srcDir}html/**/*.html`, series(html, reload, a11yTest));
  watch(`${srcDir}scss/**/*.scss`, series(bootstrap, css));

  done();
};

export { watchFiles as watch };
export default build;
