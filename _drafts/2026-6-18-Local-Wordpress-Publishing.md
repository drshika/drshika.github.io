---
layout: post
title: Local Wordpress Publishing with Git
excerpt_separator: <!--more-->
toc: true

tags: [webdev]
---

I've been investigating static site builders to help a non technical designer build their portfolio website. 

Here are my requirements:
- No montly subscription
- Free hosting as this is a small static site with low traffic
- Easy visual editor
- No coding for the client

I was looking into options like [Silex](https://www.silex.me/) which is a bit too complicated for non technical folks and also [Webstudio](https://webstudio.is/) which has a self hosted version but is more involved than the solution I came to.  

For now I have come up with the following setup: 

- Use [LocalWP](https://localwp.com/) for local development (with the [Staatic](https://staatic.com/) plugin) for static site generation
    - I created a Github Key which allows me to push the wordpress files I create locally to a repository
- Use [Netlify](https://www.netlify.com/) for deploying the static site after content is pushed to the github repository.

I will keep this page updated as I come across new solutions. I'm also curious if there are better alternatives for this process out there! 