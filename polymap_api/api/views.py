# Django
from django.shortcuts import render, get_object_or_404, Http404, redirect
from django.views.generic import View
from time import sleep

# Django REST
from rest_framework import views
from rest_framework.response import Response
from .serializers import GroupSerializer

# Для скрапера
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import os
import sys

import regex as re


def deEmojify(text): # Функция для очищения текста от емоджи и лишних пробелов справа/слева
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',text).strip()


class GroupSchedule(views.APIView):
    def get(self, request):

        opts = webdriver.ChromeOptions()
        opts.headless = True
        opts.add_argument('--no-sandbox')
        opts.add_argument('--disable-dev-shm-usage')

        driver = webdriver.Chrome(
            executable_path='C://users//finel//desktop//chromedriver.exe',
            options=opts
        )                  # /home/std/.local/bin/chromedriver для СЕРВЕРА
                            # C://users//finel//desktop//chromedriver.exe для ЛОКАЛКИ

        driver.get('https://rasp.dmami.ru/?' + str(request.GET['group']))
        sleep(5)

        driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")

        data = {"schedule": {}}

        days = driver.find_elements_by_class_name('schedule-day')

        for day in days:

            try:
                day_title = day.find_element_by_class_name('schedule-day__title').text

                data['schedule'][day_title] = []

                for pair in day.find_elements_by_class_name('pair'):
                    try:
                        pair_lesson = pair.find_element_by_css_selector("div.schedule-lesson:not(.schedule-day_old)")

                        pair_obj = {
                            'name': pair_lesson.find_element_by_class_name('bold').text,
                            'auditory': deEmojify(pair_lesson.find_element_by_class_name('schedule-auditory').text),
                            'time': pair.find_element_by_class_name('time').text,
                            'dates': pair_lesson.find_element_by_class_name('schedule-dates').text,
                        }
                        try:
                            pair_obj['teachers']= pair_lesson.find_element_by_tag_name('span').text.split(", ")
                        except NoSuchElementException:
                            pass

                        data["schedule"][day_title].append(pair_obj)
                    except NoSuchElementException:
                        pass

            except NoSuchElementException:
                pass
            

        driver.quit()
        schedule = GroupSerializer(data)

        return Response(schedule.data)
