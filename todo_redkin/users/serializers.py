from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUser


class UserModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email']


class UserModelSerializerWithSuperUserAndStaff(HyperlinkedModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']
