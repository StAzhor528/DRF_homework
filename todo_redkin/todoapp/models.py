from datetime import datetime

from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    users = models.ManyToManyField(User)
    link = models.URLField()


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
