from django.contrib import admin
from .models import User,Category,Place,Professional,Image,Description,Bookings


# Register your models here.

admin.site.register([User,Category,Place,Professional,Image,Description,Bookings])
