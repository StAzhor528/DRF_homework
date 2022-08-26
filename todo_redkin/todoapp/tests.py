from rest_framework import status
from rest_framework.test import APITestCase


class TestTODOViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

