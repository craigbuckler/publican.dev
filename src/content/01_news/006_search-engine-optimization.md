---
title: Does Publican make your site rank higher in search engines?
menu: false
description: Can static site tools such as Publican help your site achieve better rankings in search engine results?
author: Craig Buckler
tags: SSG, SEO
priority: 1.0
publish: 2025-02-07
date: 2025-02-07
modified: 2025-02-07
hero: images/binoculars.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@elijahjmears">Elijah Mears</a>
---

A Publican-built static site won't miraculously jump to #1 in Google, but there are no factors that could stop it happening. Done well, a static site has a good chance of beating competitors offering similar content.


## Search Engine Optimization

The <abbr title="Search Engine Optimization">SEO</abbr> industry is shrouded in mysterious secrets revealed to a select few by the internet overlords. *That's how it's sold.*

There must be *some* good SEO companies. I've just not encountered them. In my experience...


### Few understand your business

Few SEO companies take time to analyse who you are, what you're doing, and who you're trying to reach. I'm sure a table leg manufacturer can write a lot about the topic, but could they realistically publish a daily news post? The issue is worse for small companies without dedicated media teams or time to make frequent updates.

Without industry knowledge, how can an SEO company offer meticulous keyword research or understand customer needs?


### Most lack technical skills

Few good developers work in the SEO industry. I've heard all sorts of technical nonsense which, at best, offers a negligible return on development effort. At worst, it's a full site rebuild with the SEO company leading the project.


### Many simply run Google Ads

There's nothing wrong with [Google Ads](https://ads.google.com/). If you have deep pockets, you can guarantee a position at the top of results for a particular search term.

{aside}
In my experience, organic results have a higher click rate, but Google Ads offers a quick solution for new or poor performing sites.
{/aside}

However, some SEO companies just take your monthly fee and spend a small proportion on ads.

To make the most of Google Ads, you need:

1. An understanding of your industry and customers to help select relevant target keywords.
1. Basic IT knowledge.
1. A few hours initial setup time, plus an hour or two per week to monitor results and make adjustments.
1. A budget.

Try it yourself first. Only consider hiring someone if you don't have the time, inclination, or results to continue.


### Promotional services are limited

Promoting your site on social media and other platforms raises the number of inbound links. Google and other search engines use this as a ranking metric. If two pages have similar content, the one with more inbound links *should* appear higher in search results.

Promotions are time consuming and this is one area an SEO company could be providing some value. Unfortunately, it's often a poor return on investment:

* Links are not the only metric.

* Google quickly spots link farms -- lots of small sites which link to a page for no obvious reason. It can lead to your site being banned.

* Musk and Zuckerberg don't want you to leave their social media platforms. Content leading to other places won't be seen or shared as often as you hope.


### They chase traffic -- not conversions

Traffic is a vanity metric but it's how most SEO companies measure "success".

Which of these sites is more successful?...

1. A site which gets 100 visits per week with 50% converting to good sales leads.
1. A site which gets 10,000 visits per week with 0.5% converting to good sales leads.

Both get 50 sales leads, but the second's cost of acquisition is considerably higher. They pay more for hosting and support because they're dealing with 9,900 uninterested visitors.

SEO companies assume more visits will increase sales. That may be true, but few bother to measure it.


### Snake oil sales

Few tech industries provide miracle "cures" shrouded in magical secrecy. Even AI and crypto grifts offer some technical justification for bloated over-valuations.

Site owners are often bamboozled with spurious quasi-technical claims. They're too scared to cancel SEO services for fear of a traffic hit.


## Technical SEO

It's no secret how to rank well in Google, Bing, DuckDuckGo and others:

1. Write content your audience wants to read.
1. Use appropriate keywords, but write for users -- *not search engines*.
1. Use [best practice techniques](--ROOT--news/site-performance/) to ensure documents are fast and accessible for all users -- *including indexing bots*.
1. Don't use sneaky technical tricks. You won't fool search engines for long, and risk being blocked.


### Simpler sharing buttons

Share buttons typically have low user engagement but they can be useful to help visitors remember or recommend your site.

Most social media platforms provide sharing widgets but they:

* affect site performance -- many download hundreds of Kilobytes of code
* are a security risk like any other third-party JavaScript, and
* can cause privacy concerns because they track users across the web.

Fortunately, you can use [URL-based sharing APIs](https://blog.logrocket.com/how-to-improve-social-engagement-with-the-web-share-api/). Publican.dev provides [sharing buttons](#share) that are safe, lightweight, and cannot be tracked. They work without JavaScript, but progressive enhancements are added to handle popup windows and the [Web Share API](https://developer.mozilla.org/docs/Web/API/Web_Share_API).


## Summary

I'd rather not criticize an industry, but SEO is something you should consider at the start of a website project. Development teams should have members that understand content creation and technical implementation. SEO is not an afterthought you can liberally sprinkle on at the end -- *but that's often how it's sold*.

Publican can help your technical SEO efforts because it allows you to craft a site exactly as you want. You should spend time and money on promotion, but focus your budget and priorities toward good content and code first.


### Get started with Publican

The [Publican documentation](--ROOT--docs/) provides a [quick start guide](--ROOT--docs/quickstart/concepts/), a [detailed set-up guide](--ROOT--docs/setup/content/), [API references](--ROOT--docs/reference/publican-options/), and [common recipes](--ROOT--docs/recipe/) you can use and adapt for your own projects.

<p><a href="--ROOT--docs/quickstart/concepts/" class="button">Get started</a></p>
