from django.apps import AppConfig


class ProfessionalSideConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Professional_side'


    def ready(self):
          import Professional_side.signals  # Import your signals module here
