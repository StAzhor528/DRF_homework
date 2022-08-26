from datetime import datetime

from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    users = models.ManyToManyField(CustomUser)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
