# Generated by Django 4.1.5 on 2023-08-05 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Client_side', '0007_bookings_availability_bookings_professional'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookings',
            name='availability',
        ),
    ]
