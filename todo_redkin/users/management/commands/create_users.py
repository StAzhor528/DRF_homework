from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    help = 'Создание суперпользователя и тестовых пользователей'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        CustomUser.objects.all().delete()
        user_count = options['count']

        CustomUser.objects.create_superuser('Ivan', 'ivan@ivan.iv', '123', first_name='Ivan', last_name='Ivanov')

        for i in range(user_count):
            CustomUser.objects.create_user(f'user{i}', f'user{i}@user.user', f'user{i}', first_name=f'user{i}', last_name=f'user{i}')