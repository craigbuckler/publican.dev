---
title: Publican configuration options
menu: Publican configuration
description: A list of Publican's configuration file options.
date: 2025-01-23
modified: 2025-04-10
priority: 0.9
tags: configure, root path, string replacement, headings
---

The following options can be set your `publican.config.js` [configuration file](--ROOT--docs/setup/configuration/) to control how the static site is generated. The examples below presume you have defined a Publican object named `publican` at the top of the file:

{{ `publican.config.js` excerpt }}
```js
const publican = new Publican();
```


## Directories

The default Publican directories are:

* `./src/content/` for content files
* `./src/template/` for template files
* `./build/` for the built site

You can change these as required:

{{ `publican.config.js` excerpt }}
```js
// change directories
publican.config.dir.content = './content/';
publican.config.dir.template = './templates/';
publican.config.dir.build = './mysite/';
```

Avoid setting the `content` directory as a sub-directory of `template` or vice versa since it could affect [watch mode](#watch-mode).


## Ignored content files

`config.ignoreContentFile` can be set to regular expression so Publican ignores files with specific names. The default (`/^_.*$/`{language=js}) omits any content file where the file name starts with an underscore `_`. You can remove this restriction:

{{ `publican.config.js` excerpt }}
```js
// do not ignore any file
publican.config.ignoreContentFile = null;
```

or add your own, e.g.

{{ `publican.config.js` excerpt }}
```js
// ignore files starting with a .
publican.config.ignoreContentFile = `/^\..*$/`;
```


## Slug string replacement

You can define any number of slug search and replace values in the `publican.config.slugReplace` [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map). Search values can be strings or regular expressions.

The following example removes two or more digits followed by an underscore and changes `.html` extensions to `.htm`:

{{ `publican.config.js` excerpt }}
```js
// slug replacement - removes NN_
publican.config.slugReplace.set(/\d{2,}_/g, '');

// slug replacement - rename .html to .htm
publican.config.slugReplace.set('.html', '.htm');
```


## Front matter delimiter

By default, Publican identifies front matter between `---` delimiters, but you can change it to any other value, e.g.

{{ `publican.config.js` excerpt }}
```js
// locate front matter using this delimiter
publican.config.frontmatterDelimit = '~~~';
```


## Index page filename

By default, Publican uses content slugs ending in `index.html` to create friendlier [directory-based URLs](--ROOT--docs/setup/content/#directory-structure). Therefore, content at `blog/index.md` is rendered to the slug `blog/index.html`.

::: aside

Most web servers return the contents of the file at `a/b/c/index.html` when they receive a request for a directory-like path at `somedomain.com/a/b/c/`.

::: /aside

You can change the index filename if necessary:

{{ `publican.config.js` excerpt }}
```js
// index filename
publican.config.indexFilename = 'default.htm';
```

This changes how slugs are created: content at `blog/index.md` is now rendered to `blog/index/default.htm`. You would need to rename the content file to `blog/default.md` to render it to `blog/default.htm`.

::: aside

You can set any file type, e.g. `index.php`. Unless an explicit [template is set in the front matter](--ROOT--docs/reference/front-matter/#template), index files are rendered inside the [default template](#default-template) since they are presumed to hold some sort of HTML content.

::: /aside


## Root server path

By default, Publican assumes the build directory is the root path of your website. The page rendered to `build/index.html` is therefore the home page of the site.

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/';
```

However, you may want to build files to a sub-directory of your site, e.g. `/blog/`. Each post's [`data.link`](--ROOT--docs/reference/content-properties/#datalink) would then be incorrect.

The site's root path can be set by changing the `config.root` value:

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/blog/';
```

Links to the root page would then become `/blog/` rather than `/`.

You could set this option for the live production site but retain `/` in development:

```js
const isDev = (process.env.NODE_ENV === 'development');
publican.config.root = isDev ? '/' : '/blog/';
```

All links, navigation, and pagination properties use the `root` as appropriate. If you want to link to a page in your content, you can use:

```html
<p><a href="${ tacs.root }post/article-one/">link to Article one</a></p>
```

The `${ tacs.root }`{language=js} value **cannot** be used in markdown because it confuses the parser:

```md
<!-- this will fail in markdown -->
[link to Article one](${ tacs.root }post/article-one/)
```

You can solve this using a [root link search and replace](--ROOT--docs/recipe/content/root-links/).


## Indexing frequency

An `index` value can be set in front matter to a value used by search engine sitemaps: `always`, `hourly`, `daily`, `weekly`, `monthly` (the default), `yearly`, and `never`. You can also set `false` to omit the page from sitemaps.

Set `publican.config.indexFrequency`{language=js} to a default value which applies to every HTML and [index page](#index-page-filename) where `index` is not explicitly set.


## Default template

The default HTML template is `default.html` in the [template directory](#directories). You can set `publican.config.defaultHTMLTemplate`{language=js} to any other filename.


## Markdown to HTML

Publican converts markdown to HTML using [markdown-it](https://www.npmjs.com/package/markdown-it) with the [markdown-it-prism](https://www.npmjs.com/package/markdown-it-prism) plugin to syntax-highlight code blocks.

By default, `publican.config.markdownOptions`{language=js} defines an object with the child objects:

* `core` for [markdown-it configuration](https://markdown-it.github.io/markdown-it/#MarkdownIt.new)
* `prism` for [markdown-it-prism options](https://www.npmjs.com/package/markdown-it-prism#options) including plugins. Set a falsy value to disable syntax highlighting
* a `use` [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) to enable [additional markdown-it plugins](#use-markdownit-plugins).

You can change the defaults from:

{{ `publican.config.js` excerpt }}
```js
 // markdown options
publican.config.markdownOptions = {
  core: {
    html: true,                 // permit HTML tags
    breaks: false,              // do not convert line breaks to <br>
    linkify: true,              // convert URLs to links
    typographer: true           // enable smart quotes
  },
  prism: {
    defaultLanguage: 'js',      // default syntax
    highlightInlineCode: true   // highlight inline code
  },
  use: new Set()
};
```


### Use markdown-it plugins

[Hundreds of plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin) are available for markdown-it. You can use these as well as -- *or instead of* -- [Publican event functions](--ROOT--docs/reference/event-functions/) to configure markdown to HTML conversion.

For example, the [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs) plugin allows you to add HTML attributes, e.g.

{{ markdown input }}
```md
# Heading {#my-heading .custom-style}
Some text. {style="color:red;"}
```

results in:

{{ HTML output }}
```html
<h1 id="my-heading" class="custom-style">Heading</h1>
<p style="color:red;">Some text.</p>
```

To use it, install the plugin in your project:

{{ terminal }}
```bash
npm install markdown-it-attrs
```

then `.add()` an array to the `publican.config.markdownOptions.use`{language=js} Set which defines the module and any required parameters:

{{ `publican.config.js` excerpt }}
```js
import markdownItAttrs from 'markdown-it-attrs';

// add markdown-it-attrs plugin
publican.config.markdownOptions.use.add(
  [ markdownItAttrs, { leftDelimiter: '{', rightDelimiter: '}' } ]
);
```

You can `.add()` any number of markdown-it plugins using similar code.


## Heading links

Content sub-headings (`<h2>`{language=html} to `<h6>`{language=html}) are automatically given `id` attributes so they are available as link targets and can be shown in an [in-page menu](#inpage-navigation). The `publican.config.headingAnchor`{language=js} object controls how headings are rendered. You can set it to `false` (or any falsy value) to disable heading links or define your own values. The defaults are:

{{ `publican.config.js` excerpt }}
```js
// omit link from heading
publican.config.headingAnchor.nolink = 'nolink';

// text in heading link
publican.config.headingAnchor.linkContent = '#';

// heading link class for CSS
publican.config.headingAnchor.linkClass = 'headlink';
```

**Example 1.** A basic heading such as:

```html
<h2>My heading</h2>
```

is transformed to *(carriage returns added for clarity)*:

```html
<h2 id="my-heading" tabindex="-1">
  My heading
  <a href="#my-heading" class="headlink">#</a>
</h2>
```

**Example 2.** Headings retain their IDs when transformed so:

```html
<h2 id="myh2">My heading</h2>
```

is transformed to:

```html
<h2 id="myh2" tabindex="-1">
  My heading
  <a href="#myh2" class="headlink">#</a>
</h2>
```

**Example 3.** Headings with `nolink` somewhere in the tag do not have a `#` link added. This is useful when a heading is inside a link:

```html
<h2 class="nolink">My heading</h2>
<!-- OR -->
<h2 data-nolink>My heading</h2>
```

is transformed to:

```html
<h2 id="my-heading" tabindex="-1" class="nolink">My heading</h2>
```


## In-page navigation

The code `<nav-heading></nav-heading>` can be placed in any content or template file. The page's nested [headings links](#heading-links) (`<h2>`{language=html} to `<h6>`{language=html}) are rendered into the block, e.g.

```html
<nav-heading>
  <nav class="contents">
    <ol>
      <li>
        <a href="#heading-2a" class="head-h2">Heading 2a</a>
        <ol>
          <li><a href="#heading-3a" class="head-h3">Heading 3a</a></li>
          <li><a href="#heading-3b" class="head-h3">Heading 3b</a></li>
        </ol>
      </li>
      <li><a href="#heading-2b" class="head-h2">Heading 2b</a><li>
    </ol>
  </nav>
</nav-heading>
```

Additional `publican.config.headingAnchor`{language=js} properties control the options:

{{ `publican.config.js` excerpt }}
```js
// omit heading from menu
publican.config.headingAnchor.nomenu = 'nomenu';

// the tag name: <nav-heading></nav-heading>
publican.config.headingAnchor.tag = 'nav-heading';

// the class assigned to the parent <nav>
publican.config.headingAnchor.navClass = 'contents';
```

Headings with `nomenu` somewhere in the tag are omitted from the menu. For example, the following headings:

```html
<h2 class="nomenu">Heading 1</h2>
<h2 class="nolink">Heading 2</h2>
<h2 data-nolink-nomenu>Heading 3</h2>
```

are transformed to:

```html
<h2 id="heading1" tabindex="-1" class="nomenu">Heading 1 <a href="#heading1" class="headlink">#</a></h2>
<h2 id="heading2" tabindex="-1" class="nolink">Heading 2</h2>
<h2 data-nolink-nomenu>Heading 3</h2>
```

and the `<nav-heading>`{language=html} block only shows **Heading 2**:

```html
<nav-heading>
  <nav class="contents">
    <ol>
      <li><a href="#heading2" class="head-h2">Heading 2</a><li>
    </ol>
  </nav>
</nav-heading>
```

::: aside

Ensure your heading hierarchy is correct. For example, following an `<h2>`{language=html}, you could have another `<h2>`{language=html} or an `<h3>`{language=html}, but not an `<h4>`{language=html}. Publican does not report hierarchy errors, but the menu may look unusual.

::: /aside


## String replacement

You can search and replace strings in the final built files using the `publican.config.replace` [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) in your `publican.config.js` configuration file. (Note that [pass-through files](--ROOT--docs/setup/pass-through-files/) are ignored.)

```js
publican.config.replace.set(<search>, <replace>);
```

where:

* `<search>` is a search string or regular expression
* `<replace>` is the replacement string

You can set as many search and replace options as you like, e.g.

{{ `publican.config.js` excerpt }}
```js
// replace YYYY-MM-DD dates with DD-MM-YYYY
publican.config.replace.set(
  /(\d{4})-(\d{2})-(\d{2})/g,
  '$3-$2-$1'
);

// replace −−COPYRIGHT−− with ©YYYY
publican.config.replace.set(
  '−−COPYRIGHT−−',
  `&copy;${ (new Date()).getUTCFullYear() }`
);
```

Refer to the [string replacement page](--ROOT--docs/setup/string-replacement/) for more examples and alternative options.


## Directory index pages

Publican presumes directories in the root `./src/content/` directory contains specific types of content and generates [paginated index pages](--ROOT--docs/setup/directory-indexes/). The `publican.config.dirPages`{language=js} controls how these are generated using the following defaults you can override:

{{ `publican.config.js` excerpt }}
```js
// directory index pages
publican.config.dirPages = {
  size: 24,                   // number of items per paginated page
  sortBy: 'priority',         // sort by priority order
  sortOrder: -1,              // from highest to lowest
  template: 'default.html',   // using this template
  index: 'monthly',           // index pages monthly
  dir: {}                     // with no exceptions
};
```

You could order directories (and menus) by filename (each starts with digits `NN_`) from lowest to highest and only show six items per paginated page:

{{ `publican.config.js` excerpt }}
```js
publican.config.dirPages.size = 6;
publican.config.dirPages.sortBy = 'filename';
publican.config.dirPages.sortOrder = 1;
```

However, you still want content in the `posts` directory is ordered chronologically with the most recent first, so an exception is specified:

{{ `publican.config.js` excerpt }}
```js
publican.config.dirPages.dir.post = {
  sortBy: 'date',
  sortOrder: -1
};
```

Pages inside directories have the following properties:

* [`data.postnext`](--ROOT--docs/reference/content-properties/#datapostnext) -- the `data` object of the next post
* [`data.postback`](--ROOT--docs/reference/content-properties/#datapostback) -- the `data` object of the previous post

Any template used by a directory index can access a [`data.pagination`](--ROOT--docs/reference/content-properties/#datapaginatation) object to generate lists of pages.

Setting `publican.config.dirPages`{language=js} to `false` (or any falsy value) disables directory index pages.


## Tag index pages

Content front matter can specify [tags](--ROOT--docs/reference/front-matter/#tags) to identify specific topics. Publican generates [paginated index pages for all tags](--ROOT--docs/setup/tag-indexes/). The `publican.config.tagPages`{language=js} controls how these are generated using the following defaults you can override:

{{ `publican.config.js` excerpt }}
```js
// tag index pages
publican.config.tagPages = {
  root: 'tag',                // root tag directory
  size: 24,                   // number of items per paginated page
  sortBy: 'date',             // sort by date order
  sortOrder: -1,              // from most to least recent
  template: 'default.html',   // using this template
  menu: false,                // do not show tag on the menu
  index: 'monthly'            // index tag pages monthly
};
```

Any template used by a tag index can access a [`data.pagination`](--ROOT--docs/reference/content-properties/#datapaginatation) object to generate lists of pages.

Setting `publican.config.tagPages`{language=js} to `false` (or any falsy value) disables tag index pages.

Note that a root `tag/index.html` page is not automatically created. You can create a [tag index page](--ROOT--docs/setup/tag-indexes/#tacstaglist) to output all tags using the [`tacs.tagList` object](--ROOT--docs/reference/global-properties/#tacstaglist).


## HTML minification

Publican minifies HTML using [html-minifier](https://www.npmjs.com/package/html-minifier). By default, `publican.config.minify`{language=js} defines an object with the following [html-minifier options](https://www.npmjs.com/package/html-minifier#options-quick-reference) which you can change or add further options:

{{ `publican.config.js` excerpt }}
```js
// tag index pages
publican.config.minify = {
  enabled: false,                     // minification not enabled
  collapseBooleanAttributes: true,    // remove boolean attribute values
  collapseWhitespace: true,           // collapse white space
  decodeEntities: false,              // use Unicode characters when available
  minifyCSS: true,                    // minify inline CSS
  minifyJS: true,                     // minify inline JS
  preventAttributesEscaping: false,   // prevent attribute escaping
  removeAttributeQuotes: true,        // remove attribute quotes
  removeComments: true,               // remove comments
  removeEmptyAttributes: true,        // remove empty attributes
  removeRedundantAttributes: true,    // remove redundant attributes
  removeScriptTypeAttributes: true,   // remove type="text/javascript"
  removeStyleLinkTypeAttributes: true,// remove type="text/css"
  useShortDoctype: true               // use the short HTML5 doctype
};
```

You can set your configuration to only minify production builds, e.g.

{{ `publican.config.js` excerpt }}
```js
// minify in production mode only
const isDev = (process.env.NODE_ENV === 'development');
publican.config.minify.enabled = !isDev;
```


## Pass through files

It's sometimes necessary to copy files to the build directory that require no further processing by Publican, e.g. CSS, JavaScript, fonts, images, videos, etc. This can be implemented in your `publican.config.js` configuration file by adding an object to the `.config.passThrough` [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) with `.from` and `.to` properties:

```js
publican.config.passThrough.add({ from: <src>, to: <dest> });
```

where:

* `<src>` is a source directory relative to the project root, and
* `<dest>` is a destination directory relative to the build directory

Publican recursively copies all files and sub-directories of the source to the destination.

{{ `publican.config.js` excerpt }}
```js
// copy ./src/media/favicons/**/* to ./build/
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });

// copy ./src/media/images/**/* to ./build/images/
publican.config.passThrough.add({ from: './src/media/images', to: './images/' });

// copy ./src/css/**/* to ./build/css/
publican.config.passThrough.add({ from: './src/css', to: './css/' });

// copy ./src/js/**/* to ./build/js/
publican.config.passThrough.add({ from: './src/js', to: './js/' });
```


## Event functions

Functions can be defined in your [configuration file](--ROOT--docs/setup/configuration/) that are called when specific events occur at build time. The functions can inspect, add, alter, or remove data.

Refer to [event functions](--ROOT--docs/reference/event-functions/) for details.


## Watch mode

Setting `publican.config.watch`{language=js} to `true` (or any truthy value) watches for file changes and rebuilds the site. This is normally done in development mode only:

{{ `publican.config.js` excerpt }}
```js
// watch in development mode only
const isDev = (process.env.NODE_ENV === 'development');
publican.config.watch = isDev;
```

By default, Publican waits at least 300 milliseconds to ensure no further files are saved. This can be changed:

{{ `publican.config.js` excerpt }}
```js
// debounce watch for 1 second
publican.config.watchDebounce = 1000;
```

A shorter `watchDebounce` can negatively affect performance because multiple rebuilds are triggered for multiple file changes.

Press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> to stop Publican running.

::: aside

Publican only monitors content and template files. Changing the [configuration file](--ROOT--docs/setup/configuration/) or its imported modules will not trigger a rebuild -- you must manually stop and restart Publican.

::: /aside


## Logging verbosity

Set `publican.config.logLevel`{language=js} to an integer:

* `0`: errors only
* `1`: errors and status messages
* `2`: errors, status, and warning messages (the default)
