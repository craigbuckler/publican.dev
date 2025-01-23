---
title: Create related page links
menu: Related pages
description: How show a list of links to pages with related content.
date: 2025-01-23
priority: 0.9
tags: navigation
---

There are a number of ways to show lists of pages with related content. The following sections describe the process used on this site.


## Relevancy scoring

This site uses an algorithm which assigns a relevancy score to each page when they have:

1. **The same tags**

    Each tag has an associated score. The most-used tag only scores `1` because it's used across many pages. A tag used only once has a score equivalent to the total number of tags.

    All matching tags have their associated score added to the relevancy score.

1. **The same directories**

   Pages with matching root directories have `1` added to the relevancy score. If next directory level also matches, `2` is added and so on.

Pages with the highest relevancy scores can then be shown.


## Create a function library

The following code creates a new `lib/hooks.js` file containing two functions.


### `renderstartTagScore()`{language=js}

This function is used as a [`processRenderStart` event hook](--ROOT--docs/reference/event-functions/#processrenderstart) which runs once before page rendering starts. It creates a global `tacs.tagScore`{language=js} [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) where the key is the normalized tag reference name and the value is its score based on usage. The less a tag is used, the higher its score.

{{ `lib/hooks.js` }}
```js
// processRenderStart hook: calculate tacs.tagScore { rel: score } Map
// lesser-used tags have a higher score
export function renderstartTagScore( tacs ) {

  if (!tacs.tagList.length) return;

  // maximum tag count
  const countMax = tacs.tagList[0].count + 1;

  // tag score Map
  tacs.tagScore = new Map();
  tacs.tagList.forEach(t => tacs.tagScore.set(t.ref, countMax - t.count));

}
```


### `prerenderRelated()`{language=js}

This function is used as a [`processPreRender` event hook](--ROOT--docs/reference/event-functions/#processprerender) which runs for each page before its rendered.

It examines all other pages and assigns them a relevancy score based on [matching tags and directories](#relevancy-scoring). The post's [`data` object](--ROOT--docs/reference/content-properties/) has a `related` array appended containing other page `data` objects which have a relevancy score of as least `1` ordered from highest (most relevant) to lowest (least relevant).

{{ `lib/hooks.js` }}
```js
// processPreRender hook: related posts, generated at pre-render time
export function prerenderRelated( data, tacs ) {

  if (!tacs.tagScore || !data.filename || !data.title || !data.isHTML || !data.tags) return;

  const relScore = [];

  // calculate other post relevency scores
  tacs.all.forEach((post, slug) => {

    if (data.slug == slug || !post.filename || !post.title || !post.isHTML || !post.tags) return;

    let score = 0;

    // calculate matching tag scores
    data.tags.forEach(dTag => {
      post.tags.forEach(pTag => {
        if (dTag.ref === pTag.ref) score += tacs.tagScore.get( dTag.ref );
      });
    });

    // calculate matching directory scores
    const
      dDir = data.link.split('/').filter(d => d),
      pDir = post.link.split('/').filter(d => d);

    let i = 0;
    while (i >= 0) {

      if (dDir[i] && dDir[i] === pDir[i]) {
        i++;
        score += i;
      }
      else i = -1;

    }

    // record related
    if (score) relScore.push( { slug, score } );

  });


  // add to related posts sorted by score
  data.related = relScore
    .sort((a, b) => b.score - a.score || b.date - a.date )
    .map(p => tacs.all.get( p.slug ) );

}
```


## Import the library

You can import the `lib/hooks.js` functions into your [`publican.config.js` configuration file](--ROOT--docs/setup/configuration/) and use them in [custom event hooks](--ROOT--docs/reference/event-functions/):

{{ `publican.config.js` excerpt }}
```js
import { Publican, tacs } from 'publican';
import * as fnHooks from './lib/hooks.js';

const publican = new Publican();

// processRenderStart hook: create tacs.tagScore Map
publican.config.processRenderStart.add( fnHooks.renderstartTagScore );

// processPreRender hook: determine related posts
publican.config.processPreRender.add( fnHooks.prerenderRelated );

// build site
await publican.build();
```


## Use in templates

You can now examine the `data.related` array in any template. The following example shows up to three posts with the highest relevancy scores.

```html
${ data?.related?.length ? `
  <aside class="related">
    <h2>Related posts</h2>
    <nav>
      ${ data.related
        .slice(0,3)
        .map(p => `
          <p><a href="${ p.link }">${ p.title }</a></p>
        `)
        .join('') }
    </nav>
  </aside>
` : ''}
```
