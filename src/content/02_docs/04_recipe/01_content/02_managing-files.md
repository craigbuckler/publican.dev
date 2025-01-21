---
title: Managing content files
menu: Managing content
description: How to organize content files for easier management.
date: 2025-01-19
priority: 0.9
tags: content
---

Large sites with many files can become difficult to manage. Presume you have a `post/` directory with blog entries that are typically ordered on the website by date from newest to oldest. Your OS shows the files in alphabetical order -- *not the order you wrote them in*. If you want to edit the latest file, you must manually locate it.

```bash
post/
  css-weirdisms.md
  html-first.md
  my-js-journey.md
  ramblings.md
  some-news.md
```


## Index file numbers

To make files easier to manage, you could add an incrementing number to the start of the filename. The last file is then the last you wrote:

```bash
post/
  001_my-js-journey.md
  002_some-news.md
  003_html-first.md
  004_css-weirdisms.md
  005_ramblings.md
```

You can remove the numbers from slugs using the `publican.config.slugReplace` [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) to replace two or more digits followed by an underscore:

{{ `publican.config.js` excerpt }}
```js
// slug replacement - removes NN_
publican.config.slugReplace.set(/\d{2,}_/g, '');
```

The latest slug would then be `post/rambings/index.html` rather than `post/005_rambings/index.html`.


## Organizing documentation

The same concept can be used to order documentation, e.g.

```bash
docs/

  01_quickstart/
    01_overview.md
    02_install.md
    03_usage.md

  02_reference/
    01_configuration.md
    02_methods.md
    03_function-hooks.md
```

Files can be ordered by `filename` in [navigation](--ROOT--docs/setup/navigation/) and [directory index pages](#directory-index-pages) so they appear that way in menus but their slugs have the `NN_` removed:

{{ `publican.config.js` excerpt }}
```js
// slug replacement - removes NN_
publican.config.dirPages.sortBy = 'filename';
publican.config.dirPages.sortOrder = 1;

// slug replacement - removes NN_
publican.config.slugReplace.set(/\d{2,}_/g, '');
```
