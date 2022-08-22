from django.contrib import admin

from todoapp.models import Project, TODO

admin.site.register(Project)
admin.site.register(TODO)
