---
title: Create Publican templates
menu: Create templates
description: How to add templates to your Publican site.
date: 2025-01-23
priority: 0.9
tags: templates, template literals
---

Create a `src/template/` directory in your project:

{{ `terminal` }}
```bash
cd src
mkdir template
```

Then create a default template file named `default.html` with code such as:

{{ `src/template/default.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>

    ${ include('_partials/header.html') }

    <main>

      <h1>${ data.title }</h1>

      ${ data.content }

    </main>

  </body>
</html>
```

Note how the content is slotted into place using JavaScript template literal `${ expressions }`{language=js}:

* `${ data.title }`{language=js} is the `title` defined in the content's front matter
* `${ data.content }`{language=js} is the main page content
* `${ include('_partials/header.html') }`{language=html} includes another file. Create that file with the following content:

{{ `src/template/_partials/header.html` }}
```html
<header>
  <nav><a href="${ tacs.root }">HOME</a></nav>
</header>
```
