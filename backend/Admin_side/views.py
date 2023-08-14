from rest_framework import generics
from .serializers import *
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class UserListView(generics.ListAPIView):
    queryset = User.objects.filter(is_superuser=False, is_staff=False)
    serializer_class = UserSerializer

class ProfessionalListView(generics.ListAPIView):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer

class LocationListView(generics.ListAPIView):
    queryset = Place.objects.all()
    serializer_class = LocationSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BlockUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_200_OK)

class UnblockUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = True
        instance.save()
        return Response(status=status.HTTP_200_OK)
    

class BlockProfessionalView(generics.UpdateAPIView):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user_instance = instance.user  # Access the associated User instance
        
        user_instance.is_active = False  # Set is_active to False to block the user
        user_instance.save()
        return Response({'message': 'Professional blocked successfully.'}, status=status.HTTP_200_OK)
    

class UnblockProfessionalView(generics.UpdateAPIView):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user_instance = instance.user  # Access the associated User instance
        user_instance.is_active = True  # Set is_active to False to block the user
        user_instance.save()
        return Response({'message': 'Professional blocked successfully.'}, status=status.HTTP_200_OK)
    

class LocationUpdateView(generics.UpdateAPIView):
    queryset = Place.objects.all()
    serializer_class = LocationSerializer
    lookup_field = 'id'  # Use 'id' as the lookup field instead of the default 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LocationDeleteView(generics.DestroyAPIView):
    queryset = Place.objects.all()
    serializer_class = LocationSerializer
    lookup_field = 'id'  # Use 'id' as the lookup field instead of the default 'pk'

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class CategoryUpdateView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'  # Use 'id' as the lookup field instead of the default 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'  # Use 'id' as the lookup field instead of the default 'pk'

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



class LocationCreateView(generics.CreateAPIView):
    queryset = Place.objects.all()
    serializer_class = LocationSerializer

    def create(self, request, *args, **kwargs):
        # Check if the location with the same name already exists
        name = request.data.get('name', None)
        if name and Place.objects.filter(name__iexact=name).exists():
            return Response({'error': 'Location with this name already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        # Check if the category with the same name already exists
        name = request.data.get('name', None)
        if name and Category.objects.filter(name__iexact=name).exists():
            return Response({'error': 'Category with this name already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)

class BookingListView(generics.ListAPIView):
    queryset = Bookings.objects.all()
    serializer_class = BookingSerializer




