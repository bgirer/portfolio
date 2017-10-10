from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class StaticSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return ['home', 'about', 'dayton', 'sdree', 'upsell-realtor', 'snapnote', 'casa']

    def location(self, item):
        return reverse(item)
