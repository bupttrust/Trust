# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-03-06 07:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trust', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('introduction', models.TextField(max_length=200)),
                ('ip', models.GenericIPAddressField()),
                ('cpu_number', models.IntegerField()),
                ('cpu_frequency', models.FloatField()),
                ('memory', models.FloatField()),
                ('memory_Speed', models.FloatField()),
                ('os', models.CharField(max_length=30)),
                ('uri', models.URLField()),
            ],
        ),
    ]