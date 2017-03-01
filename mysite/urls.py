"""mysite URL Configuration

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
from django.conf.urls import url, include
from django.contrib import admin
from trust.views import index, usermanagement

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^index/page/(\d+)/$', index.index),
    url(r'^index/$',index.redirect),
    url(r'^$',index.redirect),
    url(r'^index/edit/$',index.edit),
    url(r'^index/delete/$',index.delete),
    url(r'^index/detail/(\d+)/$', index.detail),
    #url(r'^index/newtask/$',newtask.newtask)
]

urlpatterns += [

    url(r'^login/$', usermanagement.login, name = 'login'),
    url(r'^regist/$', usermanagement.regist, name = 'regist'),
    url(r'^logout/$', usermanagement.logout, name = 'logout'),
]
