<template>
 <div class="schedule__column">
    <h3 class="schedule__day">
        {{ dayOfWeek  }}, {{ day }}
    </h3>
    <div class="schedule__lessons">
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">09:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">10:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">11:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">12:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">13:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">14:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">15:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">16:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">17:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">18:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">19:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">20:00</div>
        </div>
        <div class="schedule__cell">
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div class="schedule__subcell"></div>
            <div v-if="isFirstDayOfWeek" class="schedule__time">21:00</div>
        </div>
    </div>
</div>
</template>
<script>
function createLessonBlock(name, auditory) { /* Функция для создания блока lesson. name - Название пары, auditory - аудитория */

    /* Создание самого блока, элементов внутри него */
    let lessonBlock = document.createElement('div'),
        lessonDecorator = document.createElement('div'),
        lessonName = document.createElement('div'),
        lessonAuditory = document.createElement('div');

    /* Присваиваем классы созданным элементам */
    lessonBlock.classList.add('lesson', 'schedule__lesson')
    lessonDecorator.classList.add('lesson__decorator')
    lessonName.classList.add('lesson__name')
    lessonAuditory.classList.add('lesson__auditory')

    /* Добавляем номер ауд. и название пары текстом в нужные элементы */
    lessonName.textContent = name
    lessonAuditory.textContent = auditory

    /* Пихаем получившиеся элементы внутрь блока lesson */
    lessonBlock.appendChild(lessonName);
    lessonBlock.appendChild(lessonAuditory);
    lessonBlock.appendChild(lessonDecorator);

    return (lessonBlock) /* Результатом работы функции будет возврат готового для вставки HTML элемента */
}

export default {
    props:[
        'weekDay', 'daySchedule',
    ],
    mounted () {
        for (let j = 0; j < this.daySchedule.length; j++) {
            let temp = this.daySchedule[j], /* temp - для хранения объекта пары */
                lessonsList = document.getElementsByClassName('schedule__lessons')[this.weekDay.getDay() - 1]; /* А это элемент колонки с парами, в которую цикл будет добавлять пару */
            console.log(temp, lessonsList)

            let hours = temp['time'].split(':')[0], /* Берем из объекта пары время и режем его чтобы получить час начала занятия (например начало в 16:10, значит мы получим отсюда 16) */
                minutes = temp['time'].split('-')[0].split(':')[1]; /* Тоже самое проделываем чтобы получить минуты начала пары */


            let cell, /* Переменная для номера ячейки часа, в которую будет добавлена пара */
                subcell = +(minutes[0]) /* А здесь уже номер для подъячейки, которая содержится внутри cell, тк подъячеек всего 6 и их индекс соответствует первой цифре минуты начала, то просто берем из minutes первый символ строки */

            /* 

                Отвечает за назначение номера ячейки часа, в каждом блоке schedule__lessons есть ячейки shedule__cell,
                каждая на таймлайне длинною в час. Соответственно каждая подъячейка внутри отвечает за 10 минут на таймлайне, поскольку их там всегда 6
            */
            cell = +(hours) - 9;


            /* 
                По итогу мы имеем индекс для выбора нужной ячейки и индекс для выбора нужной подъячейки.

                Ниже в список пар на нужный день добавляется элемент пары, сначала находится нужная ячейка (getElementsByClassName('schedule__cell')[+cell]),
                потом в этой ячейке находится нужная подъячейка (getElementsByClassName('schedule__subcell')[+subcell]),
                и затем уже добавляем в подъячейку HTML элемент пары (HTML элемент генерируем функцией createLessonBlock)
            */
            
            lessonsList.getElementsByClassName('schedule__cell')[+cell]
            .getElementsByClassName('schedule__subcell')[+subcell]
            .appendChild(createLessonBlock(temp['name'], temp['auditory']))
    }
    },
    computed: {
        dayOfWeek() {
            let options = { weekday: 'long'};
            let day = new Intl.DateTimeFormat('ru-RU', options).format(this.weekDay);
            return day;
        },
        day() {
            return this.weekDay.getDate();
        },
        isFirstDayOfWeek() {
            return this.weekDay.getDay() === 1;
        }
    },
}
</script>
<style>
    
</style>