---
title: Research Publications
permalink: /publications/
---

{% assign sorted_pubs = site.publications | sort: 'date' | reverse %}
{% for pub in sorted_pubs %}
<p style="text-align: center; border-bottom: 2px solid #aaa; padding-bottom: 0.75em; margin: 0 12% 0.75em 12%;"><a href="{{ pub.paper_url }}" style="text-decoration: none; font-style: italic;">{{ pub.title }}</a><br>{{ pub.authors }}<br>{{ pub.conference }}<br>{{ pub.date | date: "%B %Y" }}</p>
{% endfor %}