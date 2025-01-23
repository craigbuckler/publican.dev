---
title: Create breadcrumb links
menu: Breadcrumb links
description: How show a list of links to all parent pages of the current page.
date: 2025-01-23
priority: 0.9
tags: navigation
---

The global `tacs.nav` value is a nested array of data you can use used to build navigation. Refer to the [main menu page](--ROOT--docs/recipe/navigation/main-menu/#tacsnav) for a description.

It is difficult to manage `tacs.nav` using `${ expressions }` alone since you must recurse the object. The following sections describe how to create a breadcrumb function you can use in templates.


## Create a function library

[As before](--ROOT--docs/recipe/navigation/main-menu/#create-a-function-library), edit the `lib/nav.js` file and add a new `breadcrumb()`{language=js} function:

* It's passed the current page link.
* It recurses `tacs.nav` and creates an `<ol>`{language=html} list of parent page links.

{{ `lib/nav.js` excerpt }}
```js
// breadcrumb navigation
export function breadcrumb( currentPage ) {

  const crumb = [];
  recurseNav( tacs.nav );

  const ret = crumb
    .map(n => `<li>${ n.link && n.index ? `<a href="${ n.link }">` : ''}${ n.menu || n.title }${ n.link && n.index ? '</a>' : ''}</li>`)
    .join('\n');

  return ret ? `<nav class="breadcrumb">\n<ol>\n${ ret }</ol>\n</nav>` : '';

  function recurseNav(nav) {

    let found;

    nav.forEach(n => {

      found = found || currentPage === n.data.link;

      if (!found) {
        found = recurseNav(n.children);
        if (found) crumb.unshift(n.data);
      }

    });

    return found;

  }

}
```

The [library has already been imported](--ROOT--docs/recipe/navigation/main-menu/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.nav` object so no additional code is required.


## Use in templates

A function named `tacs.fn.nav.breadcrumb()`{language=js} is now available to content and templates:

```html
${ tacs.fn.nav.breadcrumb( data.link ) }
<h1>${ data.title }</h1>
```

Assuming the [content structure on the main menu page](--ROOT--docs/recipe/navigation/main-menu/#tacsnav), the resulting menu HTML when you're visiting the `Article one` page is:

```html
<nav class="breadcrumb">
  <ol>
    <li><a href="/news/">News</a></li>
  </ol>
</nav>
<h1>Article one</h1>
```
