from django.db import models
from Client_side.models import Professional

# Create your models here.


class ProfessionalAvailability(models.Model):
    professional = models.ForeignKey(Professional, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available=models.BooleanField(default=True)


    def __str__(self):
        return f"{self.professional} - {self.date}"
