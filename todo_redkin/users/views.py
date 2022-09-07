from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerWithSuperUserAndStaff


class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet, CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerWithSuperUserAndStaff
        return UserModelSerializer
