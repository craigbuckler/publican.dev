---
title: Publican installation
menu: Install Publican
description: How to start a new Publican project.
date: 2025-01-15
priority: 0.9
tags: Node.js, npm
---

You can add Publican to any Node.js project, but it's best to create a new project directory when using it for the first time.


## Initialize a new project

Create a new Node.js project directory somewhere on your system:

{{ `terminal` }}
```bash
mkdir mysite
cd mysite
```

Initialize the project with whatever values you require:

{{ `terminal` }}
```bash
npm init
```

This creates a `package.json` file. Ensure you default to ES Modules and, optionally, the main entry script:

```json
  "type": "module",
  "main": "publican.config.js"
```

Your file should have similar values to this (but may have more):

{{ `package.json` example }}
```json
{
  "name": "mysite",
  "version": "1.0.0",
  "description": "My static site",
  "type": "module",
  "main": "publican.config.js"
}
```


## Add the Publican module

Install Publican as a project dependency:

{{ `terminal` }}
```bash
npm i publican
```
