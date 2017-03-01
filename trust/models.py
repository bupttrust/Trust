#from __future__ import unicode_literals

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
