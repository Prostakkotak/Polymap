<template>
    <h1 v-if="scheduleGroupError">Возможно вы неправильно ввели номер группы (пример 201-322)</h1>
    <div v-else-if="isScheduleReady" class="schedule">
        <day-of-week :weekDay="weekDay" :daySchedule="schedule[id]" v-for="(weekDay, id) in week" :key="weekDay"></day-of-week>

    </div>

    <Loading v-else />
</template>
<script>
import DayOfWeek from './ScheduleDayOfWeek.vue';
import Loading from './Loading.vue';


// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
        }
    },
    components: {
        DayOfWeek,
        Loading
    },
    computed: {
        week() {
            if (this.schedule.length) {
                let date = new Date();
                let week = [];
                for (let i = 1; i <= 6; i++) {
                    let first = date.getDate() - date.getDay() + i;
                    let day = new Date(date.setDate(first));
                    week.push(day);
                }
                return week;
            }
            return [];
        },

        ...mapGetters(['schedule', 'group', 'isScheduleReady', 'scheduleGroupError'])
    },
    methods: {
        ...mapActions(['getSchedule'])
    },
    created() {
        // localStorage.clear()
        console.log(this.schedule)
        if (((this.schedule === null || this.schedule.length === 0) && this.group) || (this.group && !this.isScheduleReady)) {
            this.getSchedule();
        }
        // axios.get(`http://polymap-api.std-1388.ist.mospolytech.ru/?group=${this.group}&format=json`)
        // .then(response => {
        //     this.scheduleJSON = response.data.schedule;
        //     console.log(this.scheduleJSON);
        // })
        // .finally(() => {
        //     // this.loading = false;
        //     // console.log(this.scheduleJSON.data.schedule)
            // for (let i = 0; i < this.scheduleJSON.length; i++) { /* Прогоняем JSON через цикл */
            //     for (let j = 0; j < this.scheduleJSON[i].length; j++) {
            //         let temp = this.scheduleJSON[i][j], /* temp - для хранения объекта пары */
            //             lessonsList = document.getElementsByClassName('schedule__lessons')[i]; /* А это элемент колонки с парами, в которую цикл будет добавлять пару */

            //         let hours = temp['time'].split(':')[0], /* Берем из объекта пары время и режем его чтобы получить час начала занятия (например начало в 16:10, значит мы получим отсюда 16) */
            //             minutes = temp['time'].split('-')[0].split(':')[1]; /* Тоже самое проделываем чтобы получить минуты начала пары */


            //         let cell, /* Переменная для номера ячейки часа, в которую будет добавлена пара */
            //             subcell = +(minutes[0]) /* А здесь уже номер для подъячейки, которая содержится внутри cell, тк подъячеек всего 6 и их индекс соответствует первой цифре минуты начала, то просто берем из minutes первый символ строки */

            //         /* 

            //             Отвечает за назначение номера ячейки часа, в каждом блоке schedule__lessons есть ячейки shedule__cell,
            //             каждая на таймлайне длинною в час. Соответственно каждая подъячейка внутри отвечает за 10 минут на таймлайне, поскольку их там всегда 6
            //         */
            //        cell = +(hours) - 9;


            //         /* 
            //             По итогу мы имеем индекс для выбора нужной ячейки и индекс для выбора нужной подъячейки.

            //             Ниже в список пар на нужный день добавляется элемент пары, сначала находится нужная ячейка (getElementsByClassName('schedule__cell')[+cell]),
            //             потом в этой ячейке находится нужная подъячейка (getElementsByClassName('schedule__subcell')[+subcell]),
            //             и затем уже добавляем в подъячейку HTML элемент пары (HTML элемент генерируем функцией createLessonBlock)
            //         */
                    
            //         lessonsList.getElementsByClassName('schedule__cell')[+cell]
            //         .getElementsByClassName('schedule__subcell')[+subcell]
            //         .appendChild(createLessonBlock(temp['name'], temp['auditory']))
            // }}
        // })
        // this.scheduleJSON = JSON.parse(this.schedule) /* ОБЪЕКТ С РАСПИСАНИЕМ */


        /* 

        НАСЧЕТ РАБОТЫ API

        API возвращает объект со списком списков пар на каждый день, например список пар на понедельник это будет scheduleJSON[0] и тд.

        В списке scheduleJSON[0] содержатся объекты пар, которые содержат в себе время, ауд., название, даты действительности, преподавательский состав пары.

        Ниже есть цикл со вложенным циклом, внешний цикл идет по дням, внутренний идет по парам на этот день
                
        */


    }
}
</script>
<style>

.schedule {
    display: flex;
    padding-left: 50px;
    width: 100%;
    justify-content: center;
}

.schedule__column {
    width: 100%;
}

.schedule__lessons {
    margin-top: 20px;
    padding-top: 10px;
    border-right: 1px solid rgba(255, 255, 255, .2);
}

.schedule__cell {
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, .2);
}

.schedule__subcell {
    position: relative;
    height: 15px;
}

.schedule__time {
    position: absolute;
    top: 0;
    left: -70px;
    transform: translate(0, -50%);
    font-size: 15px;
    color: rgba(255, 255, 255, .5);
}

.lesson {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right: 0;
    padding: 15px;
    background-color: #000;
    border-radius: 5px;
    height: 135px;
    width: 90%;
    text-align: left;
    z-index: 1000;
}

.lesson__auditory {
    position: absolute;
    bottom: 10px;
    left: 15px;
    display: inline-block;
    padding: 3px;
    border-radius: 3px;
    text-transform: uppercase;
    background-color: #C238EB;
    color: #fff;
}

.lesson__decorator {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    height: 100%;
    width: 4px;
    background-color: #C238EB;
}

.schedule__day {
    text-transform: capitalize;
}
    
</style>