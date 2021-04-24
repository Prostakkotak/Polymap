import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = '3(mudkg)rh8$gjrudijth76w&g)6f_3^5wi#4g_ulaik_rxeeqlo'

DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'std_1388_polymap',
        'USER': 'std_1388_polymap',
        'PASSWORD': 'vaskovsky',
        'HOST': 'std-mysql.ist.mospolytech.ru',
        'PORT': '3306',
    }
}


STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# STATIC_DIR = os.path.join(BASE_DIR, "static")
# STATICFILES_DIRS = (STATIC_DIR,)