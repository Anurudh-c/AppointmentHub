from rest_framework import serializers
from Client_side.models import *
from Professional_side.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'is_staff', 'is_superuser']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProfessionalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Include the related user data
    category = CategorySerializer(required=False) # Set required=False for nullable ForeignKey
    place = LocationSerializer(required=False) # Set required=False for nullable ForeignKey

    class Meta:
        model = Professional
        fields = '__all__'  # You can specify the fields you want to include here instead of '__all__'

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Include the related user data
    professional=ProfessionalSerializer(read_only=True)
    availability_id = serializers.PrimaryKeyRelatedField(source='availability', read_only=True)


    class Meta:
        model = Bookings
        fields = '__all__'


