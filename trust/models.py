#from __future__ import unicode_literals
# -*- coding:utf-8 -*-

from django.db import models
import json

# Create your models here.

class Users(models.Model):
    name = models.CharField(max_length=30)
    sex = models.CharField(max_length=5)
    password = models.CharField(max_length=40)
    id_number = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=15)
    real_name = models.CharField(max_length=30)
    department = models.CharField(max_length=30)
    introduction = models.TextField(max_length=200)
    level = models.IntegerField()

    def __unicode__(self):
        return self.name

    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))


class Node(models.Model):
    """
    节点
    """
    name = models.CharField(max_length=30)
    node_type = models.CharField(max_length=10)
    location_x = models.FloatField()
    location_y = models.FloatField()
    node_ip = models.CharField(max_length=50)
    node_file = models.CharField(max_length=50)
    node_active = models.FloatField()
    update_time = models.IntegerField()
    introduction = models.TextField(max_length=200)
    """
    ip = models.GenericIPAddressField()
    cpu_number = models.IntegerField()
    cpu_frequency = models.FloatField()
    memory = models.FloatField()
    memory_Speed = models.FloatField()
    #disk = models.ManyToManyField(Disk)
    #gpu = models.ManyToManyField(Gpu)
    #net = models.ManyToManyField(Net)
    os = models.CharField(max_length=30)
    uri = models.URLField()
    """

    def __unicode__(self):
        return self.name

    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))


class Tasks(models.Model):
    """
    监测 分析的任务表
    """
    name = models.CharField(max_length=30)
    start_time = models.CharField(max_length=30)
    end_time = models.CharField(max_length=30)
    node_id = models.IntegerField()
    update_time = models.IntegerField()
    evaluate_state = models.CharField(max_length=30)
    introduction = models.TextField(max_length=200)

    def __unicode__(self):
        return self.name

    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
