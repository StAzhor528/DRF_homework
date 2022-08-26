from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from .serializers import ProjectHyperlinkedSerializer, TODOHyperlinkedSerializer, ProjectSerializerBase, \
    TODOSerializerBase


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    pagination_class = ProjectLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectHyperlinkedSerializer
        return ProjectSerializerBase

    def get_queryset(self):
        return Project.objects.filter(name__contains='test')


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkedSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_fields = ['project']

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TODOHyperlinkedSerializer
        return TODOSerializerBase

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
