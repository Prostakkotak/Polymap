<template>
    <h1 v-if="!group.length">{{ noGroupMessage }}</h1>
    <div v-else-if="isScheduleReady" class="lessons">
        <h1 v-if="noPairs">{{ noPairsMessage }}</h1>

        <div v-if="currentPair" class="lesson_current">
            <span class="pair">Текущая пара</span>
            <h2>{{ currentPair.name }}</h2>
            <div class="lesson__teachers">
                <div v-for="teacher in currentPair.teachers" :key="teacher" class="lesson__teacher">{{ teacher }}</div>
            </div>
            <div class="lesson__info">
                <div class="lesson__address">
                    <img src="../assets/img/logo2.svg" alt="campus">
                    <router-link class="campus-link" :to="'/map/' + mapNameCurrent">{{mapNameCurrent}}</router-link>
                    <!-- Здесь должна выводиться ссылка, если название аудитории - это конкретная аудитория,
                    которая находится в корпусе Политеха, или просто текст, если пара на дистанте  (ЕЩЕ НЕ РЕАЛИЗОВАНО)-->
                </div> 
                <div class="lesson__time">
                    <font-awesome-icon class="time-icon" icon="clock"/>
                    {{ currentPair.timeToEnd }} минут <br> до конца
                </div>
            </div>
        </div>
        <div v-if="nextPair" class="lesson_upcoming">
            <span class="pair">Следующая пара</span>
            <h2>{{ nextPair.name }}</h2>
            <div class="lesson__teachers">
                <div v-for="teacher in nextPair.teachers" :key="teacher" class="lesson__teacher">{{ teacher }}</div>
            </div>
            <div class="lesson__info">
                <div class="lesson__address">
                    <img src="../assets/img/logo2.svg" alt="campus">
                    <router-link class="campus-link" :to="'/map/' + mapNameNext">{{mapNameNext}}</router-link>
                    <!-- Здесь должна выводиться ссылка, если название аудитории - это конкретная аудитория,
                    которая находится в корпусе Политеха, или просто текст, если пара на дистанте (ЕЩЕ НЕ РЕАЛИЗОВАНО)-->
                </div>
                <div class="lesson__time">
                    <font-awesome-icon class="time-icon" icon="clock"/>
                    {{ nextPair.timeToStart }} минут<br> до начала
                </div>
            </div>
        </div>
    </div>
    <Loading v-else-if="!scheduleGroupError && !isScheduleReady" />
    <h1 v-else>Введен неправильный номер группы</h1>
</template>
<script>
import {mapGetters} from 'vuex';
import Loading from './Loading.vue';


export default {
    components: {
        Loading,
    },
    data () {
        return {
            mapNameCurrent: 'Н401',
            mapNameNext: 'Н402',
            currentPair: null,
            nextPair: null,
            noPairsMessage: '',
            noPairs: false,
            noGroupMessage: 'Выберите группу, чтобы получить расписание, или просто перейдите на страницу с картой',
        }
    },
    watch: {
        isScheduleReady(newValue) {
            if (newValue === true) {
                this.getComingLessons();
            }
        }
    },
    computed: {
        ...mapGetters(['schedule', 'group', 'isScheduleReady', 'scheduleGroupError']),
        beautifulTime(minutes) {
            console.log(minutes)
            if (minutes > 60) {
                return `${minutes / 60} ч. ${minutes % 60} мин.`;
            } else {
                return `${minutes} мин.`;
            }
        }
    },
    created () {
        // if (this.isScheduleReady) {
        //     this.getComingLessons();
        // }
    },
    mounted () {
        if (this.isScheduleReady) {
            this.getComingLessons();
        }
        console.log(this.nextPair, this.currentPair, this.isScheduleReady);
    },
    methods: {
        getComingLessons() {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const nowTimeValue = hours * 60 + minutes; // минут сейчас
            const todayPairs = this.isScheduleReady ? this.schedule[date.getDay() - 1] : []; // Пары сегодня
            console.log(todayPairs)
            const lastPair = todayPairs.length ? todayPairs[todayPairs.length - 1] : null; // Последняя пара сегодня
            const lastPairValue = lastPair ? lastPair.time.split('-')[1].split(':')[0] * 60 + (+(lastPair.time.split('-')[1].split(':')[1])) : null; // Ее временной показатель
            if (this.isScheduleReady) {
                if (todayPairs.length === 0 || lastPairValue < nowTimeValue) { // Если нет пар, или они закончились, выводим сообщение
                    this.noPairs = true;
                    
                    this.noPairsMessage = 'Пары закончились или их сегодня нет';
                } else { // Иначе считаем всю инфу про текущую и следующую пару
                    for (let i = 0; i < todayPairs.length; i++) { // цикл по сегодняшним парам

                        const pair = todayPairs[i]; 
                        const pairsTime = pair.time.split('-');
                        const pairsTimeValue = pairsTime[1].split(':')[0] * 60 + (+(pairsTime[1].split(':')[1]))
                        //       ^^^^^^^^ временной показатель пары, нужен для сравнения с nowTimeValue 
                        //                (определяем, относится ли эта пара к текущей или следующей)

                        if (pairsTimeValue - nowTimeValue < 100 && pairsTimeValue - nowTimeValue >= 0) { // Если истина, то эта пара - текущая пара.
                            this.currentPair = pair;
                            const teachersNames = [];
                            for (let j = 0; j < pair.teachers.length; j++) { // Проходимся по циклу преподавателей
                                const teacher = pair.teachers[j].split(' '); // Здесь массив из фамилии, имени и отчества преподавателя
                                let teacherName = '';
                                if (teacher.length === 2) {
                                    teacherName = `${teacher[0]} ${teacher[1]}`;
                                } else {
                                    teacherName = teacher ? `${teacher[0]} ${teacher[1][0]}.${teacher[2][0]}.` : null; // Берем фамилию и инициалы
                                }


                                teachersNames.push(teacherName); // Добавляем результат в массив
                            }

                            this.currentPair.timeToEnd = pairsTimeValue - nowTimeValue;

                            this.currentPair.teachers = teachersNames;


                            

                            if (i < (todayPairs.length - 1)) { // Если за текущей парой есть еще какая то пара, 

                                const nextPair = todayPairs[i + 1];
                                // то эта пара - следующая

                                const teachersNames = [];

                                for (let j = 0; j < nextPair.teachers.length; j++) { // Проходимся по циклу преподавателей
                                    const teacher = nextPair.teachers[j].split(' '); // Здесь массив из фамилии, имени и отчества преподавателя
                                    let teacherName = '';
                                    if (teacher.length === 2) {
                                        teacherName = `${teacher[0]} ${teacher[1]}`
                                    } else {
                                        teacherName = `${teacher[0]} ${teacher[1][0]}.${teacher[2][0]}.`; // Берем фамилию и инициалы
                                    }
                                    teachersNames.push(teacherName); // Добавляем результат в массив
                                }

                                const nextPairsTime = nextPair.time.split('-');
                                const nextPairsTimeValue = nextPairsTime[1].split(':')[0] * 60 + (+(nextPairsTime[1].split(':')[1]))


                                nextPair.teachers = teachersNames;
                                nextPair.timeToStart = nextPairsTimeValue - 90 - nowTimeValue;
                                this.nextPair = nextPair; 
                            }
                            
                        }

                        
                        
                    }
                }

            }
        }
    },
}
</script>
<style scoped>
    .lessons {
        display: flex;
        justify-content: space-between;
        gap: 30px;
    }

    .lesson__info {
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: 30px;
        gap: 10%;

    }

    .lesson__time {
        display: flex;
        align-items: center;
        font-size: 1.8rem;
        gap: 10px;
        font-weight: 300;
        line-height: 30px;
    }

    .lesson__time .time-icon {
        font-size: 3rem;
    }

    .lesson__address {
        display: flex;
        gap: 20px;
        align-items: center;
        font-weight: 300;
        font-size: 1.8rem;
    }

    .lesson_current .campus-link {
        color: #e7e51d;
    }

    .lesson_upcoming .campus-link {
        color: #161be1;
    }

    .lesson__address img {
        width: 28px;
        height: 45px;
    }
    
    .lesson__teachers {
        display: flex;
        justify-content: center;
        gap: 45px;
    }

    .lesson__teacher {
        font-size: 1.5rem;
        font-weight: 300;
        opacity: 0.4;
    }

     .pair {
        opacity: 0.6;
        font-size: 2rem;
        font-weight: 700;
    }

    h2 {
        font-size: 2.2rem;
        font-weight: 300;
        margin: 0 0 15px;
    }

    @media (max-width: 1200px) {
        .lessons {
            margin: 50px 0 100px;
            flex-direction: column;
            gap: 100px;
        }

        .pair {
            max-width: 75%;
            margin: 0 auto 15px;
            text-align: center;
        }
    }

    @media (max-width: 720px) {

        .lesson__teachers {
            gap: 10px;
            flex-direction: column;
        }

        .lesson__info {
            flex-direction: column;
            gap: 30px;
        }
    }
</style>