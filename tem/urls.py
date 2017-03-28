from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.sites.models import Site

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    url(r'^user/', include('main.urls', namespace='main')),
)
