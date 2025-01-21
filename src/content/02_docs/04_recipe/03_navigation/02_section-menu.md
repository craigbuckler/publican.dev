---
title: Create a section menu
menu: Section menu
description: How show a list of links to all pages in a specific core directory.
date: 2025-01-21
priority: 0.9
tags: navigation
---

The global `tacs.nav` value is a nested array of data you can use used to build navigation. Refer to the [main menu page](--ROOT--docs/recipe/navigation/main-menu/#tacsnav) for a description.

It is difficult to manage `tacs.nav` using `${ expressions }` alone since you must recurse the object. The following sections describe how to create a section menu function you can use in templates.


## Create a function library

[As before](docs/recipe/navigation/main-menu/#create-a-function-library), edit the `lib/nav.js` file and add a new `menuDir()`{language=js} function:

* It's passed the current page link and the root directory name.
* It recurses `tacs.nav` and creates a nested set `<detail>`{language=html} and `<summary>`{language=html} elements for that directory containing a `<ul>`{language=html} list of child links (and possibly additional `<detail>`{language=html} sub-menus).
* There is no link generated to the current page so it can be styled in an *active* state.

{{ `lib/nav.js` excerpt }}
```js
// menu for a specific directory
export function menuDir( currentPage, rootDir ) {

  if (!rootDir) return;

  return '<ul>' + recurseNav( tacs.nav ) + '</ul>';

  function recurseNav(nav, dirFound) {

    return nav.map(n => {

      // format title
      const data = n.data;

      if (data.menu === false || (!dirFound && data.directory !== rootDir)) return '';

      let ret = data.menu || data.title;
      if (!data.link) {
        ret = ret.slice(0, 1).toUpperCase() + ret.slice(1).toLowerCase();
      }
      else {
        if (currentPage === data.link) ret = `<strong>${ ret }</strong>`;
        else if (data.index !== false) ret = `<a href="${ data.link }">${ ret }</a>`;
      }

      // get children
      const children = recurseNav( n.children, true ).trim();

      if (children) {
        ret = dirFound ? `\n<details open>\n<summary>${ ret }</summary>\n<ul>\n${ children }</ul>\n</details>\n` : children;
      }

      return dirFound ? `<li>${ ret }</li>\n` : ret;

    }).join('\n');

  }

}
```

The [library has already been imported](--ROOT-docs/recipe/navigation/main-menu/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.nav` object so no additional code is required.


## Use in templates

A function named `tacs.fn.nav.menuDir()`{language=js} is now available to content and templates. The following example shows the `news` menu when you're viewing a page in that section:

```html
${ data.directory === 'news' ?
    `<nav class="menudir">
      ${ tacs.fn.nav.menuDir( data.link, 'news' ) }
    </nav>` :
    ''
}
```

Assuming the [content structure on the main menu page](docs/recipe/navigation/main-menu/#tacsnav), the resulting menu HTML when you're visiting the `Article one` page is:

```html
<nav class="menudir">
  <ul>
    <li><strong>Article one</strong></li>
    <li><a href="/news/two/">Article two</a></li>
  </ul>
</nav>
```
