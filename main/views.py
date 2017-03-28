from django.shortcuts import render
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.template import RequestContext
from django.shortcuts import render, render_to_response, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect,Http404,HttpResponse, JsonResponse
from django.template.loader import get_template
from django.template import Context
from django.core.mail import send_mail, EmailMessage, EmailMultiAlternatives
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.contrib.sites.models import Site
from django.core import serializers

@csrf_exempt
def reg_school(request):
	if request.method == 'POST':
		sc_name = request.POST['sc_name']
		sc_add = request.POST['sc_add']
		sc_city = request.POST['sc_city']
		sc_state = request.POST['sc_state']
		sc_email = request.POST['sc_email']
		sc_no = request.POST['sc_no']
		sc_princi = request.POST['sc_princi']
		sc_auth = request.POST['sc_auth']
		sc_pass = request.POST['sc_pass']

		if sc_pass == request.POST['sc_conf']:
			try:
				already_reg = User.objects.get(sc_email=sc_email)
				return render(request, 'main/error.html', {'error_heading' : 'User Already Registered', 'error_message' : 'The email id is already registered.'})
			except:
				pass
			User.objects.create_user(username = sc_email, password = sc_pass)
			sc_user = User.objects.get(username = sc_email)
			member = School()
			member.user = sc_user
			member.user.save()

			member.sc_name = sc_name
			member.sc_add = sc_add
			member.sc_city = sc_city
			member.sc_email = sc_email
			member.sc_no = sc_no
			member.sc_princi = sc_princi
			member.sc_auth = sc_auth
			member.save()

			#algo for username and psswd to be written

			body = unicode(u'''
				Hi,
				 whatever to be filled here to be done by the team


				''')%()
			send_to = sc_email
			try:
					email = EmailMessage('Application for Registration with <School>', body, '<school>@sugar.com', [send_to])
					email.attach_file('#path of file on server')
					email.send()
			except:
				return JsonResponse({'status' :1, 'message': 'Your school has been successfully registered'})
		else:
			return JsonResponse({"status": 0, "message": "Passwords do not match"})
	else:
		return render(request, 'school_register.html')


@csrf_exempt
def reg_st(request):
	if request.POST:
		print request.POST
		st_name = request.POST['st_name']
		st_dob = request.POST['st_dob']
		st_city_res = request.POST['st_city_res']
		st_city_sc = request.POST['st_city_sc']
		st_sc = request.POST['st_sc']
		st_email = request.POST['st_email']
		st_pass = request.POST['st_pass']
		school = School.objects.get(sc_name = st_sc)
		print school

		try:
			already_reg = Student.objects.get(st_email=st_email)
			if already_reg is not None:
				response = {'error_heading' : 'User Already Registered', 'error_message' : 'The email id is already registered.'}
				return JsonResponse(response)
		except:
			pass

		student = Student()
		try:
			student.user = User.objects.get(username = st_email)
			return JsonResponse({'status': 0, 'message': 'This email is already registered'})
		except:
			User.objects.create_user(username = st_email, password = st_pass)
			student.user = User.objects.get(username = st_email)
		student.save()

		student.st_name = st_name
		student.st_dob = st_dob
		student.st_city_res = st_city_res
		student.st_city_sc = st_city_sc
		student.st_email = st_email
		student.st_sc = school
		student.st_pass = st_pass
		student.save()
		school.students.add(student)
		school.save()
		#algo for username and psswd to be written
		response = {'message': 'Registered Successfully! Check mail'}
		return JsonResponse(response)
	else:
		return render(request, 'register.html')

@csrf_exempt
def sc_list(request): 
	sclist = School.objects.filter(sc_city=request.POST['city'])
	return HttpResponse(serializers.serialize('json',sclist,fields=('sc_name')))

def gen_username(request):
	c_code = int(student.sc_city)
	d = []
	today = datetime.date.today()
	d.append(today)
	year = d[0]
	r_year = year[2:]
	s_id = str(student.id)
	u_name = "EM" + r_year + c_code + s_id

	return(u_name)

def gen_psswd(request):
	psswd = str(student.sc_no)

	return(psswd)

def create_user(request):
	student = User.objects.create_user(username=u_name, password=psswd, email_id=student.st_email)
	student.save()
	return student

	body = unicode(u'''
		Hi whatever to be filled here to be done by the school


		''')%()
	send_to = st_email
	try:
			email = EmailMessage('Application for Registration with TEM', body, 'tem@sugar.org', [send_to])
			email.attach_file('#path of file on server')
			email.send()
	except:
		return HttpResponse('error')

@csrf_exempt
def user_login(request):
	# if request.user.is_authenticated():
	# 	return HttpResponseRedirect('../school_dashboard/')
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']
		u_type = request.POST['type']
		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
					login(request, user)
					if u_type == 'school':
						return HttpResponseRedirect('../school_dashboard')
					else:
						return HttpResponseRedirect('../student_dashboard')
			else:
				response = {'error_heading' : "Account Inactive", 'error_message' :  'Your account is currently INACTIVE. To activate it,contact you admin'}
				return JsonResponse(response)
		else:
			response = {'error_heading' : "Invalid Login Credentials", 'error_message' :  'Please'}
			return JsonResponse(response)
	else:
		response = {'message': 'to login'}
		return render(request, 'login.html', response)

@login_required
def user_logout(request):
	user = request.user;
	logout(request)
	return HttpResponseRedirect('../login')

@login_required
def sc_dashboard_simple(request):
	if request.user.is_authenticated():
		school = School.objects.get(user=request.user)

		response = {'name': school.sc_name,
					'address': school.sc_add,
					'city': school.sc_city,
					'email_id': school.sc_email,
					'phone_no': school.sc_no,
					'princi_name': school.sc_princi,
					'auth_name': school.sc_auth,
		}
		return render(request, 'school.html', response)

@login_required
def sc_details(request):
	if request.user.is_authenticated:
		school = School.objects.get(user=request.user)
		response = {'name': school.sc_name,
					'address': school.sc_add,
					'city': school.sc_city,
					'state': school.sc_state,
					'email_id': school.sc_email,
					'phone_no': school.sc_no,
					'princi_name': school.sc_princi,
					'auth_name': school.sc_auth,
		}
		return JsonResponse(response)
	else:
		return 0

# @login_required
# def sc_dashboard_file(request):
# 	#to be written
#

@login_required
def sc_dashboard_payment(request):
	school = School.objects.get(request.user.sc_email)

	if school.is_paid == True:
		response={'message': 'You have paid'}

	else:
		response = {'message': 'Kindly follow the link to make your payment' }

	return JsonResponse(response)

@login_required
def sc_dashboard_status(request):
	school = School.objects.get(request.user.sc_email)

	if school.enroll_sheet == null:
		response = {'paid': school.is_paid,
					'registered': True,
					'enroll_sheet': False,
					'enroll_aknowledge': 'pata nahi bc',
					'roll_generate': 'to be asked',
					'exam_conduct': 'to be asked',
		}
	else:
		response = {'paid': school.is_paid,
					'registered': True,
					'enroll_sheet': True,
					'enroll_aknowledge': 'pata nahi bc',
					'roll_generate': 'to be asked',
					'exam_conduct': 'to be asked',
		}
	return JsonResponse(response)

@login_required
def sc_dashboard_roll(request):
	#if roll numbers not generated:
	response = {'status': 0,
				'message': 'PLEASE BE PATIENT WHILE WE FINISH THE PROCEDURES.,'
	}
	#else:
	#response = {'status' = 0,
	#			'message' = Click the link below to download the roll numbers
	#}
 	return JsonResponse(response)

@login_required
def sc_edit(request):
	if request.method == 'POST':
		sc_add = request.POST['sc_add']
		sc_city = request.POST['sc_city']
		sc_state = request.POST['sc_state']
		sc_email = request.POST['sc_email']
		sc_no = request.POST['sc_no']
		sc_princi = request.POST['sc_princi']
		sc_auth = request.POST['sc_auth']
		#I guess it would be good to add a separate link for changing password

	try:
		member = School()
		member.sc_add = sc_add
		member.sc_city = sc_city
		member.sc_email = sc_email
		member.sc_no = sc_no
		member.sc_princi = sc_princi
		member.sc_auth = sc_auth
		member.save()

		response = {'status': 1,
					'message': 'Your information was saved successfully',
		}

	except:
		response = {'status': 0,
					'message': error
		}

	return JsonResponse(response)

@login_required
def st_dashboard_simple(request):
	if request.user.is_authenticated():
		return render(request, 'student.html')
	else:
		return 0

@login_required
def st_dashboard_profile(request):
	print 1
	if request.method == "GET":
		student = Student.objects.get(user=request.user)

		response = {'name': student.st_name,
					'city': student.st_city_res,
					'school': student.st_sc.sc_name,
					'email_id': student.st_email,
					'roll': student.id,
					# 'phone_no': student.st_no,
					'dob': student.st_dob
		}
		print response
		return JsonResponse(response)

###########################################Payment Gateway###########################################################################
# ''' from paypal.standard.ipn import PayPalPaymentsForm
#
# def main_pay(request):
#
#     paypal_dict = {
#         "business": #paypal id,
#         "amount": #to be asked,
#         "item_name": "Registration with sugar",
#         "invoice": "unique-invoice-id",
#         "notify_url": "https://www.example.com" + reverse('paypal-ipn'),
#         "return_url": "https://www.sugar.com/thank_you/",
#         "cancel_return": "https://www.sugar.com/oops/",
#         "callback_timeout": "3",
#         "custom": "Upgrade all users!",  # Custom command to correlate to some function later (optional)
#     }
#
#     form = PayPalPaymentsForm(initial=paypal_dict)
#     context = {"form": form}
#     return render(request, "payment.html", context) '''


######################################################################insta MOJO#########################################################################################################
# import hmac
# import hashlib

# def final_pay(request):
# 	if request.method == 'POST':

# 		name = request.POST['name']
# 		n_stulist = request.POST.list['students']

# 		a = n_stulist.length

# 		amt = a*200

# 		name = ( str(name) )
# 		salt = 'a2abf0c1d2b4483ba6dad91db2aa0906'
# 		message = str(amt)+'|'+names
# 		mac_calculated = hmac.new(
# 	     	str(salt),
#         	message,
#         	hashlib.sha1,
#         	).hexdigest()

# 		b = 'https://www.instamojo.com/walter/sugar/'+'?intent=buy&data_Field_42913='+name+'&data_amount='+str(a*250)+'&data_readonly=data_amount&data_readonly=data_Field_42913&data_sign='+mac_calculated

# 		return HttpResponseRedirect(b)

# def apirequest_reg(request):
# 	import requests
# 	payid=str(request.GET['payment_id'] )
# 	headers = {'X-Api-Key': '4c82f4f5cafa29a1ba99ae14a3d288ff',
#     	       'X-Auth-Token': '8a368c53ec2bf4909580ccab3f42ebd9'}
# 	r = requests.get('https://www.instamojo.com/api/1.1/payments/',
#                 	 headers=headers)
# 	json_ob = r.json()
# 	payments = json_ob['payments'][0]
# 	email = payments['custom_fields']['Field_42913']['value']
# 	user=School.objects.filter(email_id = sc_email)[0]
# 	user.paid=True
# 	user.save()
# 	response = {
# 		'error_heading':'sugar',
# 		'error_message' : 'Payment Successful.',
# 		'thanks' : 1,
# 	}
# 	return JsonResponse(response)
