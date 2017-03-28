from django.views.generic import RedirectView
from django.conf.urls import url, include, patterns
from django.contrib import admin
from . import views

urlpatterns = patterns('',
	url(r'^school_register/', views.reg_school, name='reg_school'),
	url(r'^student_register/', views.reg_st, name='reg_st'),
	url(r'^register/', views.reg_st, name='reg_st'),
	url(r'^login/', views.user_login, name='user_login'),
	url(r'^logout/', views.user_logout, name='user_logout'),
	url(r'^school_dashboard/', views.sc_dashboard_simple, name='sc_dashboard_simple'),
	url(r'^student_dashboard/$', views.st_dashboard_simple, name='st_dashboard_simple'),
	url(r'^student_dashboard/profile/$', views.st_dashboard_profile, name='st_dashboard_profile'),
	url(r'^sc_details/', views.sc_details, name='sc_details'),
	url(r'^sc_list/', views.sc_list, name='sc_list'),
	url(r'^school_dashboard/payment/', views.sc_dashboard_payment, name='sc_dashboard_payment'),
	url(r'^school_dashboard/status/', views.sc_dashboard_roll, name='sc_dashboard_roll'),
	url(r'^school_dashboard/edit/', views.sc_edit, name='sc_edit'),
	)
