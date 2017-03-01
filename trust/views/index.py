# -*- coding: utf-8 -*-
# !/usr/bin/python

# @author: YangYu
# @date: 15/10/15
# @description:



from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import Context
from django.http import JsonResponse
from django.http import HttpResponseRedirect
import json
from trust.models import *


def index(request, page):
    """
    处理主要显示数据
    :param request:
    :param page: url中获取的要访问的页数
    :return:
    """

    username = request.session.get('username','')
    if username == '':
        return HttpResponseRedirect('/login')
    page = int(page)
    number = 6   # 每页显示个数
    start = (page - 1) * number
    end = page * number
    #count = Tasks.objects.count()
    count = 0
    #if page > (count / number + 1):     # 判断请求是否超出页面
        #return HttpResponse('ERROR')
    context = Context()
    """
    task_list = Tasks.objects.all()[start:end]
    #node_list = node.objects.all()[start:end]
    context['task_list'] = task_list
    """
    context['task_list'] = []
    #context['node_list'] = node_list
    context['page_count'] = range((count-1) / number + 1)  #总页面数范围，用于模板循环
    context['page_count_number'] = (count-1) / number + 1
    context['page'] = page #当前页码
    context['foo'] ='foo'
    context['username'] = username

    return render_to_response("index.html", context)


def detail(request,taskid):
    taskid = int(taskid)
    task = Tasks.objects.get(id=taskid)
    nodeApp = task.nodes.all()
    context = {}
    context['nodes']=[]
    try:
        nodes = [item.node for item in nodeApp]
        nodes = list(set(nodes))
    except Exception,e:
        print (e)
    for item in nodes:
        it = {}
        it['name'] = item.name
        it['introduction'] = item.introduction
        it['ip'] = item.ip
        it['type'] = item.type.name
        it['os'] = item.os

        context['nodes'].append(it)
    context['task'] = 'dd'
    #context = json.dumps(context)
    return JsonResponse(context)


def redirect(request):
    return HttpResponseRedirect('/index/page/1')


def edit(request):
    task = Tasks.objects.get(id=request.POST['task-id'])
    task.name = request.POST['task-name']
    task.introduction = request.POST['task-desc']
    # task.start_time = request.POST['start_time']
    # task.end_time = request.POST['end_time']
    # task.process = request.POST['process']
    #task.type = TaskType.objects.get(name=request.POST['task-type'])
    task.save()
    return HttpResponse("data updated!")


def delete(request):
    task = Tasks.objects.get(id=request.POST['id'])
    task.delete()
    return HttpResponse("data delete!")
