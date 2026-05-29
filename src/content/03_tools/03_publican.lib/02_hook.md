---
title: Publican.lib event hooks
menu: Event hooks
description: Publican.lib provides a set of event hooks that supplement the standard Publican functionality.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, event hooks
---

The `hook` [event functions](__/docs/reference/event-functions/) append supplemental data and change some aspects of static site rendering. The `libInit()` function adds all hook functionality:

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

Or you can add event hooks individually:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';
import * as hook from 'publican.lib/hook';

// ...set Publican defaults...

// add hooks
publican.config.processPostRender.add( hook.postrenderMeta );

// build
await publican.build();
```


## `processFileDate()`

A [processContent hook](__/docs/reference/event-functions/#processcontent) that sets the content [`date`](__/docs/reference/content-properties/#datadate) and `modified` properties for any content file using a file name pattern `YYYY-MM-DD_something.md`.

It does not alter the [rendered file slug](__/docs/reference/content-properties/#dataslug), but you can remove the date with:

{{ `publican.config.js` excerpt }}
```js
// slug replacement strings - remove YYYY-MM-DD
publican.config.slugReplace.set(/\d{4}-\d{2}-\d{2}_/g, '');
```


## `contentFilename()`

A [processContent hook](__/docs/reference/event-functions/#processcontent) that parses a  `{{ filename }}` above a code block in a markdown file. You can style the resulting HTML to show a tab or similar:

```html
<p class="filename language-js">
  <dfn>myfile.js</dfn>
</p>
<pre class="language-js">...
```


## `htmlBlocks()`

A [processContent hook](__/docs/reference/event-functions/#processcontent) that replaces markdown lines starting with three colons into HTML tags. For example:

{{ content markdown }}
```md
::: div id="mydiv"

Some content

::: /div
```

results in the HTML:

{{ output HTML }}
```html
<div id="mydiv">

  <p>Some content<p>

</div>
```


## `renderstartData()`

A [processRenderStart hook](__/docs/reference/event-functions/#processrenderstart) that modifies the title and description of all tag index files to create friendlier text such as:

* "JavaScript" posts
* List of 23 posts using the tag "JavaScript".


## `renderstartInlineScripts()`

A [processRenderStart hook](__/docs/reference/event-functions/#processrenderstart) that creates a global `tacs.script` JavaScript Map that defines [inline scripts using cspScript()](__/tools/publican.lib/utility/#cspscriptcode-type):

1. `tacs.script.get('theme')`: an inline script that appends a `data-theme` attribute to the root `<html>` element using a localStorage value
1. `tacs.script.get('speculation')`: an inline [speculation rules definition](https://developer.mozilla.org/docs/Web/API/Speculation_Rules_API)


## `prerenderInlineScripts()`

A [processPreRender hook](__/docs/reference/event-functions/#processprerender) that creates a `data.script` JavaScript Map for every page that defines an [inline script using cspScript()](__/tools/publican.lib/utility/#cspscriptcode-type):

1. `data.script.get('schema')`: an inline [schema.org](https://schema.org/) structured data block.


## `renderstartTagScore()`

A [processRenderStart hook](__/docs/reference/event-functions/#processrenderstart) that creates a global `tacs.tagScore` JavaScript Map object that calculates a score for each tag (lesser-used tags have a higher score). This helps determine related articles.


## `prerenderRelated()`

A [processPreRender hook](__/docs/reference/event-functions/#processprerender) that appends a `data.related` array to every page with a list of related articles in order of relevancy. To output the three most-relevant related articles:

{{ template }}
```html
${ data?.related?.length ? `
  <aside>
    <h2>Related posts</h2>
    <nav>
      ${ data.related
          .slice(0,3)
          .map(p => `<p><a href="{ p.link }">${ p.title }</a></p>`)
          .join('') }
    </nav>
  </aside>
` : ''}
```


## `postrenderMeta()`

A [processPostRender hook](__/docs/reference/event-functions/#processpostrender) that inserts a Publican `<meta name="generator">` tag into the head of every HTML page.
