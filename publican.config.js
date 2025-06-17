// Publican configuration
import { Publican, tacs } from 'publican';
import { staticsearch } from 'staticsearch';

import * as fnNav from './lib/nav.js';
import * as fnFormat from './lib/format.js';
import * as fnHooks from './lib/hooks.js';
import esbuild from 'esbuild';

const
  publican = new Publican(),
  isDev = (process.env.NODE_ENV === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// Publican defaults
publican.config.dir.content = process.env.CONTENT_DIR;
publican.config.dir.template = process.env.TEMPLATE_DIR;
publican.config.dir.build = process.env.BUILD_DIR;
publican.config.root = process.env.BUILD_ROOT;

// default HTML templates
publican.config.defaultHTMLTemplate = process.env.TEMPLATE_DEFAULT;
publican.config.dirPages.template = process.env.TEMPLATE_LIST;
publican.config.tagPages.template = process.env.TEMPLATE_TAG;

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

// determine post date from filename
publican.config.processContent.add( fnHooks.processFileDate );

// processContent hook: custom {{ filename }} code tabs
publican.config.processContent.add( fnHooks.contentFilename );

// processContent hook: replace ::: tags
publican.config.processContent.add( fnHooks.htmlBlocks );

// processRenderStart hook: change title, descriptions, etc.
publican.config.processRenderStart.add( fnHooks.renderstartData );

// processRenderStart hook: create tacs.tagScore Map
publican.config.processRenderStart.add( fnHooks.renderstartTagScore );

// processPreRender hook: determine related posts
publican.config.processPreRender.add( fnHooks.prerenderRelated );

// processPostRender hook: add <meta> tags
publican.config.processPostRender.add( fnHooks.postrenderMeta );

// jsTACs rendering defaults
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.language = process.env.SITE_LANGUAGE;
tacs.config.domain = isDev ? `http://localhost:${ process.env.SERVE_PORT || '8000' }` : process.env.SITE_DOMAIN;
tacs.config.title = process.env.SITE_TITLE;
tacs.config.description = process.env.SITE_DESCRIPTION;
tacs.config.author = process.env.SITE_AUTHOR;
tacs.config.wordCountShow = parseInt(process.env.SITE_WORDCOUNTSHOW) || 0;
tacs.config.themeColor = process.env.SITE_THEMECOLOR || '#000';
tacs.config.donate = process.env.SITE_DONATE;
tacs.config.buildDate = new Date();

// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.nav = fnNav;
tacs.fn.format = fnFormat;

// replacement strings
publican.config.replace = new Map([
  [ '--ROOT--', publican.config.root ],
  [ '--COPYRIGHT--', `&copy;<time datetime="${ tacs.fn.format.dateYear() }">${ tacs.fn.format.dateYear() }</time>` ],
  [ ' style="text-align:right"', ' class="right"' ],
  [ ' style="text-align:center"', ' class="center"' ]
]);

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
staticsearch.stopWords = '';
await staticsearch.index();


// ___________________________________________________________
// esbuild configuration for CSS, JavaScript, and local server

const
  target = (process.env.BROWSER_TARGET || '').split(','),
  logLevel = isDev ? 'info' : 'error',
  minify = !isDev,
  sourcemap = isDev && 'linked';

// bundle CSS
const buildCSS = await esbuild.context({

  entryPoints: [ process.env.CSS_DIR ],
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
  outdir: `${ process.env.BUILD_DIR }css/`

});

// bundle JS
const buildJS = await esbuild.context({

  entryPoints: [ process.env.JS_DIR ],
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
  outdir: `${ process.env.BUILD_DIR }js/`

});

if (publican.config.watch) {

  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  const { livelocalhost } = await import('livelocalhost');

  livelocalhost.servedir = publican.config.dir.build;
  livelocalhost.serveport = parseInt(process.env.SERVE_PORT) || 8000;
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
