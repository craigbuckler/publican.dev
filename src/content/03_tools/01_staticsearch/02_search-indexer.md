---
title: StaticSearch indexer
menu: Indexer
description: How to use and configure the StaticSearch indexer to index words in your static site.
date: 2025-06-17
priority: 0.8
tags: StaticSearch
---

You must run the StaticSearch indexing process whenever your site content changes. It would typically be done following a build as part of your site's deployment process.

During indexing, StaticSearch extracts words from all the HTML files in a build directory (`./build/`) and creates a new directory (`./build/search/`) containing index data, JavaScript, and CSS files.


## Installing StaticSearch

StaticSearch can be run without installation:

{{ terminal }}
```bash
npx staticsearch
```

You can also install it globally:

{{ terminal }}
```bash
npm install staticsearch -g
```

then run using:

{{ terminal }}
```bash
staticsearch
```

The remainder of this tutorial shows global `staticsearch` commands, but you can still prepend `npx` if necessary.


## StaticSearch help

View StaticSearch command line help using:

{{ terminal }}
```bash
staticsearch --help
```

Additional help options are available from the CLI:

|CLI|description|
|-|-|
|`-v`, `--version`|show application version|
|`-?`, `--help`|show CLI help|
|`-E`, `--helpenv`|show .env/environment variable help|
|`-A`, `--helpapi`|show Node.js API help|


## Using the StaticSearch Node.js API

You can configure and run StaticSearch from any Node.js project. This is useful when you want to index a site as part of your build process, perhaps within a [Publican `publican.config.js` configuration file](--ROOT--docs/setup/configuration/).

To use StaticSearch, install it as a dependency:

{{ terminal }}
```bash
npm install staticsearch
```

then import the module, set configuration options, and run the `.index()` method in your JavaScript code:

{{ `index.js` example }}
```js
// example search index
import { staticsearch } from 'staticsearch';

// configuration
staticsearch.buildDir = './dest/';
staticsearch.searchDir = './dest/index/';
staticsearch.buildRoot = './blog/';
staticsearch.wordWeight.title = 20;

// run indexer
await staticsearch.index();
```

When an option is not explicitly set, StaticSearch falls back to an environment variable then the default value.

Run your application as normal to index a site, e.g. `node index.js`


## Configuring StaticSearch

StaticSearch can index most sites without additional configuration. However, you can set options as CLI arguments, environment variables, or the [Node.js API](#using-the-staticsearch-nodejs-api). This section describes the configuration parameters.


### Load environment files

All StaticSearch options can be set using environment variables, e.g.

{{ terminal }}
```bash
export BUILD_DIR=./dest/
staticsearch
```

Variables can also be defined in a file and loaded with `--env <file>`. Create a file with your configuration values, e.g.

{{ example `.env` }}
```ini
# StaticSearch environment variables
BUILD_DIR=./dest/
SEARCH_DIR=./dest/index/
BUILD_ROOT=/blog/
```

Then import the file on the command line:

{{ terminal }}
```bash
staticsearch --env .env
```

Note that CLI arguments take precedence over environment variables.


### File indexing options

The following options control how static site files are parsed:

|CLI|ENV|API|description|
|-|-|-|-|
|`-b`, `--builddir` | `BUILD_DIR` | `.buildDir`|website directory (`./build/`)|
|`-s`, `--searchdir` | `SEARCH_DIR` | `.searchDir`|index data directory (`./build/search/`)|
|`-d`, `--domain` | `SITE_DOMAIN` | `.siteDomain`|site domain (`http://localhost`)|
|`-r`, `--root` | `BUILD_ROOT` | `.buildRoot`|site root path (`/`)|
|`-i`, `--indexfile` | `SITE_INDEXFILE` | `.siteIndexFile`|default index file (`index.html`)|
|`-f`, `--ignorerobotfile` | `SITE_PARSEROBOTSFILE` | `.siteParseRobotsFile`|parse robot.txt Disallows (`true`)|
|`-m`, `--ignorerobotmeta` | `SITE_PARSEROBOTSMETA` | `.siteParseRobotsMeta`|parse robot meta noindex (`true`)|

The **build directory** (`--builddir` | `BUILD_DIR` | `.buildDir`) is an absolute or relative path to the directory where your static website files are built, e.g. `./build/`.

The **search directory** (`--searchdir` | `SEARCH_DIR` | `.searchDir`) is an absolute or relative path to the directory where the search index JavaScript and JSON data files are generated. You can use any path, but it should normally be inside your build directory, e.g. `./build/search/`. When no search directory is set, it will default to a `search` sub-directory of the build directory.

If your pages use links with fully qualified URLs such as `https://mysite.com/path/`, you should set the **domain** (`--domain` | `SITE_DOMAIN` | `.siteDomain`) so they can be identified, e.g. `https://mysite.com`.

The **web root path** is presumed to be `/`, so a file named `./build/index.html` is your home page. You can set it to another path, such as `/blog/` if necessary (`--root` | `BUILD_ROOT` | `.buildRoot`). The file at `./build/index.html` is then presumed to have the URL `http://site.com/blog/index.html`.

The **HTML index file** used as the default for directory paths is presumed to be `index.html`. You can change this to another filename if necessary (`--indexfile` | `SITE_INDEXFILE` | `.siteIndexFile`), e.g. `default.htm`.

StaticSearch parses the **`robots.txt` file** in the root of the build directory, e.g.

{{ example `robots.txt` }}
```txt
User-agent: *
Disallow: /secret/

User-agent: staticsearch
Disallow: /personal/
```

In this case, StaticSearch will not index any HTML file in the `/secret/` or `/personal/` directories. This can be disabled using `--ignorerobotfile` | `SITE_PARSEROBOTSFILE=false` | `.siteParseRobotsFile=false`.

StaticSearch parses **HTML `meta` tags**. A page containing `noindex` in the `content` attribute of either of the following meta tags is not indexed:

{{ example `index.html` }}
```html
<meta name="robots" content="noindex">
<!-- OR -->
<meta name="staticsearch" content="noindex">
```

This can be disabled by setting `--ignorerobotmeta` | `SITE_PARSEROBOTSMETA=false` | `.siteParseRobotsMeta=false`.

**Example**: index HTML files in the `./dest/` directory, ignore `robots.txt` restrictions, and write search index files to `./dest/search/`:

```bash
staticsearch --builddir ./dest/ --searchdir ./dest/search/ --ignorerobotfile
```


### Document indexing options

StaticSearch attempts to locate your page's main content; you would not normally want to index text in the header, footer, and navigation which appears on every page. It checks for content in:

1. the HTML `<main>` element. Any `<nav>` or `<menu>` blocks within that are ignored.

1. the HTML `<body>` when no `<main>` element can be found. Content is ignored in `<header>`, `<footer>`, `<nav>`, and `<menu>` elements (or any element with an ID or class attribute containing `header`, `footer`, etc).

If this is not suitable, you can set alternative elements using CSS selectors to locate your main content:

|CLI|ENV|API|description|
|-|-|-|-|
|`-D`, `--dom` | `PAGE_DOMSELECTORS` | `.pageDOMSelectors`| nodes to include |
|`-X`, `--domx` | `PAGE_DOMEXCLUDE` | `.pageDOMExclude`| nodes to exclude |

The `--dom` | `PAGE_DOMSELECTORS` | `.pageDOMSelectors` value defines a comma-delimited list of CSS selectors where the main content is located, e.g. `'article.primary, .secondary, aside'`{language=css}.

The `--domx` | `PAGE_DOMEXCLUDE` | `.pageDOMExclude` value defines a comma-delimited list of CSS child selectors to **exclude** from selected nodes e.g. `'nav, menu, .private'`{language=css}.

**Example**: index content in `#main`{language=css} and `.secondary`{language=css} elements but exclude all `<nav>`{language=html}, and `<div class="related">`{language=html} elements within those:

{{ terminal }}
```bash
npx staticsearch --dom '#main,.secondary' --domx 'nav,div.related'
```

Notes:

1. In the example above, pages without `#main`{language=css} or `.secondary`{language=css} elements will **not** be indexed.

1. Be careful not to index the same elements more than once. In the example above, content inside a `.secondary`{language=css} block would be indexed twice if it were contained inside a `#main`{language=css} block.

1. Ensure excluded nodes are valid **child** selectors. Consider this example:

   ```bash
   npx staticsearch --dom '.main' --domx 'body nav'
   ```

   It would **not** exclude the `<nav>` in the following HTML because it couldn't find a child `body`{language=css} element inside `.main`{language=css}:

   ```html
   <article class="main">
     <p>main content</p>
     <nav>navigation</nav>
   </article>
   ```


### Word indexing options

The following options control how words are indexed:

|CLI|ENV|API|description|
|-|-|-|-|
|`-l`, `--language` | `LANGUAGE` | `.language`|language (`en`)|
|`-c`, `--wordcrop` | `WORDCROP` | `.wordCrop`|crop word letters (`7`)|
|`-s`, `--stopwords` | `STOPWORDS` | `.stopWords`|comma-separated list of stop words|
|`--weightlink` | `WEIGHT_LINK` | `.wordWeight.link`|word weight for inbound links (`5`)|
|`--weighttitle` | `WEIGHT_TITLE` | `.wordWeight.title`|word weight for main title (`10`)|
|`--weightdesc` | `WEIGHT_DESCRIPTION` | `.wordWeight.description`|word weight for description (`8`)|
|`--weighth2` | `WEIGHT_H2` | `.wordWeight.h2`|word weight for H2 headings (`6`)|
|`--weighth3` | `WEIGHT_H3` | `.wordWeight.h3`|word weight for H3 headings (`5`)|
|`--weighth4` | `WEIGHT_H4` | `.wordWeight.h4`|word weight for H4 headings (`4`)|
|`--weighth5` | `WEIGHT_H5` | `.wordWeight.h5`|word weight for H5 headings (`3`)|
|`--weighth6` | `WEIGHT_H6` | `.wordWeight.h6`|word weight for H6 headings (`2`)|
|`--weightemphasis` | `WEIGHT_EMPHASIS` | `.wordWeight.emphasis`|word weight for bold and italic (`2`)|
|`--weightalt` | `WEIGHT_ALT` | `.wordWeight.alt`|word weight for alt tags (`1`)|
|`--weightcontent` | `WEIGHT_CONTENT` | `.wordWeight.content`|word weight for content (`1`)|

The default `--language` | `LANGUAGE` | `.language` is English (`en`). This provides[ word stemming and stop word lists](--ROOT--tools/staticsearch/how-it-works/#a-3-process-words) to reduce the size of the index and provide *fuzzier* searching. Setting any other language indexes every word without stemming or stop words (further languages may be supported in future releases).

By default, `--wordcrop` | `WORDCROP` | `.wordCrop` is set to `7`: only the first 7 letters of any word are considered important. Therefore, the word "consider", "considered", and "considering" are effectively identical (and indexed as `conside`). You can change this limit if necessary.

You can add further stop words (words omitted from the index) using `--stopwords` | `STOPWORDS` | `.stopWords`. For example, a site about "Acme widgets" probably mentions them on every page. The words are of little practical use in the search index so the stop words `'acme,widget'` could be set.

The `--weight` | `WEIGHT_` | `.wordWeight` values define the score allocated to a word according to its location in a page. The defaults:

| word location | score |
|-|-|
| title / h1 heading | 10 |
| description | 8 |
| h2 heading | 6 |
| h3 heading | 5 |
| h4 heading | 4 |
| h5 heading | 3 |
| h6 heading | 2 |
| emphasis (bold/italic) | 2 |
| main content | 1 |
| alt tags | 1 |
| inbound link | 5 |

Consider a page with the word *"static"* in the title, `<h2>`{language=html} heading, and an `<em>`{language=html}. The page scores 18 (10 + 6 + 2) for *"static"*, so it will appear above pages scoring less in search results.

In addition, any other page linking to it using the word *"static"* adds a further 5 points to the score.

::: aside

Many inbound links can override scores allocated by titles and text. It's best to omit menus from indexing since they create an inbound link to many pages. For this reason, the indexer [excludes `<nav>` and `<menu>` elements by default](#document-indexing-options).

::: /aside

**Example**: change the language to Spanish, crop words to 6 characters, and set the title score to 20:

```bash
staticsearch --language es --wordcrop 6 --weighttitle 20
```


### Logging options

The following option controls logging verbosity:

|CLI|ENV|API|description|
|-|-|-|-|
|`-L`, `--loglevel` | `LOGLEVEL` | `.logLevel` | logging verbosity (2)|

Set:

* `0`: fatal errors only
* `1`: errors and status messages
* `2`: errors, status, and warning messages (the default)


## Next steps

Once a site has been indexed, StaticSearch provides three options for implementing search on your site:

1. the [web component](--ROOT--tools/staticsearch/search-web-component/) -- an HTML-only search widget

1. the [bind module](--ROOT--tools/staticsearch/search-bind-module/) -- allows you to *bind* elements to search functionality using HTML and/or JavaScript

1. the [search API](--ROOT--tools/staticsearch/search-api/) -- create your own search UI using the JavaScript API.
