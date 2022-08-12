from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from .serializers import ProjectHyperlinkedSerializer, TODOHyperlinkedSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedSerializer


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkedSerializer
