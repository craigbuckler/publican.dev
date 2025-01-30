---
title: Semantic markdown blocks
menu: Semantic markdown
description: How to use semantic HTML tags such as aside, section, and article in markdown blocks.
date: 2025-01-23
priority: 0.9
tags: HTML, markdown, SEO
---

Elements such as `<aside>`, `<section>`, and `<article>` cannot be expressed in markdown unless you create a block of HTML content. Unfortunately, this means child markdown is not converted to HTML. For example:

{{ markdown input }}
```md
<aside>
See also:

* [link one](#one)
* [link two](#two)
* [link three](#three)
</aside>
```

renders the HTML exactly as shown.

The following [`processContent` hook](--ROOT--docs/reference/event-functions/#processcontent) function translates <code>$&#123; tag &#125;</code> &hellip; <code>$&#123; /tag &#125;</code>, where `tag` can be `aside`, `section`, or `article`.


```js
publican.config.processContent.add( data => {
  data.content = data.content
    .replace(/{\s*(\/{0,1}aside|section|article)\s*\}/gi, '<$1>')
    .replace(/<p><(aside|section|article)><\/p>/gi, '<$1>')
    .replace(/\n<(.+?)><(aside|section|article)>\s/gi, '\n<$2><$1>')
    .replace(/\n<\/(aside|section|article)><\/(.+?)>\n/gi, '</$2></$1>\n');
}
```

Converting `<aside>` tags to use <code>&#123;</code> and <code>&#125;</code> brackets in the example above now outputs:

{{ HTML output }}
```html
<aside>
<p>See also:</p>

<ul>
  <li><a href="#one">link one</a></li>
  <li><a href="#two">link two</a></li>
  <li><a href="#three">link three</a></li>
<ul>
</aside>
```
