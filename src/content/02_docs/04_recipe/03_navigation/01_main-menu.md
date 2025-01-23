---
title: Create a main menu
menu: Main menu
description: How to create navigation links to all pages on your static site.
date: 2025-01-23
priority: 0.9
tags: navigation
---

The global `tacs.nav` value is a nested array of data that can use used to build site navigation menus.


## `tacs.nav`

`tacs.nav` returns an array. Each element of that array has two values:

1. a `data` property containing the [page `data` object](--ROOT--docs/reference/content-properties/) at the site's top level, i.e. they have no parent pages. The pages are sorted by whatever has been defined for [directory indexes](--ROOT--docs/setup/directory-indexes/#directory-index-configuration).

1. a `children` property containing an array of immediate child page objects. Each of these elements has its own `data` and `children` properties.

If your `src/content/` directory contained the following files:

```bash
#index.md

news/
  #index.md
  one.md
  two.md
```

an abbreviated `tacs.nav` object would have a structure similar to this:

```json
[

  {
    data: {
      title: "Home page",
      slug: "index.html"
    }
    children: []
  },


  {
    data: {
      title: "News",
      slug: "news/index.html"
    }
    children: [

      {
        data: {
          title: "Article one",
          slug: "news/one/index.html"
        }
        children: []
      },

      {
        data: {
          title: "Article two",
          slug: "news/two/index.html"
        }
        children: []
      },

    ]
  }

]
```

It is difficult to manage `tacs.nav` using `${ expressions }`{language=js} alone since you must recurse the object. The following sections describe how to create a navigation function library you can reuse in templates.


## Create a function library

Rather than put all your code into the `publican.config.js` configuration file, you can create reusable function libraries in other files. The functions these libraries export can be appended to the global `tacs` object.

The following example creates a new `lib/nav.js` file containing navigation helper functions. The first is `menuMain()`{language=js}:

* It's passed the current page link and an optional array of root directory names to remove from the navigation.
* It recurses `tacs.nav` and creates a nested set `<detail>`{language=html} and `<summary>`{language=html} elements containing a `<ul>`{language=html} list of child links (and possibly additional `<detail>`{language=html} sub-menus).
* There is no link generated to the current page so it can be styled in an *active* state.

{{ `lib/nav.js` }}
```js
// navigation functions
import { tacs } from 'publican';

// nested main menu navigation
// pass current page and array of child directories to omit from navigation
export function menuMain( currentPage, omit = [] ) {

  return '<ul>' + recurseNav( tacs.nav ) + '</ul>';

  function recurseNav(nav, level = 0) {

    return nav.map(n => {

      // format title
      const data = n.data;

      if (data.menu === false) return '';

      let ret = data.menu || data.title;
      if (!data.link) {
        ret = ret.slice(0, 1).toUpperCase() + ret.slice(1).toLowerCase();
      }
      else {
        if (currentPage === data.link) ret = `<strong>${ ret }</strong>`;
        else ret = `<a href="${ data.link }">${ ret }</a>`;
      }

      // get children
      const children = omit.includes( data.directory ) ? null : recurseNav( n.children, level+1 ).trim();

      if (children) {
        ret = `\n<details${ level ? '' : ' name="mainmenu"' }${ level && children.includes('<strong>') ? ' open' : ''}>\n<summary>${ ret }</summary>\n<ul>\n${ children }</ul>\n</details>\n`;
      }

      return data.link || children ? `<li>${ ret }</li>\n` : '';

    }).join('\n');

  }

}
```


## Import the library

You can import the public navigation functions into your `publican.config.js` configuration file. The following code appends them as child properties of the `tacs.fn.nav` object:

{{ `publican.config.js` excerpt }}
```js
import { Publican, tacs } from 'publican';
import * as fnNav from './lib/nav.js';

const publican = new Publican();

// append navigation functions
tacs.fn = tacs.fn || {};
tacs.fn.nav = fnNav;

// build site
await publican.build();
```


## Use in templates

A function named `tacs.fn.nav.menuMain()`{language=js} is now available to content and templates, e.g.

```html
<nav class="menu">
  ${ tacs.fn.nav.menuMain( data.link ) }
</nav>
```

Assuming the [content structure above](#tacsnav), the resulting menu HTML when you're visiting the `Article one` page is:

```html
<nav class="menu">
  <ul>

    <li><a href="/">Home page</a></li>

    <li>
      <details name="mainmenu">
        <summary><a href="/news/">News</a></summary>
        <ul>
          <li><strong>Article one</strong></li>
          <li><a href="/news/two/">Article two</a></li>
        </ul>
      </details>
    </li>

  </ul>
</nav>
```
