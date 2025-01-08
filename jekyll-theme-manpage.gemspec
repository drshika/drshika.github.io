# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-manpage"
  spec.version       = "0.1.0"
  spec.authors       = ["Drshika Asher"]
  spec.email         = ["67125579+drshika@users.noreply.github.com."]

  spec.summary       = "A Linux man page inspired Jekyll theme"
  spec.homepage      = "https://github.com/drshika/jekyll-theme-manpage"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^((_includes|_layouts|_sass|assets)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-toc", "~> 0.18"
  spec.add_runtime_dependency "jekyll-katex", "~> 1.0"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"  
end
