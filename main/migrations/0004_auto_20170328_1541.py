# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2017-03-28 15:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20170328_1433'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='st_sc',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.School'),
        ),
    ]