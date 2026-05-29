---
title: Publican.lib navigation functions
menu: Navigation
description: Publican.lib provides a set of navigation generation functions you can use in templates.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, navigation, templates
---

The `nav` functions provide HTML menus and pagination. The `libInit()` function adds all functions:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';
import { libInit } from 'publican.lib';

// ...set Publican defaults...

// initialize publican.lib
libInit(publican, tacs);

// build
await publican.build();
```

Or you can add functions individually:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';
import { pagination } from 'publican.lib/nav';

// ...set Publican defaults...

// add global navigation functions
tacs.lib = tacs.lib || {};
tacs.lib.nav = { pagination };

// build
await publican.build();
```

## `menuMain()`

Creates a hierarchical main menu using the HTML `<menu>` structure with `<details>` and `<summary>` elements:

{{ HTML output example }}
```html
<menu>
  <li>
    <details>
      <summary><a href="/one/">Level One</a></summary>
      <menu>
        <li><strong>Active page</strong></li>
        <li>
          <details>
            <summary><a href="/two/">Level Two</a></summary>
            <menu>
              <li><a href="/sub2-1/">Sub-menu 2-1</a></li>
              <li><a href="/sub2-2/">Sub-menu 2-2</a></li>
            </menu>
          </details>
        </li>
      </menu>
    <details>
  </li>
</menu>
```

The function parameters in order:

* `tacs`: the global `tacs` object (required)
* `currentPage`: the current page's URL from `data.link` (required)
* `allOpen`: either -1=never open `<details>`, 0=when child is active, or 1=always
* `maxLevel`: the maximum depth of links
* `omit`: an array of root directory names to omit

Use in a template:

{{ template }}
```html
<nav id="main">
  ${ tacs.lib.nav.menuMain( tacs, data.link ) }
</nav>
```


## `menuDir()`

Creates a hierarchical menu for a specific directory using a similar structure to [`menuMain`](#menumain), but all `<details>` have an `open` attribute set.

Parameters:

* `tacs`: the global `tacs` object (required)
* `rootDir`: the directory name (required)
* `currentPage`: the current page's URL from `data.link` (required)
* `maxLevel`: the maximum depth of links

Use in a template:

```html
<nav id="documentation">
  ${ tacs.lib.nav.menuDir( tacs, 'doc', data.link ) }
</nav>
```


## `breadcrumb()`

Creates a breadcrumb trail to the current page using the HTML structure:

```html
<nav class="breadcrumb">
  <ol>
    <li><a href="/grandparent/">Grand parent</a></li>
    <li><a href="/parent/">Parent</a></li>
  </ol>
</nav>
```

Parameters:

* `tacs`: the global `tacs` object (required)
* `currentPage`: the current page's URL from `data.link` (required)

Use in a template:

```html
${ tacs.lib.nav.breadcrumb( tacs, data.link ) }
```


## `tagList()`

Generates a list of all tags ordered by ascending count of the articles using those tags. It results in the HTML structure:

```html
<nav class="taglist">
  <ul>
    <li class="taglist5"><a href="/tag/one/">one <sup>19</sup></a></li>
    <li class="taglist4"><a href="/tag/two/">two <sup>17</sup></a></li>
    <li class="taglist3"><a href="/tag/three/">three <sup>15</sup></a></li>
    <li class="taglist2"><a href="/tag/four/">four <sup>13</sup></a></li>
    <li class="taglist2"><a href="/tag/five/">five <sup>13</sup></a></li>
    <li class="taglist1"><a href="/tag/six/">six <sup>10</sup></a></li>
  </ul>
</nav>
```

Parameters:

* `tacs`: the global `tacs` object (required)
* `classPrefix`: a `class` name to use (`taglist` by default)
* `classMin`: the minimum size class (1 by default)
* `classMax`: the maximum size class (5 by default)

The most-used tag has a class of `taglist5`. The least-used tag has a class of `taglist1`. All other tags have a value between.

Use in a template:

```html
${ tacs.lib.nav.tagList(tacs) }
```


## `pagination()`

Generates pagination for directory and tag index pages using the HTML structure:

```html
<nav class="pagination">
  <ul>
    <li class="back"><span>◄</span></li>
    <li class="current"><strong>1</strong></li>
    <li><a href="/tag/one/1/">2</a></li>
    <li class="next"><a href="/tag/one/1/" title="next index page">►</a></li>
  </ul>
</nav>
```

Parameters:

* `pagination`: the page's `data.pagination` object (required)

```html
${ tacs.lib.nav.pagination( data.pagination ) }
```
