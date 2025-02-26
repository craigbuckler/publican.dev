---
title: The jsTACS template engine
menu: jsTACS
description: More information about the jsTACS rendering engine used in Publican templates.
date: 2025-01-23
modified: 2025-02-26
priority: 0.9
tags: jsTACS, templates, template literals, markdown, HTML
---

Publican uses [jsTACS](https://www.npmjs.com/package/jstacs) -- *JavaScript Templating and Caching System* -- as its templating engine. Unlike other engines, there's no special files or syntax. You just use JavaScript template literals such as:

```js
${ data.title }
```


## String literal expressions

An `${ expression }`{language=js} must return a value to render something on the page, e.g.

```js
${ "str" + "ing" } // string

${ 2 + 2 } // 4

${ (new Date()).getUTCFullYear() } // current year (four digits)
```

Strings and numbers are rendered as-is. The values:

* `null`, `undefined` and `NaN` are rendered as an empty string.
* `true`, `false` and `0` are rendered as text.
* [Arrays](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), [Sets](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set), and [Maps](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) have every value output. There's no need for `.join('')`{language=js} unless you want a specific character between each item.


### Content `data` properties

Content values for each page are available in a [`data` object](--ROOT--docs/reference/content-properties/). For example, show the page title, word count, and content:

```html
<h1>${ data.title }</h1>
<p>This article has ${ data.wordCount } words.</p>

${ data.content }
```


### Global `tacs` properties

Global values which apply throughout the site are available in a [`tacs` object](--ROOT--docs/reference/global-properties/). For example, ensure links use the correct server root:

```html
<p><a href="${ tacs.root }">home page</a></p>
```

The `tacs` value is available in `publican.config.js` so you can append other global [values](--ROOT--docs/reference/template-globals/#defining-global-properties) and [functions](--ROOT--docs/reference/template-globals/#defining-global-properties). The following example sets today's date, the site language, and a `tacs.formatDate()` function:


{{ `publican.config.js` }}
```js
import { Publican, tacs } from 'publican';

// create Publican object
const publican = new Publican();

// global date and language
tacs.today = new Date();
tacs.language = 'en-US';

// global format date function
tacs.formatDate = d => {
  return new Intl.DateTimeFormat(
    tacs.language,
    { dateStyle: 'long' }
  ).format( d )
};

// build site
await publican.build();
```

You can use these to show the current date in human-readable format:

```html
<p>Last build on ${ tacs.formatDate( tacs.today ) }</p>
```


## `toArray()` conversion

The `toArray()` function converts any value, object, Set, or Map to an array so you can apply methods such as `.map()` and `.filter()`, e.g.

```html
<!-- output any value -->
${ toArray( data.something ).map(m => `Value ${ m }`).join(', ') }
```


## `include()` templates

Templates can include other template files with:

```js
${ include('<filename>') }
```

where `<filename>` is relative to the [template directory](--ROOT--docs/setup/templates/#template-file-location). The example `default.html` below includes `_partials/header.html`:

{{ `src/template/default.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>

    ${ include('_partials/header.html') }

    <main>
      ${ data.content }
    </main>

  </body>
</html>
```

`_partials/header.html` includes `_partials/nav.html`:

{{ `src/template/_partials/header.html` }}
```html
<header>
  ${ include('_partials/nav.html') }
  <h1>${ data.title }</h1>
</header>
```

`_partials/nav.html` has no further includes:

{{ `src/template/_partials/nav.html` }}
```html
<nav><a href="${ tacs.root }">Home</a><nav>
```

{aside}
jsTACS will not permit more than 50 iterations when parsing templates. This prevents circular `include()` expressions or code recursively generating further expressions.
{/aside}


## Template literals in markdown

You can use template literals in markdown content but some care may be necessary to avoid problems with HTML conversion. Simpler expressions will work as expected:

```md
<!-- page title -->
## ${ data.title }

<!-- list all page titles -->
${ toArray( tacs.all ).map(i => i.title && '<p>' + i.title + '</p>') }
```

However, you may need to use a double-bracket <code>$&#123;&#123; expression &#125;&#125;</code> in some situations. This denotes a *real* expression irrespective of where it resides in the markdown *(they are stripped from the content before HTML conversion)*. They may be necessary when you have nested expressions, e.g.

<pre class="language-js"><code class="language-js">&#36;{{ toArray( tacs.all ).map(i =&gt; i.title && &#96;&lt;li&gt;&#36;{ i.title }&lt;/li&gt;&#96;) }}</code></pre>

or want to execute an expression inside a code block:

<pre class="language-js"><code class="language-js">&#96;&#96;&#96;js
console.log( '&#36;{{ data.title }}' );
&#96;&#96;&#96;</code></pre>

If this does not solve your problem, you can:

1. Use HTML snippets in your markdown file, e.g.

    ```md
    A markdown paragraph.

    <p>This ${ "HTML block" } is skipped by the markdown parser.</p>
    ```

1. Simplify expressions using [custom jsTACS functions](--ROOT--docs/reference/template-globals/#defining-global-functions).

1. Only use complex expressions in HTML content or template files. These are not processed by the markdown parser.


## Runtime expressions

`!{ expression }`{language=js} identifies expressions that are ignored during the build but converted to `${ expression }` at the end and remain in the rendered file. Publican can therefore create sites that are *mostly* static, with islands of dynamic values rendered at runtime.

Consider the following content:

{{ `src/content/index.md` }}
```md
---
title: Home page
---

My home page.
```

It uses the default template:

{{ `src/template/default.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>

    <main>
      <h1>${ data.title }</h1>
      ${ data.content }
    </main>

    <footer>
      <p>Today's date is !{ data.today }</p>
    </footer>

  </body>
</html>
```

Publican builds the following static HTML page. The title and content have rendered, but `!{ data.today }`{language=js} has become `${ data.today }`{language=js}:

{{ `build/index.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Home page</title>
  </head>
  <body>

    <main>
      <h1>Home page</h1>
      <p>My home page.</p>
    </main>

    <footer>
      <p>Today's date is ${ data.today }</p>
    </footer>

  </body>
</html>
```

This partially-rendered template can be used in a framework such as [Express.js](https://expressjs.com/) with [jsTACS](https://www.npmjs.com/package/jstacs) as its rendering engine. It can dynamically set the `data.today` property on every page visit:

```js
import express from 'express';
import { templateEngine } from 'jstacs';

const
  app = express(),
  port = 8181;

app.engine('html', templateEngine);
app.set('views', './build/');
app.set('view engine', 'html');

// render template at ./templates/index.html
app.get('/', (req, res) => {
  res.render('index', {
    today: (new Date()).toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});
```

{aside}
### Development dependency

You could build partially-rendered templates on your development system so Publican is only required as an `npm` [devDependency](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file). It would not need to be present on the production server -- that only requires [jsTACS](https://www.npmjs.com/package/jstacs).

This has some disk space and security benefits, but may make deployment more complicated.
{/aside}
