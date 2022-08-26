from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient
from .views import UserCustomViewSet


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'Pushkin', 'first_name': 'Александр', 'last_name': 'Пушкин'},
                               format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        user = ModelUser.objects.create(username='Pushkin',
                                        first_name='Александр',
                                        last_name='Пушкин',
                                        email='pushkin@pushkin.pu')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
