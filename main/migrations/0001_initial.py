# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sc_name', models.CharField(max_length=100)),
                ('sc_add', models.CharField(max_length=500)),
                ('sc_city', models.CharField(max_length=30, choices=[('Delhi', 'Delhi')])),
                ('sc_state', models.CharField(max_length=30, choices=[('Delhi', 'Delhi')])),
                ('sc_email', models.EmailField(max_length=50)),
                ('sc_no', models.IntegerField()),
                ('sc_princi', models.CharField(max_length=50)),
                ('sc_auth', models.CharField(max_length=50)),
                ('is_paid', models.BooleanField(default=False)),
                ('enroll_sheet', models.FileField(upload_to=b'')),
                ('user', models.OneToOneField(null=True, to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('st_name', models.CharField(max_length=100)),
                ('st_dob', models.DateField(auto_now=True)),
                ('st_city_res', models.CharField(max_length=20)),
                ('st_city_sc', models.CharField(max_length=30, choices=[('Delhi', 'Delhi')])),
                ('st_email', models.CharField(max_length=50)),
                ('st_pass', models.CharField(max_length=30)),
                ('st_sc', models.ForeignKey(to='main.School')),
                ('user', models.OneToOneField(null=True, to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
