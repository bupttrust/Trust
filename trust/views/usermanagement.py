#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2016-06-13 14:59:03
# @Last Modified by:   anchen
# @Last Modified time: 2016-06-25 19:54:06
#coding=utf-8
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
from django import forms
from trust.models import Users
from django.template import Context
from django.views.decorators.csrf import csrf_exempt

#表单
class UserForm(forms.Form): 
    username = forms.CharField(label='用户名',max_length=100)
    password = forms.CharField(label='密码',widget=forms.PasswordInput())


#注册
@csrf_exempt
def regist(req):
    if req.method == 'POST':
        uf = UserForm(req.POST)
        if uf.is_valid():
            #获得表单数据
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #添加到数据库
            Users.objects.create(name= username, password=password, level= 1)
            #return HttpResponse('regist success!!')
            return render_to_response("users/register.html")
    else:
        uf = UserForm()
	#return render_to_response('users/register.html',{'uf':uf}, context_instance=RequestContext(req))
    return render_to_response('users/register.html',{'uf':uf})


#登陆
@csrf_exempt
def login(req):
    print '#' * 30
    context = Context()
    if req.method == 'POST':
        uf = UserForm(req.POST)
        if uf.is_valid():
            #获取表单用户密码
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            #获取的表单数据与数据库进行比较
            user = Users.objects.filter(name__exact = username,password__exact = password)
            user1 = Users.objects.filter(name__exact = username)
            if user:
                #比较成功，跳转index
                response = HttpResponseRedirect('/')
                req.session['username'] = username
                return response
            elif user1:
                #比较失败，还在login
                context['passwordError'] = "密码错误"
                return render_to_response("users/login.html", context)
            else:
                context['userError'] = "用户不存在"
                return render_to_response("users/login.html", context)
    else:
        uf = UserForm()
    return render_to_response('users/login.html',context)

#退出
@csrf_exempt
def logout(req):

    response = HttpResponseRedirect('/login/')
    #清理cookie里保存username
    response.delete_cookie('sessionid')
    del req.session['username']
    return response
