<template>
    <div v-if="isScheduleReady" class="tabs">
        <button :class="{active: (activetab === id) || (activetab === undefined && id === today - 1)}" class="tab-button" 
        @click="changeDay(id); activetab=id" v-for="(weekDay, id) in week" :key="weekDay">{{ tabs[id] }} <br> {{weekDay.getDate()}}
        </button>
    </div>
    <h1 v-if="scheduleGroupError">Возможно вы неправильно ввели номер группы (пример 201-322)</h1>
    <div v-else-if="isScheduleReady" class="schedule">
        <day-of-week :selected="selected" :weekDay="weekDay" :daySchedule="schedule[id]" v-for="(weekDay, id) in week" :key="weekDay"></day-of-week>
    </div>
     <Loading v-else />
</template>
<script>
import DayOfWeek from './ScheduleDayOfWeek.vue';
import Loading from './Loading.vue';


import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            tabs: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            selected: null,
        }
    },
    components: {
        DayOfWeek,
        Loading
    },
    computed: {
        isButtonActive(id) {
            if (this.selected === id + 1) {
                return true;
            }

            if (id === this.today - 1) {
                return true;
            }
            return false;
        },
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
        today() {
            const date = new Date();
            return date.getDay();
        },

        ...mapGetters(['schedule', 'group', 'isScheduleReady', 'scheduleGroupError'])
    },
    methods: {
        changeDay(id) {
            this.selected = id + 1;
        }
    }
}
</script>
<style>
.tabs .active {
    opacity: 1;
}

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

.tab-button {
    background-color: transparent;
    border: none;
    color: #fff;
    opacity: .5;
    display: none;
}

.tabs {
    justify-content: space-between;
    display: flex;
    margin-bottom: 35px;
}


@media (max-width: 1320px) {
    .tab-button {
        display: block;
    }

    .schedule__day {
        display: none;
    }
}
    

@media (min-width: 1321px) {

    .schedule__column .schedule__time {
        display: none;
    }

    .schedule__column:first-child .schedule__time {
        display: block;
    }
}   
</style>