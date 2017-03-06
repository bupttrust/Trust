#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2015-10-21 09:54:45
# @Last Modified by:   anchen
# @Last Modified time: 2016-06-25 20:12:12

from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template import Context
from django.http import JsonResponse
import json
import urllib
from trust.models import *
import time
import sys
import zmq
import datetime,time
import random
from django.utils import timezone
#from major.comtool import getNodeState
#from major.models import *

def nodeConfig(request):
	nodes = Node.objects.all()
	context = Context()
	context['nodes'] = nodes
	username = request.session.get('username','')
	if username == '':
		return HttpResponseRedirect('/login')
	context['username'] = username
	return render_to_response("config/nodeConfig.html", context)


"""
def templateConfig(request):
	templates = Template.objects.all()
	nodes = Node.objects.all()
	jobstreams = JobStream.objects.all()
	parameters = Parameters.objects.all()
	CPUs = Parameters.objects.filter(type="CPU")
	Memorys = Parameters.objects.filter(type="Memory")
	Networks = Parameters.objects.filter(type="Network")
	IOs = Parameters.objects.filter(type="I/O")
	NFSs = Parameters.objects.filter(type="NFS")
	context = Context()
	context['nodes'] = nodes
	context['jobstreams'] = jobstreams
	context['templates'] = templates
	context['parameters'] = parameters
	context['CPUs'] = CPUs
	context['Memorys'] = Memorys
	context['Networks'] = Networks
	context['IOs'] = IOs
	context['NFSs'] = NFSs
	username = request.session.get('username','')
	if username == '':
		return HttpResponseRedirect('/login')
	context['username'] = username
	return render_to_response("config/templateConfig.html", context)

def jobStream(request):
	jobStreams = JobStream.objects.all()
	context = Context()
	context['jobStreams'] = jobStreams
	username = request.session.get('username','')
	if username == '':
		return HttpResponseRedirect('/login')
	context['username'] = username
	return render_to_response("config/appConfig.html", context)

def jobinfo(request,jobstreamid):
	jobstream = JobStream.objects.get(id = jobstreamid)
	context = Context()
	username = request.session.get('username','')
	if username == '':
		return HttpResponseRedirect('/login')
	context['username'] = username
	context['jobstream'] = jobstream
	return render_to_response("config/jobConfig.html", context)

def editJob(request):
	job_id = request.POST['job-id']
	job_number = request.POST['job-number']
	job_name = request.POST['job-name']
	job = Job.objects.get(id = job_id)
	job.number = job_number
	job.name = job_name
	job.save()
	return HttpResponse("AppDataUpdated")


def nodeState(request):
	context = Context()
	username = request.session.get('username','')
	if username == '':
		return HttpResponseRedirect('/login')
	context['username'] = username
	return render_to_response("config/nodeState.html", context)

def inTimeState(request):
	endtime = int (time.time())
	starttime = endtime - 5
	data = []
	#data.append(getNodeState(hostname,str(starttime)+"000",str(endtime)+"000"))
	hostlist = Node.objects.all()
	for host in hostlist:
		data.append(getNodeState(host.name,str(starttime)+"000",str(endtime)+"000"))
	return HttpResponse(json.dumps(data))


def editMode(request):
	mode_id = request.POST['mode-id']
	mode_name = request.POST['mode-name']
	mode = RunMode.objects.get(id=mode_id)
	mode.name = mode_name
	mode.save()
	return HttpResponse("ModeDataUpdated")

def addMode(request):
	job_id = request.POST['job-id']
	mode_name = request.POST['mode-name']
	mode = RunMode()
	mode.name = mode_name
	mode.save()
	job = Job.objects.get(id=job_id)
	job.runmode.add(mode)
	return HttpResponse("ModeDataAdded")

def addJob(request):
	jobstream_id = request.POST['jobstream-id']
	jobstream = JobStream.objects.get(id=jobstream_id)
	job = Job()
	job_name = request.POST['name']
	job_num = request.POST['job-num']
	job.name = job_name
	job.number = job_num
	job.save()
	jobstream.jobs.add(job)
	return HttpResponse("JobDataAdded")

def editJobStream(request):
	jobstream_id = request.POST['jobstream-id']
	jobstream_name = request.POST['jobstream-name']
	jobstream_type = request.POST['jobstream-type']
	jobstream_des = request.POST['jobstream-des']
	jobstream = JobStream.objects.get(id=jobstream_id)
	jobstream.name = jobstream_name
	jobstream.type = jobstream_type
	jobstream.description = jobstream_des
	jobstream.save()
	return HttpResponse("JobStreamDataUpdated")

def addJobStream(request):
	jobstream = JobStream()
	jobstream.name = request.POST['jobstream-name']
	jobstream.type = request.POST['jobstream-type']
	jobstream.description = request.POST['jobstream-des']
	jobstream.job_num = 0
	jobstream.save()
	return HttpResponse("JobStreamDataAdded")

def deleteJobStream(request):
    jobstream = JobStream.objects.get(id=request.POST['id'])
    jobstream.delete()
    return HttpResponse("JobStreamDataDelete")
"""
