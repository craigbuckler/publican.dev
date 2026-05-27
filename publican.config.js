// Publican configuration
import { Publican, tacs } from 'publican';
import { libInit, env } from 'publican.lib';
import { staticsearch } from 'staticsearch';

import { articleLink } from './lib/nav.js';
import esbuild from 'esbuild';

const
  publican = new Publican(),
  isDev = (env('NODE_ENV') === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// Publican defaults
publican.config.dir.content = env('CONTENT_DIR');
publican.config.dir.template = env('TEMPLATE_DIR');
publican.config.dir.build = env('BUILD_DIR');
publican.config.root = env('BUILD_ROOT');

// default HTML templates
publican.config.defaultHTMLTemplate = env('TEMPLATE_DEFAULT');
publican.config.dirPages.template = env('TEMPLATE_LIST');
publican.config.tagPages.template = env('TEMPLATE_TAG');

// slug replacement strings - remove YYYY-MM-DD
publican.config.slugReplace.set(/\d{4}-\d{2}-\d{2}_/g, '');

// slug replacement strings - removes NN_ from slug
publican.config.slugReplace.set(/\d+_/g, '');

// default syntax language
publican.config.markdownOptions.prism.defaultLanguage = 'bash';

// sorting and pagination
publican.config.dirPages.size = 12;
publican.config.dirPages.sortBy = 'filename';
publican.config.dirPages.sortOrder = 1;
publican.config.dirPages.dir.news = {
  sortBy: 'date',
  sortOrder: -1
};
publican.config.tagPages.size = 12;

// pass-through files
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });
publican.config.passThrough.add({ from: './src/media/images', to: './images/' });
publican.config.passThrough.add({ from: './src/media/videos', to: './videos/' });

// jsTACs rendering defaults
const port = env('SERVE_PORT', 8000);
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.language = env('SITE_LANGUAGE');
tacs.config.domain = isDev ? `http://localhost:${ port }` : env('SITE_DOMAIN');
tacs.config.title = env('SITE_TITLE');
tacs.config.description = env('SITE_DESCRIPTION');
tacs.config.author = env('SITE_AUTHOR');
tacs.config.authorUrl = env('SITE_AUTHORURL');
tacs.config.wordCountShow = parseInt(env('SITE_WORDCOUNTSHOW', 0));
tacs.config.themeColor = env('SITE_THEMECOLOR', '#000');
tacs.config.buildDate = new Date();

// initialize library
libInit(publican, tacs);
tacs.lib.format.setLocale( tacs.config.language );

// define custom functions
tacs.fn = tacs.fn || {};
tacs.fn.articleLink = articleLink;

// utils
publican.config.minify.enabled = !isDev;  // minify in production mode
publican.config.watch = isDev;            // watch in development mode
publican.config.logLevel = 2;             // output verbosity

// clear build directory
await publican.clean();

// build site
await publican.build();

// run search indexer
staticsearch.buildDir = publican.config.dir.build;
staticsearch.searchdir = publican.config.dir.build + 'search/';
staticsearch.domain = tacs.config.domain;
staticsearch.pageDOMSelectors = 'main';
staticsearch.pageDOMExclude = 'header,nav,nav-heading,menu,footer';
staticsearch.stopWordsDefault = false;
await staticsearch.index();


// ___________________________________________________________
// esbuild configuration for CSS, JavaScript, and local server

const
  target = env('BROWSER_TARGET', '').split(','),
  logLevel = isDev ? 'info' : 'error',
  minify = !isDev,
  sourcemap = isDev && 'linked';

// bundle CSS
const buildCSS = await esbuild.context({

  entryPoints: [ env('CSS_DIR') ],
  bundle: true,
  target,
  external: ['/images/*'],
  loader: {
    '.woff2': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'dataurl'
  },
  logLevel,
  minify,
  sourcemap,
  outdir: `${ publican.config.dir.build }css/`

});

// bundle JS
const buildJS = await esbuild.context({

  entryPoints: [ env('JS_DIR') ],
  format: 'esm',
  bundle: true,
  target,
  external: [],
  define: {
    __ISDEV__: JSON.stringify(isDev)
  },
  drop: isDev ? [] : ['debugger', 'console'],
  logLevel,
  minify,
  sourcemap,
  outdir: `${ publican.config.dir.build }js/`

});

if (publican.config.watch) {

  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  const { livelocalhost } = await import('livelocalhost');

  livelocalhost.servedir = publican.config.dir.build;
  livelocalhost.serveport = port;
  livelocalhost.accessLog = false;
  livelocalhost.start();

}
else {

  // single build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();

}
