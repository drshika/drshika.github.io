---
layout: ikebana
---
<header class="page-header">
  <h1 class="project-name">→ ~ ls -lt /ikebana</h1>
</header>

<main id="content" class="main-content" role="main">
  <div class="posts-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
    {% for post in site.ikebana reversed %}
    <article class="post-preview">
      <a href="{{ post.url }}" style="display: block; text-decoration: none;">
        {% if post.image %}
        <img src="{{ post.image }}" alt="{{ post.title }}" style="max-width: 100%; height: auto; margin-bottom: 10px;" />
        {% endif %}
        <h3 style="margin: 0; font-size: 1.1em; font-family: monospace; text-decoration: underline;">{{ post.image | split: '/' | last }}</h3>
      </a>
    </article>
    {% endfor %}
  </div>

  <footer class="site-footer" style="margin-top: 40px;">
    <a href="/" class="back-link">← back to Home</a>
  </footer>
</main>
