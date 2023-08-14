from django.urls import path
from .views import *

urlpatterns = [
    path("register/", ProfessionalRegistrationAPIView.as_view(), name="register"),
    # path('update-professional-details/', UpdateProfessionalDetailsView.as_view(), name='update-professional-details'),
    path('get-professionals/', ProfessionalsView.as_view(), name='get-professionals'),
    path('update-professionals/<str:email>/', ProfessionalUpdateView.as_view(), name='update-professionals'),

    path('get-categories/', CategoryListView.as_view(), name='get-categories'),
    path('get-places/', PlaceListView.as_view(), name='get-places'),
    path('upload/image/<str:email>/', ImageUploadView.as_view(), name='upload-image'),
    path('upload/description/<str:email>/', DescriptionUploadView.as_view(), name='upload-description'),
    path('availability/', ProfessionalAvailabilityCreateView.as_view(), name='availability-create'),
    path('bookinghistory/<str:email>/', BookingView.as_view(), name='bookinghistory'),
    path('availability-list/<str:email>/', ProfessionalAvailabilityView.as_view(), name='availability-list'),









]
