#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2015-10-21 09:54:45
# @Last Modified by:   anchen
# @Last Modified time: 2016-06-25 20:00:41

from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import Context
from django.http import JsonResponse
from django.http import HttpResponseRedirect
import json
from trust.models import *
from django.views.decorators.csrf import csrf_exempt

def user(request):
        users = Users.objects.all()
        context = Context()
        context['users'] = users
        username = request.session.get('username', '')
        if username == '':
            return HttpResponseRedirect('/login')
        context['username'] = username
        return render_to_response("users/userprofile.html", context)


@csrf_exempt
def addUser(request):
    user = Users()
    user.name = request.POST['user-name']
    user.sex = request.POST['user-sex']
    user.password = request.POST['user-password']
    user.id_number = request.POST['user-id_number']
    user.phone_number = request.POST['user-phone_number']
    user.real_name = request.POST['user-real_name']
    user.department = request.POST['user-department']
    user.introduction = request.POST['user-introduction']
    user.level = request.POST['user-level']
    user.save()
    return HttpResponse("UserAdded")


@csrf_exempt
def editUser(request):
    user = Users.objects.get(id=request.POST['user-id'])
    user.name = request.POST['user-name']
    user.sex = request.POST['user-sex']
    user.password = request.POST['user-password']
    user.id_number = request.POST['user-id_number']
    user.phone_number = request.POST['user-phone_number']
    user.real_name = request.POST['user-real_name']
    user.department = request.POST['user-department']
    user.introduction = request.POST['user-introduction']
    user.level = request.POST['user-level']
    user.save()
    return HttpResponse("UserDataUpdated")


@csrf_exempt
def deleteUser(request):
    user = Users.objects.get(id=request.POST['id'])
    user.delete()
    return HttpResponse("UserDataDelete")
