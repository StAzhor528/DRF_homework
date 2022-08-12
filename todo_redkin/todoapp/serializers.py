from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, TODO
from users.serializers import UserModelSerializer


class ProjectHyperlinkedSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['title', 'users', 'link']


class TODOHyperlinkedSerializer(HyperlinkedModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = TODO
        fields = ['project', 'text', 'user', ]
