---
title: Semantic markdown blocks
menu: Semantic markdown
description: How to use semantic HTML tags such as aside, section, and article in markdown blocks.
date: 2025-01-23
modified: 2025-04-10
priority: 0.9
tags: HTML, markdown, SEO
---

Elements such as `<aside>`, `<section>`, `<article>`, and `<nav>` cannot be expressed in markdown unless you create a block of HTML content. Unfortunately, this means child markdown is not converted. For example:

{{ markdown input }}
```md
<aside class="a1">

See also:

* [link one](#one)
* [link two](#two)
* [link three](#three)

</aside>
```

is rendered exactly as shown without any HTML conversion.

The following [`processContent` hook](--ROOT--docs/reference/event-functions/#processcontent) function translates markdown blocks such as `::: aside`{language=markdown} and `::: /aside`{language=markdown} to raw HTML:

{{ `publican.config.js` excerpt }}
```js
publican.config.processContent.add( data => {

  data.content = data.content
    .replace(/((<.+?>){0,1}\s*:::(.+?)(<\/.+?>){0,1}\n)/gi, (m, p1, p2, p3, p4, pos, str) => {

      // tag offset
      pos += (p2 || '').length + 3;

      if (str.lastIndexOf('<code', pos) > str.lastIndexOf('</code', pos)) {

        // inside a code block - no change
        return p1;

      }
      else {

        // replace ::: tag and smart quotes with HTML
        let tag = `<${
          p3.trim()
            .replace(/[\u2018\u2019]/g, '\'')
            .replace(/[\u201C\u201D]/g, '"')
        }>\n`;

        // swap outer tags
        if (!p2 || !p4) {
          tag = (p4 || '') + tag + (p2 || '');
        }

        return tag;

      }
    });

}
```

The following markdown:

{{ markdown input }}
```md
::: aside class="a1"

See also:

* [link one](#one)
* [link two](#two)
* [link three](#three)

::: /aside
```

now renders:

{{ HTML output }}
```html
<aside class="a1">

  <p>See also:</p>

  <ul>
    <li><a href="#one">link one</a></li>
    <li><a href="#two">link two</a></li>
    <li><a href="#three">link three</a></li>
  <ul>

</aside>
```

::: aside

## Use whitespace around blocks

Add empty carriage returns either side of a `::: tag`{language=md} to ensure the markdown parser does not consider it as part of the text.

::: /aside

::: aside

## Unsafe HTML

The code above renders tag code as-is. Scripts or other unsafe code could be injected, e.g. `::: div onclick="alert('unsafe!')"`{language=md}. If you do not have full control over your content sources, you should ensure the `tag` string is sanitized, perhaps with a whitelist of approved HTML elements and attributes.

::: /aside
