from datetime import datetime

from django.db import models
from users.models import User


class Project(models.Model):
    title = models.CharField(max_length=64)
    users = models.ManyToManyField(User)
    link = models.URLField()


class TODO(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(default=datetime.now())
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
