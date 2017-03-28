# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2017-03-28 14:33
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0002_auto_20170328_1345'),
    ]

    operations = [
        migrations.AddField(
            model_name='school',
            name='students',
            field=models.ManyToManyField(to='main.Student'),
        ),
        migrations.RemoveField(
            model_name='school',
            name='user',
        ),
        migrations.AddField(
            model_name='school',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
