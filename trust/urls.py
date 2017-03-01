# -*- coding:utf-8 -*-
#
#        Author : TangHanYi
#        E-mail : thydeyx@163.com
#   Create Date : 2017-02-27 03:53:36 PM
# Last modified : 2017-03-01 09:54:12 AM
#     File Name : urls.py
#          Desc :
from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls import *
from trust.views import index, usermanagement

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

#	url(r'^index/page/(\d+)/$', index.index),
#
#    url(r'^index/$',index.redirect),
#    url(r'^$',index.redirect),
#    url(r'^index/edit/$',index.edit),
#    url(r'^index/delete/$',index.delete),
#    url(r'^index/detail/(\d+)/$', index.detail),
#    url(r'^index/newtask/$',newtask.newtask)
]


urlpatterns += [
    url(r'^login/$', usermanagement.login, name = 'login'),
    url(r'^regist/$', usermanagement.regist, name = 'regist'),
    url(r'^logout/$', usermanagement.logout, name = 'logout'),
]

