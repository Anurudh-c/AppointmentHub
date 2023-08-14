# professional_side/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from Client_side.models import Professional,User


@receiver(post_save, sender=User)
def add_user_to_professionals_table(sender, instance, created, **kwargs):
    if instance.is_staff and created:
        # Create a new Professional instance and link it to the User instance
        Professional.objects.create(user=instance)
