from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_('email adress'), unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.email}'
