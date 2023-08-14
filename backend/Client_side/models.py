from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin,Group,Permission

# Create your models here.


class UserManager(BaseUserManager):
    def _create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=200, blank=True)
    profile_pic = models.ImageField(upload_to="profile_pics/")

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name='client_side_user_set'  # Unique related_name
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='client_side_user_set'  # Unique related_name
    )
    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Place(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Professional(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    place = models.ForeignKey(Place, on_delete=models.SET_NULL, null=True)


    def __str__(self):
        return self.user.username


class Description(models.Model):
    text = models.TextField()
    professional = models.ForeignKey('Professional', on_delete=models.CASCADE)

    def __str__(self):
        return self.text


class Image(models.Model):
    image = models.ImageField(upload_to="staff_images/")
    professional = models.ForeignKey('Professional', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.image)


class Bookings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    professional = models.ForeignKey('Client_side.Professional', on_delete=models.CASCADE, related_name='bookings', null=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    documents = models.FileField(upload_to='documents/', null=True, blank=True)
    payment = models.BooleanField(default=False)
    amount = models.IntegerField()  

    def __str__(self):
        return f"Booking {self.id} - {self.user.username} "

 




