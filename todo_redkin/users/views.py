from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin

from rest_framework.viewsets import GenericViewSet
from .models import CustomUser
from .serializers import UserModelSerializer


class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet, CreateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]