from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

class School(models.Model):
	"""
	sc_* represents school_
	and st_ represents student_
	"""
	city=(
	('Delhi','Delhi'),
    ('Patna','Patna'),
    ('Jodhpur','Jodhpur'),
    ('Rourkela','Rourkela'),
    ('Raipur','Raipur'),
    ('Jaipur','Jaipur'),
    ('Kota','Kota'),
    ('Visakhapatnam','Visakhapatnam'),
    ('Vijaynagram','Vijaynagram'),
    ('Sikar','Sikar'),
    ('Kolkata','Kolkata'),
    ('Jhunjhunu','Jhunjhunu'),
    ('Korba','Korba'),
    ('Muzaffarpur','Muzaffarpur'),
    ('Varanasi','Varanasi'),
    ('Bhagalpur','Bhagalpur'),
			#to be updated
		)
	state=(
		('Delhi', 'Delhi'),
		('Rajasthan', 'Rajasthan'),
		('Haryana', 'Haryana'),
		('Bihar', 'Bihar'),
		('Bengal', 'Bengal'),
		('Uttar Pradesh', 'Uttar Pradesh'),
		('Orrisa', 'Orrisa'),
		('Andhra Pradesh', 'Andhra Pradesh'),
		('Chhatissgarh', 'Chhatissgarh'),
		)

	user = models.OneToOneField(User, null=True)
	students = models.ManyToManyField("Student")
	sc_name = models.CharField(max_length = 100)
	sc_add = models.CharField(max_length=500)
	sc_city = models.CharField(max_length=30,choices=city)
	sc_state = models.CharField(max_length=30,choices=state)
	sc_email = models.EmailField(max_length=50)
	sc_no = models.IntegerField()
	sc_princi = models.CharField(max_length=50)
	sc_auth = models.CharField(max_length=50)
	is_paid = models.BooleanField(default=False)
	enroll_sheet = models.FileField()

	def __str__(self):
		return self.sc_name

class Student(models.Model):
	city=(
	('Delhi','Delhi'),
    ('Patna','Patna'),
    ('Jodhpur','Jodhpur'),
    ('Rourkela','Rourkela'),
    ('Raipur','Raipur'),
    ('Jaipur','Jaipur'),
    ('Kota','Kota'),
    ('Visakhapatnam','Visakhapatnam'),
    ('Vijaynagram','Vijaynagram'),
    ('Sikar','Sikar'),
    ('Kolkata','Kolkata'),
    ('Jhunjhunu','Jhunjhunu'),
    ('Korba','Korba'),
    ('Muzaffarpur','Muzaffarpur'),
    ('Varanasi','Varanasi'),
    ('Bhagalpur','Bhagalpur'),
			#to be updated
		)
	user = models.OneToOneField(User, null=True)
	st_name = models.CharField(max_length = 100)
	st_dob = models.DateField(auto_now=True)
	st_city_res = models.CharField(max_length = 20)
	st_city_sc = models.CharField(max_length=30,choices=city)
	st_sc = models.ForeignKey('School', null=True)
	st_email = models.CharField(max_length = 50)
	st_pass = models.CharField(max_length=30)

	def __str__(self):
		return self.st_name
