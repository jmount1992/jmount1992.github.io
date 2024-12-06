---
title: "Building A Static Website - Part 3: Deployment with GitHub Pages"
categories:
  - Website Building
tags:
  - jekyll
  - markdown
  - github
  - tutorial
last_modified_at: 2024-12-06
---


While a local website might be useful, we ideally want to publish our website to the world.  This article will explore how you can utilise [GitHub Pages](https://pages.github.com/) to deploy your static website and make it available online.

This is the third article in the static website building series. 

**Prerequisites**: Familiarity with Git/GitHub, a GitHub account, and your operating system's terminal, as well as an understanding of how the web works, and some knowledge of static websites is recommended.

# Quick Guide on GitHub Pages, Repos, and URLs

Before we get started there is a critical component to understand about GitHub Pages. Each GitHub user and organisation gets one user/organisation website and can have an unlimited number of project websites. The name of the repository will dictate if it is your user/organisation website or a project website, and will affect the URL. For your user/organisation website, create a repository with the naming convention `<github_username>.github.io`. For project websites, you can call the repository whatever you feel like. A user website will result in the URL `<github_username>.github.io`, while project websites will have URLs of the form `<github_username>.github.io/<repo_name>`.

Okay now lets dive in!

# Deploying Your First Site

1. Create an empty GitHub repository.
2. Initialise the local version of your repository by navigating to the root directory of your website (the folder on your computer where your website files are stored).
3. Push your files to the empty remote repository.
4. Once the files are pushed, on the repository's GitHub page:
    1. Choose the `Settings` tab, located just beneath the repository header
    2. From the left hand side, select `Pages` under the *Code and Automation* section
    3. Set the source to: `Deploy from a branch`
    4. Set the branch to: `main`
    5. Leave the directory as: `/(root)`
    6. Click save
5. If your repository is using your user website it will now be live at `<github_username>.github.io` (or after a minute or so). If your repo is a project website, it will be live at `<github_username>.github.io/<repo_name>`.

GitHub is running a GitHub Action under the hood. If your website is not live in a few minutes check the actions tab in your repository. This will be your first port of call for debugging deployment. If it is reporting an error that you don't quite understand, it may be because GitHub Pages is running an outdated version of Jekyll. We will discuss that below.

# Using the Latest Jekyll

The GitHub Pages in-built deployment action (which is what we used above) uses an outdated version of Jekyll; at the time of writing this article. Meaning the version of Jekyll you are running locally on your PC, may not be the version of Jekyll that is being used to build and serve your website via GitHub Pages. Obviously, this can lead to differences, which we don't want. However, before we discuss how to fix that, we will quickly recap Gemfiles and Bundler in the context of GitHub Pages to help us be confident in knowing that our local development environment (our PC) and our deployment environment (GitHub Pages) are aligned.

## A Little More About GitHub Pages, Gemfiles, and Bundler

We discussed Gemfiles and Bundler back in the [first article]({% post_url 2023-03-18-BuildingAStaticWebsite_Part1 %}) of this series. However, a quick recap shouldn't hurt.

A Gemfile is a list of dependencies required by your Ruby project. Bundler is a special Gem and acts like a package manager and virtual environment. If you are familiar with Python and Pip, you can consider Gemfiles being similar to requirements.txt files and Bundler similar to Pip. However, Bundler is also used to execute commands using the current environment by prefixing the command with `bundle exec`. 

Now onto GitHub Pages specifically. When using the in-built GitHub Pages action (the one used above) it utilises Jekyll 3.9.x, as it is built using the [github-pages](https://github.com/github/pages-gem) Gem which has a dependency on Jekyll 3.9.x. Meaning we couldn't utilise Jekyll version 4+. And we typically want to be using the latest. Additionally, by using the github-pages Gem we are also restricting ourselves to specific themes. So, by using the in-built deployment action, we are most likely utilising a different version of Gems in our local development environment (our PC) and our deployment environment (GitHub Pages). In some cases this won't cause an issue. However, in others it most certainly will lead to headaches if you aren't aware of this fact. Fortunately, we can easily make use of [GitHub Actions](https://github.com/features/actions) to ensure these environments are identical.

It is important to note, you are free to stick to using the github-pages Gem. Using this Gem does make it easy for deployment. Although, you should change your Gemfile to utilise the github-pages Gem (see the [Pages-Gem ReadMe](https://github.com/github/pages-gem) for more details on what changes need to be made). However, it isn't hard to set up your own action.

## Using Custom GitHub Actions
Originally when GitHub Pages was released in 2008, the build and deploy process was quite obscure and hard to debug when things went wrong. However, the release of GitHub Actions, in 2018, allowed for automatic build and deployment pipelines. GitHub Pages started using GitHub Actions in December 2021 for all public repositories. And, it is actually quite simple to create a custom action.

1. First create the path `.github/workflows` within the root directory of the website.
2. Go to the [pages starter-workerflows](https://github.com/actions/starter-workflows/tree/main/pages) provided by GitHub Actions (this is a great place to look for starting points for other actions too).
3. Copy the contents of the `jekyll.yml` into `.github/workflows/jekyll.yml` in your website directory.
4. In your copy of the workflow, change `[$default-branch]` to `main`. This tells it to run the workflow on pushes to main. This is assuming your main branch is called main, and not master or something else. Additionally, if the default branch setting within your repository is set correctly, you can leave it as `[$default-branch]`
5. In your repository online, go to the Settings Tab, then the Pages section, and change the source to GitHub Actions.
6. Push your changes to the remote repository. If you go to the Actions tab on the repository you should see the new Action running, and after a minute or so, your site will be live.

Simple! We are now using the same Gemfile for our local development and deployment environments. You can check out either repo of the dummy websites used in the previous two articles as an example. They can be found [here](https://github.com/jmount1992/building_a_static_website_part_1) and [here](https://github.com/jmount1992/building_a_static_website_part_2). 

# Project Webpages - Configuring the BaseURL Variable

If you are using a project website you might find the links on the live site are not working. You might be getting a 404 error or a redirection to a page you weren't expecting to see. This is because we need to set the `baseurl` configuration variable correctly. Some initial information detailing baseurl can be found [here](https://jekyllrb.com/docs/upgrading/0-to-2/#baseurl).

1. In `_config.yml` add the line: `baseurl: /<repo_name>`
2. In your layout and include files, change any links to utilise the baseurl variable. For example, stylesheet links would become `{% raw %}<link rel="stylesheet" href="{{site.baseurl}}/assets/css/styles.css">{% endraw %}` and anchor links would become `{% raw %}<a href="{{site.baseurl}}{{ item.link }}" class="navbar-item">{{ item.name }}</a>{% endraw %}`
4. In your markdown files include the baseurl variable where required. For example, `{% raw %}## [{{ post.title }}]({{ post.url }}){% endraw %}` would become to `{% raw %}## [{{ post.title }}]({{ site.baseurl }}{{ post.url }}){% endraw %}`.
5. Test the website locally by re-serving the website and making sure everything looks good (links and styles).
6. Push the changes to GitHub and check the live page.

# Wrapping Up

Congrats! You now have a live static website that is easy to update! You have touched on a lot of different technologies and subjects throughout this series incluing: internet/website basics, various languages (Markdown, Liquid, JavaScript, HTML, CSS), Git and GitHub, and the Jekyll framework. Don't be too worried if you are still a little confused on certain aspects (please let me know though where things can be improved). However, I personally find the best way to learn is through doing. So go create something wonderful. 

If you enjoyed this three part series, please drop a comment, send a [message](/about_me/#contact_me), or share it with friends. If there is anything that you think can be improved, please drop a comment or send a [message](/about_me/#contact_me).


