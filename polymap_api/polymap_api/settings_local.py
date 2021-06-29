import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = '3(mytum)rh8$ttgx6p4x76w&g)6f_3^5wi#4g_4vku_rxeeqlo'

DEBUG = True

ALLOWED_HOSTS = ["*"]

CORS_ALLOW_ALL_ORIGINS = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join('db.sqlite3'),
    }
}

STATIC_URL = '/static/'
STATIC_DIR = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = (STATIC_DIR,)