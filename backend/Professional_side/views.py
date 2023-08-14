from rest_framework import status
from .serializers import *
from Client_side.models import Bookings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import date, datetime



#for smtp mail
import smtplib
from email.mime.text import MIMEText
from django.conf import settings



class ProfessionalRegistrationAPIView(APIView):
    def post(self, request):
        serializer = ProfessionalCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Send email to the registered user
            subject = 'Welcome to AppointmentHub!'
            message = 'Thank you for registering with AppointmentHub. As a registered professional, you can now offer your services and accept bookings through our platform. Start connecting with clients and earning income at your convenience.'
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

    

class ProfessionalsView(APIView):
    def get(self, request):
        email = request.GET.get("email")
        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            professionals_serializer = ProfessionalSerializer(professionals, many=True)

            return Response(professionals_serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class ProfessionalUpdateView(APIView):
    def put(self, request,email):
        # email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)

            professionals_serializer = ProfessionalSerializer(professionals, many=True, data=request.data)
            if professionals_serializer.is_valid():
                professionals_serializer.save()  # Save the updated data to the database
                return Response(professionals_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(professionals_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class CategoryListView(APIView):
    def get(self,request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class PlaceListView(APIView):
    def get(self,request):
        places = Place.objects.all()
        serializer = LocationSerializer(places, many=True)
        return Response(serializer.data)


class ImageUploadView(APIView):
    def post(self, request, email):
        data = request.data
        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            serializer = ImageSerializer(data=data)
            if serializer.is_valid():
                serializer.save(professional=professionals[0])  # Assign the professional to the image
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            images = Image.objects.filter(professional__in=professionals)
            serializer = ImageSerializer(images, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class DescriptionUploadView(APIView):
    def post(self, request, email):
        data = request.data

        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            serializer = DescriptionSerializer(data=data)
            if serializer.is_valid():
                serializer.save(professional=professionals[0])  # Assign the professional to the image
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, email):
        
        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            description = Description.objects.filter(professional__in=professionals)
            serializer = DescriptionSerializer(description, many=True)
            print(serializer.data,'gggggg')
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class ProfessionalAvailabilityCreateView(APIView):
    def post(self, request):
        email=request.data["email"]
        selected_date=request.data["date"]
        start_time=request.data["start_time"]
        end_time=request.data["end_time"]
        try:
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            professional_instance = professionals.first()  # Get the first Professional instance
            date = datetime.strptime(selected_date, "%Y-%m-%d").date()

            if date < date.today():
                 print("ivide ethi suceesss")
                 return Response({"detail": "Selected date cannot be in the past."}, status=status.HTTP_400_BAD_REQUEST)
            
            if start_time >= end_time:
                print("time nokandee monooseeeeeeeeee")
                return Response({"detail": "Start time must be before end time."}, status=status.HTTP_400_BAD_REQUEST)



            Bookingdata={
                "professional":professional_instance.id,  # Access the id attribute of the specific Professional instance
               "date":date,
               "start_time":start_time,
               "end_time":end_time,
               "is_available":True,

            } 
            serializer = ProfessionalAvailabilitySerializer(data=Bookingdata)
            if serializer.is_valid():
                      serializer.save()
                      return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class ProfessionalAvailabilityView(APIView):
    def get(self, request, email):
        try:
            print (email,"emailllllllllllllll")
            user = User.objects.get(email=email)
            professionals = Professional.objects.get(user=user)
            availabilities = ProfessionalAvailability.objects.filter(professional=professionals)
            serializer = ProfessionalAvailabilitySerializer(availabilities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Professional.DoesNotExist:
            return Response({"error": "Professional not found."}, status=status.HTTP_404_NOT_FOUND)






class BookingView(APIView):
    def get(self, request, email):
        try:
            print("hoiiiiiiiiiiammmmmmmmmm")
            user = User.objects.get(email=email)
            professionals = Professional.objects.filter(user=user)
            bookings = Bookings.objects.filter(professional__in=professionals)
            booking_serializer = BookingSerializer(bookings)
            return Response(booking_serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
