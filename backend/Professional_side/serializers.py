
from Client_side.models import *
from .models import *
from Admin_side .serializers import * 
from rest_framework import serializers
from django.contrib.auth.hashers import make_password



class ProfessionalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password','is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)  # Hash the password
        user = User.objects.create(password=hashed_password, **validated_data)

        return user




class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'address','profile_pic')


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProfessionalSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(read_only=True)  # Include the related user data
    category = CategorySerializer(required=False) # Set required=False for nullable ForeignKey
    place = LocationSerializer(required=False) # Set required=False for nullable ForeignKey

    class Meta:
        model = Professional
        fields = '__all__'  # You can specify the fields you want to include here instead of '__all__'


class ImageSerializer(serializers.ModelSerializer):
    professional = ProfessionalSerializer(read_only=True)  # Use read_only=True to include nested data

    class Meta:
        model = Image
        fields = '__all__'  # Include all fields from the Image model
    
    def create(self, validated_data):
        image_data = validated_data.pop('image')  # Extract the image data from the validated data
        image_instance = Image.objects.create(**validated_data, image=image_data)
        return image_instance
    def to_representation(self, instance):
        # Only return the 'image' field from the serialized data
        return instance.image.url


    
class DescriptionSerializer(serializers.ModelSerializer):
    professional = ProfessionalSerializer(read_only=True)  # Use read_only=True to include nested data

    class Meta:
        model = Description
        fields = '__all__'  # Include all fields from the Image model

    def create(self, validated_data):
        description_data = validated_data.pop('text')  # Extract the image data from the validated data
        description_instance = Description.objects.create(**validated_data, text=description_data)
        return description_instance

    def to_representation(self, instance):
        # Only return the 'image' field from the serialized data
        return instance.text


class ProfessionalAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalAvailability
        fields = ['professional', 'date', 'start_time', 'end_time', 'is_available']

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Include the related user data
    professional=ProfessionalSerializer(read_only=True)
    availability_id = serializers.PrimaryKeyRelatedField(source='availability', read_only=True)


    class Meta:
        model = Bookings
        fields = '__all__'



