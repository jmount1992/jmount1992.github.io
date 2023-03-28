---
title: Projects
permalink: /projects/
---

<div class="feature__wrapper">
    {% assign sorted_projects = site.projects | sort: 'priority' %}
    {% for f in sorted_projects %}
        {% if f.enabled %}
            {% include feature_item.html type="left" %}
        {% endif %}
    {% endfor %}
</div>