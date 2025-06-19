---
title: Do Publican sites rank better in Google search?
menu: false
description: Can static site tools such as Publican help your site achieve better rankings in search engine results?
author: Craig Buckler
tags: SSG, SEO
priority: 1.0
modified: 2025-02-11
hero: images/binoculars.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@elijahjmears">Elijah Mears</a>
---

A Publican-built static site won't miraculously jump to #1 in Google, but there are no technical factors that could prevent that happening. Done well, a static site has a good chance of beating competitors offering similar content.


## What is SEO?

Search Engine Optimization (SEO) is a set of techniques to help your site appear higher in results for specific terms. To rank well in Google, Bing, DuckDuckGo, and others:

1. Write content your audience wants to read.
1. Use appropriate keywords, but write for users -- *not search engines*.
1. Use [best practice techniques](--ROOT--news/site-performance/) to ensure documents use semantic HTML, are fast, and accessible to all users -- *including indexing bots*.
1. Don't use sneaky technical tricks. You won't fool search engines for long, and they may block you.

A post may go viral, but there's no magic formula. It's dumb luck. Sometimes, you hit on a topic which resonates with others and it's shared exponentially. It can happen months or years after you publish.

Your competitors may use these techniques -- but many won't.


### Simpler sharing buttons

Share buttons often have low user engagement but they can help visitors remember or recommend your site.

Most social media platforms provide sharing widgets but they:

* affect site performance -- some download hundreds of Kilobytes of code
* are a security risk like any other third-party JavaScript, and
* can cause privacy concerns because they track users across the web.

They're not necessary. You can use [URL-based sharing buttons](https://blog.logrocket.com/how-to-improve-social-engagement-with-the-web-share-api/) like [those on Publican.dev](#share) that are safe, lightweight, and untraceable. They work without JavaScript, but progressive enhancements can implement popup windows and the [Web Share API](https://developer.mozilla.org/docs/Web/API/Web_Share_API).


## Should you hire SEO experts?

The SEO industry is shrouded in mystery. An enigmatic sect of internet overlords reveal its secrets to specially selected individuals following years of rigorous trials. *That's how it's sold.*

You may have considered hiring a specialist SEO company. There must be *some* good ones, but I'm yet to encounter them. In my experience...


### They don't understand your business

Few SEO companies bother to analyse your company, challenges, or customers. Without industry knowledge, how can an SEO company offer meticulous keyword research or understand what potential buyers need?

They'll often make unrealistic recommendations. I'm sure a table leg manufacturer can write a lot about the topic, but could they publish a daily news post? The issue is worse for small companies without dedicated media teams or time to make frequent updates.

If you don't follow all their demands, any SEO failures become your fault.


### They lack technical skills

Few *good* developers appear to work in the SEO industry. I've heard all sorts of technical nonsense which, at best, offers a negligible return on development effort. At worst, they want a full business reorganization and site rebuild with the SEO company leading the project.


### Many run Google Ads

There's nothing wrong with [Google Ads](https://ads.google.com/). If you have deep pockets, you can guarantee a position at the top of results for specific search terms.

::: aside

In my experience, organic results have a higher click rate, but Google Ads offers a quick solution for new or poor performing sites.

::: /aside

Unfortunately, some SEO companies just take your money and spend a small proportion on ads.

To make the most of Google Ads, you need:

1. An understanding of your industry and customers to help determine relevant target keywords.
1. Basic IT knowledge.
1. A few hours initial setup time, plus an hour or two per week to track results and adjust as necessary.
1. A budget.

Try it yourself first. Only consider hiring someone if you don't have the time, inclination, or results to continue.


### Their promotions have limitations

Promoting your site on social media and other platforms raises the number of inbound links. Google and other search engines use this as a ranking metric. If two pages have similar content, the one with more inbound links *should* appear higher in search results.

Promotional work is time consuming. It's one area an SEO company could provide value, but it's often a poor return on investment:

* Inbound links are important but they're not the only metric.

* They may use dozens of small sites to link to your page for no obvious reason. Google bans sites when they spot link farms.

* Musk and Zuckerberg don't want you to leave their social media platforms. Content leading to other places isn't seen or shared as often as you hope.


### They chase traffic -- not conversions

Traffic is a vanity metric but it's how most SEO companies measure "success".

Which of these sites is more successful?...

1. A site which gets 100 visits per week with 50% converting to good sales leads.
1. A site which gets 10,000 visits per week with 0.5% converting to good sales leads.

Both get 50 sales leads, but the second's cost of acquisition is considerably higher. They pay more for hosting and support because they're dealing with 9,900 uninterested visitors.

SEO companies assume more visits leads to increased sales. That may be true, but they rarely measure it.


### They sell snake oil

Few tech industries provide miracle "cures" shrouded in magical secrecy. Even AI and crypto grifts offer some technical justification for bloated over-valuations.

The worst offenders *prove* their effectiveness by demonstrating you're at #1 in Google:

* for an [expensive ad](#many-run-google-ads) you're paying for, or
* by searching for an unusual phrase on one of your pages a real customer would never use.

Site owners are often bamboozled with spurious quasi-technical claims. They're too scared to cancel SEO services for fear of a traffic hit.


## Summary

I'd rather not criticize an industry, but SEO is something to consider at the **start** of a website project. Development teams should have members that understand content creation and technical implementation. SEO is not a special sauce you can liberally sprinkle on at the end.

Publican can help your technical SEO efforts because it allows you to craft your site exactly as you need. You should spend time and money on promotion, but focus your budget and priorities toward good code and content first.


## Get started

The [Publican documentation](--ROOT--docs/) provides a [quick start guide](--ROOT--docs/quickstart/concepts/), a [detailed set-up guide](--ROOT--docs/setup/content/), [API references](--ROOT--docs/reference/publican-options/), and [common recipes](--ROOT--docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="--ROOT--docs/quickstart/concepts/" class="button">Get started</a></li>
  <li><a href="--ROOT--about/donate/" class="button">Donate</a></li>
</ul>
