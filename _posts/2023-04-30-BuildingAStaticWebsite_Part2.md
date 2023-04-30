---
title: "Building A Static Website - Part 2: Using and Customising Themes"
categories:
  - Website Building
tags:
  - jekyll
  - markdown
  - github
  - tutorial
published: false
last_modified_at: 2023-04-30
---


This article will explore how you can leverage Jekyll themes as well as customise them to suit your needs. You can find a working example of the final product [here](https://jamesmount.tech/building_a_static_website_part_2/) as well as the complete code within this [repository](https://github.com/jmount1992/building_a_static_website_part_2).

This is the second article in the static website building series. 

**Prerequisites**: Familiarity with Jekyll, your operating system's terminal, an understanding of how the web works, and some knowledge of HTML, CSS, and JavaScript is recommended.

# Getting Started

We will use the [Jekyll Quick Start](https://jekyllrb.com/docs/) to help us get a lot of the boilerplate out of the way. To get started perform the following.

1. Navigate to the directory where you want your root folder for your website to exist.
2. Use Jekyll to create a new website: `jekyll new <website-name>`
3. Navigate into the new website root folder: `cd <website-name>`
4. Locally serve the newly created website: `bundle exec jekyll serve --livereload`

Check out the new website. You will find it already looks much prettier than what we have previously created. This is because, when you run `jekyll new <website-name>`, it creates a lot of boilerplate including adding a pointer to the [Minima](https://github.com/jekyll/minima) theme. We will look at how we can modify themes shortly. However, first we shall look at some of the boilerplate. Most of this should make some sense to you, if not, go check out the first article in this series.

## Gemfile Exploration

We will start by exploring the Gemfile. It all looks fairly standard. You will even see some comments and commented code pointing towards how you can use Jekyll with GitHub Pages. We will explore these lines in more detail in the next article within this series, where we look at deployment. There is also some gem files to for specific platforms, we can leave those be. Your Gemfile may now look something like this:

{% tabs step_1 %}
{% tab step_1 code %}
```ruby
# Gems source
source "https://rubygems.org"

# Jekyll, the theme, and jekyll plugins
gem "jekyll", "~> 4.3.1"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
```
{% endtab %}
{% endtabs %}

The only other thing to note is the [jekyll-feed](https://github.com/jekyll/jekyll-feed) plugin. This plugin generates an Atom feed of your Jekyll posts. A person can [subscribe](https://www.thesitewizard.com/faqs/howtoreadsitefeeds.shtml) to this feed and get updated when you have created a new post. More general information about Jekyll Plugins can be found [here](https://jekyllrb.com/docs/plugins/installation/).

## Configuration File

Let us now look at the `_config.yml` file. Again, there are some comments, you should quickly skim these as they do have some insights. It would also be wise to checkout the [Jekyll Configuration Options](https://jekyllrb.com/docs/configuration/options/#global-configuration) documentation. Go ahead and update the configuration variables under the site settings comment. Feel free to remove some of the commentry as well. Your configuration file may look something like this now:

{% tabs step_2 %}
{% tab step_2 code %}
```yaml
# Site settings
title: James Mount
email: myemail@example.com
description: This is a dummy website that is part of James Mount's website building guide.
baseurl: "/building_a_static_website_part_2" # the subpath of your site, e.g. /blog
url: "https://jamesmount.tech" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jmount1992
github_username:  jmount1992

timezone: Australia/Brisbane

# Build settings
theme: minima
plugins:
  - jekyll-feed
```
{% endtab %}
{% endtabs %}

A few important things to note:

- We must also list the plugins in the configuration file, as shown in the above example.
- Remember to add the timezone information.

## Theme File Exploration

Everything else should be fairly straight forward. However, you may be wondering where are the directories `_layout`, `_includes`, `assets`, etc. As we are using a theme, these are bundled and stored with the Minima Gem. You could overwrite the Minima theme's default layout by creating, for example, `_layout/default.html` in your website root directory. If you wish to use Minima theme's default layout as a starting point for your own default layout, you may wish to copy the theme's default layout first and then hack away. To find the theme's files on your computer you can run the command `bundle info --path <theme>`, in this case replace `<theme>` with `minima`. More information on Jekyll Themes can be found [here](https://jekyllrb.com/docs/themes/). We will look at changing the theme shortly. If you wish, you can change `index.markdown` and `about.markdown` to use the shorter file extension `.md`.

# Changing Themes

There are many themes out there. The Jekyll documentation has a [list](https://jekyllrb.com/docs/themes/#pick-up-a-theme) of various places you could go to find themes. If you look at the [GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll) documentation, they state they have some default supported themes. However, the instructions aren't clear and can lead to some errors. We also don't want to limit ourselves to only use themes supported by Github Pages; in the next article we will discuss this restriction in greater detail and how we can circumnavigate the limitation. The easiest way to use a theme, is to include the remote theme plugin and alter the configuration file. For example, to use the [Cayman](https://github.com/pages-themes/cayman) theme, we would do the following (feel free to try):

1. Change your Gemfile by removing the Minima theme and adding the [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme) and [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) plugins to the jekyll plugins group. We need the `jekyll-seo-tag` plugin as it is used by the Cayman theme. If you forget to add it, that is okay, when you go to serve your website locally you will get an error that will basically say you are missing the Gem. Simply add it and move on. You can also remove the `jekyll-feed` plugin if you wish, it isn't used by the Cayman theme. Your Gemfile should now look like this:

{% tabs step_3 %}
{% tab step_3 code %}
```ruby
# Gems source
source "https://rubygems.org"

# Jekyll, the theme, and jekyll plugins
gem "jekyll", "~> 4.3.1"

group :jekyll_plugins do
    gem "jekyll-remote-theme"
    gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
    gem "tzinfo", ">= 1", "< 3"
    gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. Run `bundle update` to make the changes.

3. In `_config.yml` remove the theme tag and replace it with `remote_theme: cayman`, and add the remote-theme and seo-plugin to the list. You can also remove the jekyll-feed plugin, if you removed it from the Gemfile. Your `_config.yml` will now look something like this:

{% tabs step_4 %}
{% tab step_4 code %}
```yaml
# Site settings
title: James Mount
email: myemail@example.com
description:  This is a dummy website that is part of James Mount's website building guide.
baseurl: "/building_a_static_website_part_2" # the subpath of your site, e.g. /blog
url: "https://jamesmount.tech" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jmount1992
github_username:  jmount1992

timezone: Australia/Brisbane

# Build settings
remote_theme: pages-themes/cayman@v0.2.0
plugins:
- jekyll-remote-theme
- jekyll-seo-tag
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Build and serve the website locally. You will most likely get a warning that says `Build Warning: Layout 'post' requested in ....` This is because the Cayman theme only has one layout, the default layout. Typically the easiest way to see what layouts are available with a remote theme, is to look at its github repository. Go change the layout in `index.md`, `about.md`, and in the post located in the `_posts` folder to `default`.

5. Rebuild and serve the website locally.

If you followed along, you will see our home page now follows the Cayman theme. Yay! However, unfortunately the Cayman theme is designed as a single page. We could, using the knowledge we gained in the previous guide, create a navigation menu by creating `_includes/navigation.html` and `_data/navigation.yml` files, and hacking the `default.html` template. And we will look at that shortly. However, firstly, we will go explore another theme.

A very popular theme is the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) theme. This website is actually built using Minimal Mistakes with some hacks to make it more personal. A preview of the theme can be found [here](https://mmistakes.github.io/minimal-mistakes/). Most themes have an online preview. Let's try changing to that theme.

1. In the `Gemfile` add `gem "jekyll-include-cache"` to the list of jekyll plugins.

2. In the `_config.yml` file change the remote theme to `mmistakes/minimal-mistakes@4.24.0` and add `jekyll-include-cache` to the list of plugins. Also, while we are at it, add and set some of the configuration variables associated with the minimal mistakes theme. In this example we set some of the site author configuration variables. Some of the original configuration variables we had might not actually be used by the minimal mistakes theme but, we can leave them. Your `_config.yml` may now look something like this:

{% tabs step_5 %}
{% tab step_5 code %}
```yaml
# Site settings
title: James Mount
email: myemal@example.com
description:  This is a dummy website that is part of James Mount's website building guide.
baseurl: "/building_a_static_website_part_2" # the subpath of your site, e.g. /blog
url: "https://jamesmount.tech" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jmount1992
github_username:  jmount1992

timezone: Australia/Brisbane

# Build settings
remote_theme: mmistakes/minimal-mistakes@4.24.0
plugins:
  - jekyll-remote-theme
  - jekyll-seo-tag
  - jekyll-include-cache

# Minimal Mistakes - Site Author Configuration
author:
name: "James Mount"
bio: "I am a human being."
location: "Somewhere"
links:
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: "mailto:myemail@example.com"
    - label: "Twitter"
      icon: "fab fa-fw fa-twitter-square"
      url: "https://twitter.com/jmount1992"
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. Copy the following into `index.md`.

{% tabs step_6 %}
{% tab step_6 code %}
```markdown
---
layout: single
author_profile: true
excerpt: "This page should display a **header with an overlay image**, if the theme supports it."
header:
  overlay_image: /assets/images/unsplash-image-1.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  actions:
    - label: "More Info"
      url: "https://unsplash.com"
---

# Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ipsum sit amet leo tristique venenatis. Nunc porttitor feugiat gravida. Suspendisse pharetra ac risus id venenatis. Proin tempus eget arcu et euismod. Sed nec eros fermentum, consequat nisi non, dictum velit. Mauris diam ante, consequat vel hendrerit id, ultrices et nibh. Cras a dolor suscipit, aliquam nulla et, lacinia libero.
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Add a `_data/navigation.yml` file with the following contents:

{% tabs step_7 %}
{% tab step_7 code %}
```yaml
main:
  - title: About
    url: /about
```
{% endtab %}
{% endtabs %}

{:start="5"}
5. Download the splash [image](/assets/images/posts/customising_themes/unsplash-image-1.jpg) and save it to `/assets/images/unsplash-image-1.jpg` within the website's root directory.

{:start="6"}
6. As we touched the configuration and gemfile. Rebuild and serve the website locally, and check out the results.

The information for what to add into `_config.yml`, `index.md`, and `_data/navigation.yml`, came from reading the minimal mistakes documentation. You should read the documentation associated with the theme. It will help you understand what it can be used for and, how much hacking you would need to do for it to fit your purpose. Speaking of hacking, let's revert the previous steps to go back to the Cayman theme and hack that theme a little bit to better suit our purposes. To revert:

1. Change the remote theme in tag in the `_config.yml` back to: `remote_theme: pages-themes/cayman@v0.2.0`
2. In `index.md` comment out or delete the front matter associated with the minimal mistakes theme and set the layout to `default`. It should look something like this:

{% tabs step_8 %}
{% tab step_8 code %}
```markdown
---
layout: default
---

# Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ipsum sit amet leo tristique venenatis. Nunc porttitor feugiat gravida. Suspendisse pharetra ac risus id venenatis. Proin tempus eget arcu et euismod. Sed nec eros fermentum, consequat nisi non, dictum velit. Mauris diam ante, consequat vel hendrerit id, ultrices et nibh. Cras a dolor suscipit, aliquam nulla et, lacinia libero.
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. You will need to rebuild and serve the website to see the changes locally.


# Hacking Themes

Okay now that we are back to our Cayman theme. Let's get hacking. Firstly, we should create a navigation bar, as we want separate pages. If you read the theme's documentation, or check out the preview, you will notice it has three download buttons. We don't want these downloads, but we can use something like these buttons as our navigation.

1. First, copy the standard theme default html into `_layouts/default.html`. As we are using the remote-theme, it may be a bit annoying to use the `bundle info --path <theme>` to find the local copy of the files. You can do it, it's just a little tedious. Instead, the easiest way is to simply download the file from the [github repo](https://github.com/pages-themes/cayman). You can either do this manually, or use something like curl. The following curl command assumes you are in the website's root directory folder.

{% tabs step_9 %}
{% tab step_9 Ubuntu %}
```bash
curl https://raw.githubusercontent.com/pages-themes/cayman/master/_layouts/default.html --create-dirs -o _layouts/default.html
```
{% endtab %}

{% tab step_9 Mac %}
```bash
curl https://raw.githubusercontent.com/pages-themes/cayman/master/_layouts/default.html --create-dirs -o _layouts/default.html
```
{% endtab %}

{% tab step_9 Windows %}
```bash
curl https://raw.githubusercontent.com/pages-themes/cayman/master/_layouts/default.html --create-dirs -o _layouts/default.html
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. In `_layouts/default.html` replace lines 21 to 27 with: 

{% tabs step_10 %}
{% tab step_10 code %}
```
{% raw %}{% include navigation.html %}{% endraw %}
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. Create a `_includes/navigation.html` file and add the following code. Okay so you might need to write some HTML, CSS, or Javascript, if you wish to hack a theme. Also, note we are using the `_data/navigation.yaml` file we previously created for when we explored the Minimal Mistakes theme.

{% tabs step_11 %}
{% tab step_11 code %}
```html
{% raw %}<nav>
    <a href="{{site.baseurl}}/" class="btn">Home</a>
    {% for item in site.data.navigation.main %}
    <a href="{{site.baseurl}}{{ item.url }}" class="btn">{{ item.title }}</a>
    {% endfor %}
</nav>{% endraw %}
```
{% endtab %}
{% endtabs %}

Check out the results locally (re-serve the website if required). You should now have a navigation bar that is easily maintainable and expandable.

# Congratulations

You should now have everything you need to know to create a pretty fantastic static website. Remember Google is your friend, but the best place to get started is the [Jekll documentation](https://jekyllrb.com/docs/). To start building your own site I would recommend you:

1. Define the purpose of your website. Is it a simple website just to have a digital resume? Do you want to write posts? Do you want a separate page for listing your projects and upcoming presentations?
2. Once you have an idea of your website's purpose, sketch out on paper how you want your site to look. You might use one piece of paper per page and use blocks to show where component groups will go. For example, where your navigation bar will be, where content will go, etc.
3. Once you are happy with the purpose and have a rough idea of how your content should be displayed, have a look through various themes to see if any align well with what you want. This might take some time as there are hundred of themes out there and, it is good to quickly skim theme documentation or preview its sample site. However, don't worry too much, you can change themes at a later date, albeit it will require some work.
4. Once you are happy with all that, get cracking.

In the next article we will look at how we can easily deploy our website using Github Pages and make it available on the internet.