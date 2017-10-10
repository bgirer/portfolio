"""portfolio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib.sitemaps.views import sitemap, index
from portfolio.sitemaps import StaticSitemap
from portfolio.views import TemplateWithFormView, SmallContactFormView
from django.views.generic import TemplateView

sitemaps = {
    'static': StaticSitemap
}

urlpatterns = [
    # Core
    url(r'^$', TemplateWithFormView.as_view(template_name='home.html'), name='home'),
    url(r'^about/$', TemplateWithFormView.as_view(template_name='about.html'),
        name='about'),
    url(r'^small-form/$', SmallContactFormView.as_view(), name='small-form'),
    url(r'^robots.txt$', TemplateView.as_view(template_name='robots.txt'),
        name='robots'),
    # Sitemap
    url(r'^sitemap.xml$', index,
        {'sitemaps': sitemaps, 'sitemap_url_name': 'sitemaps'}),
    url(r'^sitemap-(?P<section>.+)\.xml$', sitemap, {'sitemaps': sitemaps},
        name='sitemaps'),
    # Projects
    url(r'^projects/design/upsell-realtor/$',
        TemplateWithFormView.as_view(
                template_name='projects/design/upsell-realtor.html'),
        name='upsell-realtor'),
    url(r'^projects/design/snapnote/$',
        TemplateWithFormView.as_view(template_name='projects/design/snapnote.html'),
        name='snapnote'),
    url(r'^projects/design/casa/$',
        TemplateWithFormView.as_view(template_name='projects/design/casa.html'),
        name='casa'),
    url(r'^projects/dev/dayton/$',
        TemplateWithFormView.as_view(template_name='projects/dev/dayton.html'),
        name='dayton'),
    url(r'^projects/dev/san-diego-real-estate-experts/$',
        TemplateWithFormView.as_view(template_name='projects/dev/sdree.html'),
        name='sdree'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [url(r'^__debug__/', include(debug_toolbar.urls)), ] + urlpatterns


# handler400 = 'portfolio.views.bad_request'
# handler403 = 'portfolio.views.permission_denied'
# handler404 = 'portfolio.views.page_not_found'
# handler500 = 'portfolio.views.server_error'
