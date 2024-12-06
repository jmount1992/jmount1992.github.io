---
title: "Building A Static Website - Part 1: Learning Jekyll"
categories:
  - Website Building
tags:
  - jekyll
  - markdown
  - tutorial
excerpt: Gain an understanding of why we use static site generators and work your way through a step-by-step guide on how to build your first static website with Jekyll.
last_modified_at: 2024-12-06
---

This tutorial will first explain the reasoning behind using a static site generator, specifically Jekyll, before providing a step-by-step guide on how to create your first static website using Jekyll. You can find a working example of the final product [here](https://jamesmount.tech/building_a_static_website_part_1/) as well as the complete code within this [repository](https://github.com/jmount1992/building_a_static_website_part_1).

This is the first article in the static website building series. 

**Prerequisites**: Familiarity with using your operating system's terminal, an understanding of how the web works, and some knowledge of HTML, CSS, and JavaScript is recommended. Feel free to check out the [Understanding The Web]({% post_url 2023-03-15-UnderstandingTheWeb %}) article to gain some insights on how the web works.


# A Static Website

In the [Understanding The Web](UnderstandingTheWeb) we discussed the basics of the web. HTML, CSS, and Javascript were also briefly mentioned. You may have heard of these three software langauges previously. These languages are the backbone of websites. They are what we call client-side, or front-end, web languages. They each have a specific purpose. HTML is used for both the websites content and structure. CSS is used for both structure and style/visuals. Javascript is responsible for the client-side behaviour.

![Web Languages](/assets/images/posts/a_static_website/web-languages.png){: .align-center}

To create a static website from scratch we would have to:

1. Write HTML, CSS, and Javascript to get the write content, structure, and website behaviour.
2. Choose a file hosting service. For example,
    - An AWS instance (this would cost money), or
    - Use your own PC (opening your PC up to the world might bring about some security concerns).
3. Deploy our website to the file hosting service.
4. Setup a web-server, like NGINX. This would include:
    - Setting up security certificates (SSL) as we probably would want HTTPS; and
    - Listening to requests.
5. Register and setup up the domain with a DNS service.
6. Establish some form of traffic reporting (optional).
7. And possibly a few other steps.

As you can see there are quite a lot of steps, especially, when you probably want to get up and running quickly and want to focus on content. We could make our life a little easier by using a website template that already has HTML, CSS, and Javascript alongside Github Pages. However, even then we are still writing in HTML, which still isn't as natural as writing a word document. We would also still have to do pagination, navigation bars, latest post links, etc. This can make it cumbersome and quite painful. Instead we could use what is known as a static site generator.

**Note**: You could also use a website builder such as Wix or WordPress. Most domain name registraion services, such as [GoDaddy](https://www.godaddy.com/), provide website building capabilities. However, what if we want to be cheap and not have to pay for the service?

# Static Site Generators

A static site generator is a script(s) that takes in content and templates, and you guessed it, generates a static website (HTML, CSS, Javascript). They allow us to focus primarily on the content rather than style and behaviour. They still have their disadvantages, but overall they are pretty good, and work well with services such as Github Pages. There are plenty of static site generators.

![Web Languages](/assets/images/posts/a_static_website/site-generators.png){: .align-center}

## Jekyll

Jekyll is one of many static site generators. However, Github Pages utilises Jekyll and hence why we will be using it today. Jekyll uses the Ruby programming language, but don't worry, we don't need to actually write anything in Ruby. Jekyll takes in Markdown files (our content), plus templates consisting of Liquid, HTML, CSS, and Javascript to generate static websites.

## Ruby 101

Ruby is a programming language. In the Ruby language you will hear a lot about Gems. Gems are reusable pieces of code. If you know Python or C/C++ you might think of these as modules or libraries. A Gemfile is a list of gems required by a project, similar to a Python requirements file or a set of included C/C++ header files. There is a special Gem called *Bundler*. Bundler is like Python's pip, it is used to install a gemfile, but can also be used to execute Gems using the current environment (like a virtual environment). More info on Bundler and Gemfiles can be found in later in the [article](#a-little-more-about-bundler-and-gemfiles). 

# Creating Your First Website

Okay, that was a really quick intro into the tools we will be using and why we are using them. However, I always find it best to dive in to start learning. So let's get started in creating a basic static website. The result won't be aesthetically pleasing, however, it is important you work through these steps as they introduce you to the concepts within Jekyll and will ultimately help you in the long run. The next article will help you beautify your website using themes, but understanding themes, can be quite difficult if you don't understand the basics. So I encourage you to work through these steps carefully, making sure you take your time.

**Note**: Code is included for you to copy and paste into a terminal to help speed up the process. Or if you aren't familiar with the terminal on your operating system, use whatever process you wish to perform the steps.

## Install Ruby and Jekyll

Visit the [Jekyll Installation](https://jekyllrb.com/docs/installation/) page and install Ruby, Jekyll, and Bundler as per the instructions for your operating system. You will know you have succeeded once you can run `jekyll -v` in a terminal and it returns the Jekyll version installed.

## Creating Your First Page

1. Create a directory to hold all the files and navigate into that directory. We refer to this directory as the `root` directory. You can call it whatever you would like.

{% tabs step_1a %}
{%tab step_1a Ubuntu %}
```bash
mkdir <my-website-folder> && cd <my-website-folder>
```
{% endtab %}

{%tab step_1a MacOS %}
```bash
mkdir <my-website-folder> && cd <my-website-folder>
```
{% endtab %}

{%tab step_1a Windows %}
```bash
mkdir <my-website-folder> && cd <my-website-folder>
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. Create a gemfile.

{% tabs step_2a %}
{%tab step_2a Ubuntu %}
```bash
touch gemfile
```
{% endtab %}

{%tab step_2a MacOS %}
```bash
touch gemfile
```
{% endtab %}

{%tab step_2a Windows %}
```bash
copy Gemfile+
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. Add the following to the Gemfile. We will talk about the Gemfile and its contents later.

{% tabs step_3a %}
{% tab step_3a code %}
```ruby
source "https://rubygems.org"
gem "jekyll", "~> 4.3.2"

# If you are on a Windows machine will also need to add
# the following lines, adding them on Ubuntu and MacOS machines
# isn't required but shouldn't hurt
gem "webrick", "~> 1.7"
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Install the gems.

{% tabs step_4a %}
{%tab step_4a Ubuntu %}
```bash
bundle install
```
{% endtab %}

{%tab step_4a MacOS %}
```bash
bundle install
```
{% endtab %}


{%tab step_4a Windows %}
```bash
bundle install
```
{% endtab %}
{% endtabs %}


{:start="5"}
5. Create an index markdown file `index.md` to act as the homepage.

{% tabs step_5a %}
{%tab step_5a Ubuntu %}
```bash
touch index.md
```
{% endtab %}

{%tab step_5a MacOS %}
```bash
touch index.md
```
{% endtab %}

{%tab step_5a Windows %}
```bash
copy index.md+
```
{% endtab %}
{% endtabs %}


{:start="6"}
6. Add the following code to index.md. Any code between the two sets of `---` are what is called front matter. Jekyll will only process any markdown files that contain front matter. 

{% tabs step_6a %}
{% tab step_6a code %}
```markdown
---
---
# My Website 
Welcome to my website!
```
{% endtab %}
{% endtabs %}

{:start="7"}
7. Locally build and serve your website. The `--livereload` will automatically rebuild and serve the website if we make any changes to any of the content files. However, if our changes result in a bad state you may need to kill and restart the process.

{% tabs step_7a %}
{%tab step_7a Ubuntu %}
```bash
bundle exec jekyll serve --livereload
```
{% endtab %}

{%tab step_7a MacOS %}
```bash
bundle exec jekyll serve --livereload
```
{% endtab %}

{%tab step_7a Windows %}
```bash
bundle exec jekyll serve --livereload
```
{% endtab %}
{% endtabs %}

You should now be able to go to the IP address and port outputted by the command above in a browser to view your website. Most likely the address will be `127.0.0.1:4000`. If you cannot view it, see if there are any errors outputted by the above command, and work your way through them with the help of online sources. 

**Note**: A locally served website is one that is only visible to you, and maybe your local network depending on your network settings. In a future article within this series we will talk about deploying your website and making it accessible by anyone with an internet connection.

## Adding Additional Pages by using Layouts, Includes, and Data

An important aspect of Jekyll is using HTML templates. Jekyll calls these HTML templates layouts and will import your content (markdown) into these templates. 

1. Create a `_layouts` folder in the root directory of the website and create a file called `default.html`.

{% tabs step_1b %}
{%tab step_1b Ubuntu %}
```bash
mkdir _layouts && touch _layouts/default.html
```
{% endtab %}

{%tab step_1b MacOS %}
```bash
mkdir _layouts && touch _layouts/default.html
```
{% endtab %}

{%tab step_1b Windows %}
```bash
mkdir _layouts && copy _layouts/default.html+
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. Add the following code to `_layouts/default.html` file. The `{% raw %}{{ }}{% endraw %}` and `{% raw %}{% %}{% endraw %}` are Liquid syntax for objects and tags respectively. Objects contain content to be displayed on the page. Tags create logic and control flow for templates. Here we are getting the page title and content objects, as well as including the `navigation.html` file (we will create this file in the next steps). Hold up, didn't we say the whole point of using a static site generator was to get away from writing HTML, CSS, and Javascript? Well yes, we will see in Part 2 of this series we can leverage themes which already have HTML, CSS, and Javascript. However, for now we want to focus on Jekyll specifically rather than having to understand the nuances of a theme and Jekyll at the same time.

{% tabs step_2b %}
{% tab step_2b code %}
```html
{% raw %}<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ page.title }}</title>
    </head>
    <body>
        {% include navigation.html %}
        <hr>
        {{ content }}
    </body>
</html>{% endraw %}
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. Create a folder called `_includes` and add a file called `navigation.html`. Includes are snippets that can be used elsewhere. This also helps avoid duplication. Here we will use it for navigation and include it, else we would have to write a navigation menu on each page.

{% tabs step_3b %}
{%tab step_3b Ubuntu %}
```bash
mkdir _includes && touch _includes/navigation.html
```
{% endtab %}

{%tab step_3b MacOS %}
```bash
mkdir _includes && touch _includes/navigation.html
```
{% endtab %}

{%tab step_3b Windows %}
```bash
mkdir _includes && copy _includes/navigation.html+
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Add the following code to `_includes/navigation.html`.

{% tabs step_4b %}
{% tab step_4b code %}
```html
{% raw %}<nav>
    {% for item in site.data.navigation %}
    <a href="{{ item.link }}">{{ item.name }}</a>
    {% endfor %}
</nav>{% endraw %}
```
{% endtab %}
{% endtabs %}

{:start="5"}
5. In the code above we are referring to the object `site.data.navigation`. Jekyll supports loading of data from various file types such as YAML, JSON, and CSV. These files must be located in the data directory. Create the `_data` directory and a file called `navigation.yml`. More information on Jekyll variables can be found [here](https://jekyllrb.com/docs/variables/).

{% tabs step_5b %}
{%tab step_5b Ubuntu %}
```bash
mkdir _data && touch _data/navigation.yml
```
{% endtab %}

{%tab step_5b MacOS %}
```bash
mkdir _data && touch _data/navigation.yml
```
{% endtab %}

{%tab step_5b Windows %}
```bash
mkdir _data && copy _data/navigation.yml+
```
{% endtab %}
{% endtabs %}

{:start="6"}
6. In the `_data/navigation.yml` file add the following code. We will add additional links as we add pages to our site.

{% tabs step_6b %}
{% tab step_6b code %}
```yaml
- name: Home
  link: /
```
{% endtab %}
{% endtabs %}

{:start="7"}
7. In `index.md` add `layout: default` to the front matter. Your `index.md` file should now look like this.

{% tabs step_7b %}
{% tab step_7b code %}
```markdown
---
layout: default
---
# My Website
Welcome to my website!
```
{% endtab %}
{% endtabs %}

{:start="8"}
8. You should see `Home` at the top of your website. If not, you may need to rerun the jekyll build and serve command.

{% tabs step_8b %}
{%tab step_8b Ubuntu %}
```bash
bundle exec jekyll serve --livereload
```
{% endtab %}

{%tab step_8b MacOS %}
```bash
bundle exec jekyll serve --livereload
```
{% endtab %}

{%tab step_8b Windows %}
```bash
bundle exec jekyll serve --livereload
```
{% endtab %}
{% endtabs %}

{:start="9"}
9. Okay, now let's see how easy it is too add pages. Create a page called `about_me.md` and `projects.md` in the root directory.

{% tabs step_9b %}
{%tab step_9b Ubuntu %}
```bash
touch about_me.md && touch projects.md
```
{% endtab %}

{%tab step_9b MacOS %}
```bash
touch about_me.md && touch projects.md
```
{% endtab %}

{%tab step_9b Windows %}
```bash
copy about_me.md+ && copy projects.md+
```
{% endtab %}
{% endtabs %}

{:start="10"}
10. Add the following code to `about_me.md`

{% tabs step_10b %}
{% tab step_10b code %}
```markdown
---
layout: default
---
# About Me
Here are some interesting facts about me.
```
{% endtab %}
{% endtabs %}

{:start="11"}
11. Add the following code to `projects.md`

{% tabs step_11b %}
{% tab step_11b code %}
```markdown
---
layout: default
---
# Prjects
Here are my projects.
```
{% endtab %}
{% endtabs %}

{:start="12"}
12. Add each page to the navigation bar by adding the appropriate details into `_data/navigation.yaml`, the file shoud look something like this.

{% tabs step_12b %}
{% tab step_12b code %}
```yaml
- name: Home
  link: /
- name: About Me
  link: /about_me
- name: Projects
  link: /projects
```
{% endtab %}
{% endtabs %}

You should now have a website that has three pages, each with a navigation bar at the top. Hopefully, you can see the potential of building websites using Jekyll templates.

## Blogging with Jekyll

Jekyll was originally created for blogging. As a result, Jekyll uses the special `_posts` directory along with a specific naming format for markdown files contained within the posts folder. Markdown files within the posts folder must use the format `yyyy-mm-dd-<title>.md`. 

1. Create a post directory and add two files, replacing `<date>` with today's date.

{% tabs step_1c %}
{%tab step_1c Ubuntu %}
```bash
mkdir _posts && touch _posts/<date>-pub1.md && touch _posts/<date>-pub2.md
```
{% endtab %}

{%tab step_1c MacOS %}
```bash
mkdir _posts && touch _posts/<date>-pub1.md && touch _posts/<date>-pub2.md
```
{% endtab %}

{%tab step_1c Windows %}
```bash
mkdir _posts && copy _posts/<date>-pub2.md+ && copy _posts/<date>-pub2.md+
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. Add the following code to each post, changing the `<number>` to 1 and 2 respectively.

{% tabs step_2c %}
{% tab step_2c code %}
```markdown
---
title: Post <number>
---
The few lines will be the excerpt for post <number>.

This second paragraph has some more information.
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. You may have noticed we didn't include the `layout` key within the front matter. We are going to create a new layout for our posts as we want them to look slightly different from our main pages. Create the file `_layout/post.html` and add the following code. Here we are using front matter to inherit the default layout. 

{% tabs step_3c %}
{% tab step_3c code %}
```html
---
layout: default
--- {% raw %}
<h1>{{ page.title }}</h1>

<p>
{{ page.date | date_to_string }}
{% if page.author %}
    - Written by {{ page.author }}
{% endif %}
</p>

{{ content }}{% endraw %}
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Instead of adding `layout: post` to each post, we can use a configuration file with predefined defaults. Create a `_config.yml` file in the root directory and add the following code. The first set here is saying that all files within the `_posts` directory should use the layout `post` and the default author is set to `Jane Bloggs`. The second set is saying all pages, that aren't contained within the posts folder, should use the `default` layout. If you wanted you could go and remove the layout key from our existing pages. Whenever, you make changes to the Jekyll configuration file you will need to restart the website server to see the affects. Additional information on front matter defaults can be found [here](https://jekyllrb.com/docs/configuration/front-matter-defaults/). 

{% tabs step_4c %}
{% tab step_4c code %}
```yaml
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Jane Bloggs"
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "default"
```
{% endtab %}
{% endtabs %}

{:start="5"}
5. The deployment article within this static website building series utilises Github Pages for serving your website. Github page servers are most likely not located within your time zone. This can lead to some odd things happening. You should also add your time zone to the configuration file. For example, if you are from Brisbane, Australia, you would add the following code `timezone: Australia/Brisbane` to `_config.yml`. You can find a list of time zones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Remember, as we made changes to the configuration file you will need to reserve the website.

{:start="6"}
6. Now we need a page to display and link to our individual posts. Create a new page, called `posts.md` in the root directory of the website and add the following code. Make sure you also add the appropriate entry into the `navigation.yml` file. In the code below, you can see that we access the posts using the code `site.posts` which can be used, along with a for loop, to cycle through the posts and display the title and excerpt of each post.

{% tabs step_6c %}
{% tab step_6c code %}
```markdown
---
---
{% raw %} # My Posts 

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url }})
{{ post.excerpt }}
{% endfor %} {% endraw %}
```
{% endtab %}
{% endtabs %}

Okay that is enough about blogging. Posts are effectively a special type of what Jekyll calls *Collections*. We can use [collections](https://jekyllrb.com/docs/step-by-step/09-collections/) to our advantage when things belong to the same group, projects for example.

## Using Collections

1. To create a collection make a folder using the format `_<collection_name>` and add this collection name to our configuration file under the `collections` key. In this example, create a folder called `_projects` within the root website directory and add the following code to your configuration file. 

{% tabs step_1d %}
{% tab step_1d code %}
```yaml
collections:
  projects:
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. In the projects folder create two markdown files called `project1.md` and `project2.md`. You will notice that we don't require a special naming convention like posts. 

{:start="3"}
3. Copy the following into each of the project markdown files, replacing the `<number>` with the appropriate value.

{% tabs step_3d %}
{% tab step_3d code %}
```markdown
---
title: Project <number>
project_url: https://jamesmount.tech/
description: A short description about the project.
---
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Change the `projects.md` file to act as a "homepage" for your projects by creating a list linking to each project. We are assuming here that each project has a page outside of your website, for example it could be a link to a Github repository, or an article.

{% tabs step_4d %}
{% tab step_4d code %}
```markdown
{% raw %}---
---
# My Projects

{% for project in site.projects %}
## [{{ project.title }}]({{ project.project_url }})
{{ project.description }}
{% endfor %}{% endraw %}
```
{% endtab %}
{% endtabs %}

Restart the local webserver, as we made changes to the configuration file, and see the changes. That is how easy it is to use collections and to quickly build lists of projects, publications, reviews, or whatever really. We could even go a step further and make a page for each project within our website, similar to a post. However, we won't do that here.


## Improving the Aesthetic

The website is fairly bland. There are no pictures, colours, or dynamic behaviour. We can create these using CSS, and JavaScript. Javascript, and CSS, as well as images, are known as assets and are placed in an assets folder. Jekyll utilise [Sass](https://sass-lang.com/) which is an extension of CSS. We will utilise Sass to improve the aesthetic of the website.

1. Create a folder called `_sass` in the root directory and add a `main.scss` file with the following code. This code will make the font size of each navigation bar item larger and all `<h1>` headings to be coloured green.

{% tabs step_1e %}
{% tab step_1e code %}
```css
h1 {
    color: green;
}

.navbar-item {
    font-size: 1em;
}
```
{% endtab %}
{% endtabs %}

{:start="2"}
2. Create a directory called `assets`, and then create a `css` folder within the new assets folder. Copy the following code into a Sass file located at `assets/css/styles.scss`. Remember, Jekyll requires front-matter in order to know the file needs to be processed. This code tells Sass to look for a file called `main.scss` located in the `_sass` folder.

{% tabs step_2e %}
{% tab step_2e code %}
```css
---
---
@import "main";
```
{% endtab %}
{% endtabs %}

{:start="3"}
3. We need to reference this style sheet within our HTML layouts. Fortunately, as all sheets inherit from our default layout, we only need to add a single line. Add `<link rel="stylesheet" href="/assets/css/styles.css">` between the `<head>` and `</head>` tags in `_layouts/default.html`. The `_layouts/default.html` should now look like this.

{% tabs step_3e %}
{% tab step_3e code %}
```html
{% raw %}<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{{ page.title }}</title>
        <link rel="stylesheet" href="/assets/css/styles.css">
    </head>
    <body>
        {% include navigation.html %}
        <hr>
        {{ content }}
    </body>
</html>{% endraw %}
```
{% endtab %}
{% endtabs %}

{:start="4"}
4. Now update the `_includes/navigation.html` to use the new CSS class. Change `_includes/navigation.html` to the following code.

{% tabs step_4e %}
{% tab step_4e code %}
```html
{% raw %}<nav>
    {% for item in site.data.navigation %}
    <a href="{{ item.link }}" class="navbar-item">{{ item.name }}</a>
    {% endfor %}
</nav>{% endraw %}
```
{% endtab %}
{% endtabs %}

Feel free to restart the local website and view the changes. By using pre-existing themes we can leverage work already done by others to have an aesthetically pleasing website without having to spend vast quantities of time learning CSS and JavaScript. Thank you to those who have created the themes!

## A Little More About Bundler and Gemfiles

A Gemfile is a list of dependencies required by your Ruby project. Bundler is a special Gem and acts like a package manager and virtual environment. If you are familiar with Python and Pip, you can think of a Gemfile as being similar to a requirements.txt and Bundler akin to Pip. However, we can also use bundler to execute commands using the current environment by prefixing the command with `bundle exec`. If you wish, do the following.

1. Change the Gemfile to use a different version of Jekyll. For example, change it from `gem "jekyll", "~> 4.3.2"` to `gem "jekyll", "~> 3.9.1"`. 
2. Run `bundle install`.
3. Now in a terminal navigate to the website root directory and `run bundle exec jekyll -v`. You should get `Jekyll 3.9.1` printed to your terminal.
4. Go up one level within your terminal and run `jekyll -v`. You most likely will get `Jekyll 4.3.x` printed to your screen.

This little experiment shows how Bundler is used to run a specific version. Remember, to change your Gemfile back to use Jekyll 4.x. More information on Bundler and Gemfiles can be found in this [article](https://www.moncefbelyamani.com/the-beginner-s-guide-to-bundler-and-gemfiles/) written by Moncef Belyami.


# Going Further

Congratulations on creating your first static website. I know it is bland and it is only served locally, however, the next two articles in this series will overcome those minor details. This article was put together by reading the [Jekyll documentation](https://jekyllrb.com/docs/) and its [getting started guide](https://jekyllrb.com/docs/step-by-step/01-setup/). It is strongly encouraged you take some time to go through the Jekyll getting started guide as well the documentation.

If you are enjoying this three part series, please drop a comment, send a [message](/about_me/#contact_me), or share it with friends. If there is anything that you think can be improved, please drop a comment or send a [message](/about_me/#contact_me).