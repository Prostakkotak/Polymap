# Django
from django.shortcuts import render, get_object_or_404, Http404, redirect
from django.views.generic import View
from time import sleep # this should go at the top of the file

# Selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


class Index(View):
    def get(self, request):
        url = "https://rasp.dmami.ru/?201-322"

        options = Options()
        options.headless = True
        options.add_argument("--window-size=1920,1080")

        driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        driver.get(url)

        sleep(5)
        driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")

        aud = driver.find_element_by_class_name('schedule-auditory').text

        return render(request, 'index.html', context={
            'driver': aud,
        })
