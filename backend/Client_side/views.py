from rest_framework import status
from .models import *
from Professional_side.models import *
from Professional_side.serializers import CategorySerializer
from Admin_side.serializers import ProfessionalSerializer

from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
#for smtp mail
import smtplib
from email.mime.text import MIMEText
from django.conf import settings
#for login authentication
from django.contrib.auth import authenticate

#for jwt
from rest_framework_simplejwt.tokens import RefreshToken

import razorpay
from datetime import datetime
from django.utils import timezone
import json










class HelloWorldAPIView(APIView):
    def get(self, request):
        message = "Hello World"
        return Response({"message": message})
    

class UserRegistrationAPIView(APIView):
    def post(self, request):
        print("i ammmmmmmmmmmmmmmmmmmmmmmmmm")
        serializer = UserSerializer(data=request.data)
        print (serializer,"this is serializer")
        if serializer.is_valid():
            print ("yes i am here")
            user = serializer.save()

            # Send email to the registered user
            subject = 'Welcome to AppointmentHub!'
            message = 'Thank you for registering with AppointmentHub. As a registered user, you can now book appointments with our professionals at your convenience.'
            sender = settings.EMAIL_HOST_USER
            recipient = user.email

            msg = MIMEText(message)
            msg['Subject'] = subject
            msg['From'] = sender
            msg['To'] = recipient

            with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as smtp_server:
                smtp_server.starttls()
                smtp_server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
                smtp_server.send_message(msg)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


    def get(self, request):
        if request.method == 'GET':
            print(' indide get ')
            email = request.GET.get('email')
            print(email,'email  in get method---------------------')
            try:
                user = User.objects.get(email=email)
                print('existing email', user)

                return Response({'message':'Email already Exists'})
            except:
                return Response({'message':'success'})










class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(request, email=email, password=password)

        if user:
            # Determine the user role and send it in the response
            role = ''
            if user.is_superuser:
                role = 'admin'
            elif user.is_staff:
                role = 'staff'
            else:
                role = 'user'
            # Get email and username from user model
            user_email = user.email
            user_username = user.username
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)   

            return Response({'message': 'Login successful', 'user_username':user_username,'user_email': user_email,'role': role,'access': access_token,'refresh': refresh_token,}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class UserView(APIView):
    def get(self,request):
        email=request.GET.get("email")
        try:
            user = User.objects.get(email=email)
            user_serializer = UserDetailsSerializer(user)
            print(user_serializer.data,"kkkkkkkkkkkkkkkkk")

            return Response(user_serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class StartPaymentAPIView(APIView):
    def post(self,request,id):
        print("i am hereeeeeeeeeeeeee")
        amount = request.data['fee']
        client = razorpay.Client(auth=("rzp_test_5INtJRSgBN8pfL", "8zEUfPyyQiQsWk6iDzQ3NqNe"))

        payment = client.order.create({
        "amount": int(float(amount) * 100),  
        "currency": "INR",
        "payment_capture": "1"
         })
        try:
                data = {
                 "payment": payment,
             }
                return Response(data)
        except :
            return Response({'error': 'Professional with the provided ID does not exist'})
 


class HandlePaymentSuccessView(APIView):
    def post(self, request):
        try:
            print("heloooooooooooooooooooooooo")
            ord_id = ""
            raz_pay_id = "" 
            raz_signature = ""

            res = json.loads(request.data["response"])
            print(res,'resssssssssssssss')

            for key in res.keys():
                if key == 'razorpay_order_id':
                    ord_id = res[key]
                elif key == 'razorpay_payment_id':
                    raz_pay_id = res[key]
                elif key == 'razorpay_signature':
                    raz_signature = res[key]
        
            ord_id = res.get('razorpay_order_id', '') 
            print(ord_id,'-------------------')
            if ord_id is None:
                raise ValueError("Missing 'razorpay_order_id' in the response")

            order = Bookings.objects.get(id=int(ord_id))

            # we will pass this whole data in razorpay client to verify the payment
            data = {
                'razorpay_order_id': ord_id,
                'razorpay_payment_id': raz_pay_id,
                'razorpay_signature': raz_signature
            }

            client = razorpay.Client(auth=("rzp_test_5INtJRSgBN8pfL", "8zEUfPyyQiQsWk6iDzQ3NqNe"))
            
            check = client.utility.verify_payment_signature(data)
            if check is None:
                return Response({'error': 'Something went wrong'})

            order = Bookings.objects.get(order_payment_id=ord_id)
            order.payment = True
            order.save()
            
            res_data = {
                'message': 'payment successfully received!'
            }
        except Bookings.DoesNotExist:
            print("Booking with the provided ID does not exist")
            return Response({'error': 'Booking does not exist'})

        except Exception as e:
            print(e)
            return Response({'error': 'An error occurred'})

        return Response(res_data)



class BookingCreateView(APIView):
    def post(self, request):
        data = request.data

        serializer = BookingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({'categories': serializer.data})


class GetProfessionals(APIView):
    def get(self, request):
        category_name = request.GET.get('category', '')
        professionals = Professional.objects.filter(category__name=category_name)
        serializer = ProfessionalSerializer(professionals, many=True)
        return Response(serializer.data)
