# Django
from django.shortcuts import render, get_object_or_404, Http404, redirect
from django.views.generic import View
from time import sleep

# Для скрапера
from selenium import webdriver
import os

class Index(View):
    def get(self, request):

        # Драйвер для рендера JS на странице расписания
        driver = webdriver.PhantomJS(
            service_log_path=os.path.devnull,
            executable_path='C:/users/finel/desktop/phantomjs.exe'
        )                  # /home/std/.local/bin/phantomjs для СЕРВЕРА
        driver.get('https://rasp.dmami.ru/?201-322')

        return render(request, 'index.html', context={
            'driver': driver.find_element_by_class_name('schedule-auditory').text,
        })