# Django REST
from rest_framework import views
from rest_framework.response import Response
from .serializers import GroupSerializer

# Selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager

# Остальное
import regex as re
from time import sleep
from datetime import datetime
from polymap_api.settings import DRIVER_PATH


def deEmojify(text):  # Функция для очищения текста от емоджи и лишних пробелов справа/слева
    regrex_pattern = re.compile(pattern="["
                                u"\U0001F600-\U0001F64F"
                                u"\U0001F300-\U0001F5FF"
                                u"\U0001F680-\U0001F6FF"
                                u"\U0001F1E0-\U0001F1FF"
                                "]+", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text).strip()


class GroupSchedule(views.APIView):
    def get(self, request):
        currentDate = datetime.today()
        currentYear = currentDate.year

        opts = webdriver.ChromeOptions()
        opts.headless = True
        opts.add_argument('--no-sandbox')
        opts.add_argument('--disable-dev-shm-usage')

        driver = webdriver.Chrome(
            executable_path=DRIVER_PATH,  # Берем путь драйвера из настроек
            options=opts
        )

        driver.get('https://rasp.dmami.ru/session?' +
                   str(request.GET['group']))
        sleep(0.2)

        data = {"schedule": []}

        # Проверка на дату, если сейчас идет сессия то API возвратит расписание в другом формате
        if not (currentDate > datetime(currentYear, 6, 15) and currentDate < datetime(currentYear, 8, 1)) or (currentDate > datetime(currentYear, 1, 10) and currentDate < datetime(currentYear, 2, 13)):

            days = driver.find_elements_by_class_name('schedule-day')

            i = 0
            for day in days:
                try:

                    data['schedule'].append([])

                    for pair in day.find_elements_by_class_name('pair'):
                        try:
                            pair_lesson = pair.find_element_by_css_selector(
                                "div.schedule-lesson:not(.schedule-day_old)")

                            pair_obj = {
                                'name': pair_lesson.find_element_by_class_name('bold').text,
                                'auditory': deEmojify(pair_lesson.find_element_by_class_name('schedule-auditory').text),
                                'time': pair.find_element_by_class_name('time').text,
                                'dates': pair_lesson.find_element_by_class_name('schedule-dates').text,
                            }

                            try:
                                pair_obj['teachers'] = pair_lesson.find_element_by_tag_name(
                                    'span').text.split(", ")
                            except NoSuchElementException:
                                pass

                            data["schedule"][i].append(pair_obj)
                        except NoSuchElementException:
                            pass

                except NoSuchElementException:
                    pass

                i += 1

            driver.quit()

        else:

            weeks = driver.find_elements_by_class_name('schedule-week')

            j = 0
            for week in weeks:

                # На фронте нам нужна только текущая неделя, поэтому выбираем с помощью условия именно её
                if (week.find_elements_by_class_name('schedule-day_today')):
                    i = 0
                    days = week.find_elements_by_class_name('schedule-day')
                    for day in days:
                        try:

                            data['schedule'].append([])

                            for pair in day.find_elements_by_class_name('pair'):
                                try:
                                    pair_lesson = pair.find_element_by_css_selector(
                                        "div.schedule-lesson:not(.schedule-day_old)")

                                    pair_obj = {
                                        'name': pair_lesson.find_element_by_class_name('bold').text,
                                        'auditory': deEmojify(pair_lesson.find_element_by_class_name('schedule-auditory').text),
                                        'time': pair.find_element_by_class_name('time').text,
                                    }

                                    try:
                                        pair_obj['teachers'] = pair_lesson.find_element_by_tag_name(
                                            'span').text.split(", ")
                                    except NoSuchElementException:
                                        pass

                                    data["schedule"][i].append(pair_obj)
                                except NoSuchElementException:
                                    pass

                        except NoSuchElementException:
                            pass

                        i += 1
                j += 1

            driver.quit()

        schedule = GroupSerializer(data)

        return Response(schedule.data)
