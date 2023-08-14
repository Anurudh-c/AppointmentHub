from django.urls import path
from .views import *


urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('professionals/', ProfessionalListView.as_view(), name='professional-list'),
    path('locations/', LocationListView.as_view(), name='Location-list'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('bookings/', BookingListView.as_view(), name='bookings-list'),
    path('users/block/<int:pk>/', BlockUserView.as_view(), name='block_user'),
    path('users/unblock/<int:pk>/', UnblockUserView.as_view(), name='unblock-user'),
    path('professionals/block/<int:pk>/', BlockProfessionalView.as_view(), name='block-professional'),
    path('professionals/unblock/<int:pk>/', UnblockProfessionalView.as_view(), name='unblock-professional'),
    path('locations/update/<int:id>/', LocationUpdateView.as_view(), name='place-update'),
    path('locations/delete/<int:id>/', LocationDeleteView.as_view(), name='place-delete'),
    path('locations/create/', LocationCreateView.as_view(), name='place-create'),
    path('categories/update/<int:id>/', CategoryUpdateView.as_view(), name='categories-update'),
    path('categories/delete/<int:id>/', CategoryDeleteView.as_view(), name='categories-delete'),
    path('categories/create/', CategoryCreateView.as_view(), name='category-create'),



    




    
]
