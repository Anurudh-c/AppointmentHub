from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt import views as jwt_views



urlpatterns =[

    path('admin/', admin.site.urls),
    path('',include('Client_side.urls')),
    path('professional/',include('Professional_side.urls')),
    path('Admin_side/',include('Admin_side.urls')),
    #<<<<<<<<<<<<<<<<<<< Below two urls are related to jwt token >>>>>>>>>>>>>>>>>>>>>>>>>>>#
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),

     
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


