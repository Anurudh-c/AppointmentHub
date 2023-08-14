from django.urls import path
from .views import *

urlpatterns = [

    path("hello/", HelloWorldAPIView.as_view(), name="hello_world"),
    path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('get-user/', UserView.as_view(), name='get-user'),
    path('start_payment/<int:id>/', StartPaymentAPIView.as_view(), name='start_payment'),
    path('handle_payment_success/', HandlePaymentSuccessView.as_view(), name='handle_payment_success'),
    path('booking-update/', BookingCreateView.as_view(), name='booking-update'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('get-professionals/', GetProfessionals.as_view(), name='get_professionals'),







 ]