---
layout: writing
title: Writing
---
<h1>-> ~ ls -lt /writing</h1>

<ul style="list-style: none;">  
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.content | strip_html | truncatewords:25 }}
    </li>
  {% endfor %}
</ul>

<a href="/"><- back to Home</a>