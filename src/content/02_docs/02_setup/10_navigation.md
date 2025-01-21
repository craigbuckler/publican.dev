---
title: Publican navigation options
menu: Navigation
description: Publican provides various objects to help with site navigation.
date: 2025-01-17
priority: 0.9
tags: navigation
---

Publican provides a number of in-page and site-wide navigation objects and properties to help you create menus and links to other pages.


## Heading links

All content sub-headings (`<h2>`{language=html} to `<h6>`{language=html}) are made *linkable*. The `publican.config.headingAnchor`{language=js} object controls how headings are rendered. You can set it to `false` (or any falsy value) to disable heading links or define your own values. The defaults are:

{{ `publican.config.js` excerpt }}
```js
// text in heading link
publican.config.headingAnchor.linkContent = '#';

// heading link class for CSS
publican.config.headingAnchor.linkClass = 'headlink';
```

A heading such as:

```html
<h2>My heading</h2>
```

has a link appended:

```html
<h2>My heading <a href="#my-heading" class="headlink">#</a></h2>
```

{aside}
Ensure your heading are nested correctly. For example, following an `<h2>`{language=html}, you could have another `<h2>`{language=html} or an `<h3>`{language=html}, but not an `<h4>`{language=html}.
{/aside}


## In-page navigation

The code `<nav-heading></nav-heading>` can be placed in any content or template file. A page's nested content headings (`<h2>`{language=html} to `<h6>`{language=html}) are rendered into the block, e.g.

{{ example in-page navigation }}
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
// the tag name: <nav-heading></nav-heading>
publican.config.headingAnchor.tag = 'nav-heading';

// the class assigned to the parent <nav>
publican.config.headingAnchor.navClass = 'contents';
```


## Back and next post links

The post's `data.postback` and `data.postnext` hold the `data` object of the previous and next post according to the directory or tag ordering. You can link to the previous and next page using template code such as:

```html
${ data?.postback?.link &&
  `<p><a href="${ data.postback.link }">back: ${ data.postback.title }</a></p>` }

${ data?.postnext?.link &&
  `<p><a href="${ data.postnext.link }">next: ${ data.postnext.title }</a></p>` }
```


## `tacs.nav`{language=js}

`tacs.nav` is a global nested array of post objects ordered for navigation menus, breadcrumb trails, etc. Each element in the array has [post `data`](--ROOT--docs/reference/content-properties/) as well as a `.children` property holding an array containing child `data` items. Each child page has it's own `data` and `children` array where appropriate.

It is generally necessary to recurse the `tacs.nav` object, so this is easier in a [global function](--ROOT--docs/reference/template-globals/#defining-global-functions) rather than template. The following recipes provide code for:

* [a main menu](--ROOT--docs/recipe/navigation/main-menu/)
* [a section menu](--ROOT--docs/recipe/navigation/section-menu/)
* [breadcrumb links](--ROOT--docs/recipe/navigation/breadcrumb-links/)
