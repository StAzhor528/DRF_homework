from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from users.views import UserCustomViewSet
from todoapp.views import ProjectModelViewSet, TODOViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title='TODO_Redkin',
        default_version='0.1',
        description='Documentation',
        contact=openapi.Contact(email='admin@admin.admin'),
        license=openapi.License(name='Redkin License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

router = DefaultRouter()
router.register('users', UserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', TODOViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),


    path('swagger<str:format>/', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger')),

    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
