---
title: Media and Events
permalink: /media_events/
---

<div class="feature__wrapper">
    {% assign sorted_media = site.media_and_events | sort: 'date' | reverse %}
    {% for f in sorted_media %}
        {% include feature_item.html type="left" %}
    {% endfor %}
</div>