# Generated by Django 4.1.5 on 2023-08-01 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Professional_side', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professionalavailability',
            name='end_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='professionalavailability',
            name='start_time',
            field=models.TimeField(),
        ),
    ]
