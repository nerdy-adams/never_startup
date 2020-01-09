// ------------------------------ //
// ------------------------------ //
// ----- CATUS GULP TASK -------- //
// ------------------------------ //
// ---------- (client, admin) --- //
// ------------------------------ //
// --------- 18.02.08 ----------- //
// -------------- version 0.1 --- //
// ------------------------------ //

// ---------------
//  import plugin 
// ---------------
import gulp       from 'gulp';            // Gulp
import gutil      from 'gulp-util';       // Gulp Log View Plugin
import babel      from 'gulp-babel';      // Babel
import html2pug   from 'gulp-html2pug';   // HTML to Pug 
import htmlmin    from 'gulp-htmlmin';    // HTML 
import pug        from 'gulp-pug';        // Pug to HTML
import sass       from 'gulp-sass';       // SASS
import cleanCSS   from 'gulp-clean-css';  // CSS
import imagemin   from 'gulp-imagemin';   // IMG Size Down
import uglify     from 'gulp-uglify';     // JS uglify
import nodemon    from 'gulp-nodemon';    // Nodemon - Server Start
import Cache      from 'gulp-file-cache'; // Sever Cache
import del        from 'del';             // Dist Del 

// ---------------------------
//  Call Constructor function
// ---------------------------
const cache = new Cache(); // Cache

// -----------------
//  CONSTANT Object
// -----------------
// SERVER
const SERVER = {
  APP : 'server/app.js',
  ROUTER : 'routes/**/*.js',
  LIBS : 'libs/**/*.js',
  CONTROLLERS : 'controllers/**/*.js',
  MODEL : 'model/**/*.js',
  MIDDLE : 'middleware/**/*.js'
}

// CONFIG 
const CONPIG = '.config/**/*/js'

// DIR obj
const DIR = {
  SRC : {
    PUBLIC : 'src/public',
    VIEWS : 'src/views'
  },
  DEST : {
    PUBLIC : 'dist/public',
    VIEWS : 'dist/views',
    SERVER : 'dist/'
  }
}

// SRC obj
const SRC = {
  ADMIN: {
    JS : `${DIR.SRC.PUBLIC}/admin/js/**/*.js`,
    SASS : `${DIR.SRC.PUBLIC}/admin/sass/**/*.scss`,
    IMG : `${DIR.SRC.PUBLIC}/admin/img/**`,
    FONT : `${DIR.SRC.PUBLIC}/admin/fonts/**`,
    PUG : `${DIR.SRC.VIEWS}/admin/**/*.pug`,
  },
  CLIENT: {
    JS : `${DIR.SRC.PUBLIC}/client/js/**/*.js`,
    SASS : `${DIR.SRC.PUBLIC}/client/sass/**/*.scss`,
    IMG : `${DIR.SRC.PUBLIC}/client/img/**`,
    FONT : `${DIR.SRC.PUBLIC}/client/fonts/**`,
    PUG : `${DIR.SRC.VIEWS}/client/**/*.pug`,
  }
}

// DEST obj
const DEST = {
  JS : `${DIR.DEST.PUBLIC}/js/`,
  CSS : `${DIR.DEST.PUBLIC}/css/`,
  IMG : `${DIR.DEST.PUBLIC}/img/`,
  FONT : `${DIR.DEST.PUBLIC}/fonts/`,
  PUG : {
    admin: `${DIR.DEST.VIEWS}/admin/`,
    client: `${DIR.DEST.VIEWS}/client/`,
  },
  SERVER : `${DIR.DEST.SERVER}`
}

// -----------------------
// Objesct To Array method
// -----------------------
const objectToArray = (obj) => {
  let arr = [];
  for(let key in obj) arr.push(obj[key]);
  return arr;
}

// ----------------
// ADAMIN Gulp Task 
// ----------------
const adminTaskNames = {
  js : 'admin_JS',
  sass : 'admin_SASS',
  img : 'admin_IMG',
  font : 'admin_FONT',
  pug : 'admin_PUG'
}

gulp.task(adminTaskNames.js, () => {
  return gulp.src(SRC.ADMIN.JS)
        .pipe(uglify())
        .pipe(gulp.dest(DEST.JS));
})
gulp.task(adminTaskNames.sass, () => {
  return gulp.src(SRC.ADMIN.SASS)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(DEST.CSS));
})
gulp.task(adminTaskNames.img, () => {
  return gulp.src(SRC.ADMIN.IMG)
        .pipe(imagemin())
        .pipe(gulp.dest(DEST.IMG))
})
gulp.task(adminTaskNames.font, () => {
  return gulp.src(SRC.ADMIN.FONT)
        .pipe(gulp.dest(DEST.FONT));
})
gulp.task(adminTaskNames.pug, () => {
  return gulp.src(SRC.ADMIN.PUG)
        .pipe(gulp.dest(DEST.PUG.admin));
})
gulp.task( 'admin' , objectToArray(adminTaskNames) )

// ----------------
// CLINET Gulp Task 
// ----------------
const clientTaskNames = {
  js : 'client_JS',
  sass : 'client_SASS',
  img : 'client_IMG',
  font : 'client_FONT',
  pug : 'client_PUG'
}
gulp.task( clientTaskNames.js, () => {
  return gulp.src(SRC.CLIENT.JS)
        .pipe(uglify())
        .pipe(gulp.dest(DEST.JS));
})
gulp.task( clientTaskNames.sass, () => {
  return gulp.src(SRC.CLIENT.SASS)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(DEST.CSS));
})
gulp.task( clientTaskNames.img, () => {
  return gulp.src(SRC.CLIENT.IMG)
        .pipe(imagemin())
        .pipe(gulp.dest(DEST.IMG))
})
gulp.task( clientTaskNames.font, () => {
  return gulp.src(SRC.CLIENT.FONT)
        .pipe(gulp.dest(DEST.FONT));
})
gulp.task( clientTaskNames.pug, () => {
  return gulp.src(SRC.CLIENT.PUG)
        .pipe(gulp.dest(DEST.PUG.client));
})
gulp.task( 'client' , objectToArray(clientTaskNames) )

// ----------------
// SERVER Gulp Task 
// ----------------
gulp.task('server', () => {
  return gulp.src(SERVER.APP)
        .pipe(cache.filter())
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(cache.cache())
        .pipe(uglify())
        .pipe(gulp.dest(DEST.SERVER));
})
// ----------------
// ROUTER Gulp Task 
// ----------------

// ----------------
// START Gulp Task 
// ----------------
gulp.task('start', () => {
  return nodemon({
    script: DEST.SERVER + 'app.js',
    watch: [
      DEST.SERVER, CONPIG, 
      SERVER.ROUTER, SERVER.LIBS,
      SERVER.CONTROLLERS , SERVER.MODEL ,
      SERVER.MIDDLE
    ]
  })
})
// ---------------------
// DIST Delate Gulp Task 
// ---------------------
gulp.task('clean', () => {
  return del.sync(`${DIR.DEST}`);
})

// -----------------
//  WATCH Gulp Task 
// -----------------
gulp.task('watch',['clean'], () => {
  let watcher = {
    // server watch
    server: gulp.watch(SERVER.APP,['server']),
    // admin watch
    ad_js: gulp.watch(SRC.ADMIN.JS, [adminTaskNames.js] ),
    ad_sass: gulp.watch(SRC.ADMIN.SASS, [adminTaskNames.sass] ),
    ad_img: gulp.watch(SRC.ADMIN.IMG, [adminTaskNames.img] ),
    ad_font: gulp.watch(SRC.ADMIN.FONT, [adminTaskNames.font] ),
    ad_pug: gulp.watch(SRC.ADMIN.PUG, [adminTaskNames.pug] ),
    // client watch
    cl_js: gulp.watch(SRC.CLIENT.JS, [clientTaskNames.js] ),
    cl_sass: gulp.watch(SRC.CLIENT.SASS, [clientTaskNames.sass] ),
    cl_img: gulp.watch(SRC.CLIENT.IMG, [clientTaskNames.img] ),
    cl_font: gulp.watch(SRC.CLIENT.FONT, [clientTaskNames.font] ),
    cl_pug: gulp.watch(SRC.CLIENT.PUG, [clientTaskNames.pug] ),
  }
  let notify = (event) => {
    gutil.log(`File ${gutil.colors.yellow(event.path)} was ${gutil.colors.red(event.type)}`) 
  }
  for(let key in watcher) watcher[key].on('change', notify);
})

// -------------------
//  DEFAULT Gulp Task 
// -------------------
//  start gulp -------
//  Terminal: gulp ---
// -------------------
gulp.task("default", ['admin', 'client','server','watch','start'], () => {
  gutil.log("running ls gulp");
})
