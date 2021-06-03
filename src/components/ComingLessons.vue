<template>
    <div class="lessons">
        <div class="lesson_current">
            <span class="pair">Текущая пара</span>
            <h2>Название предмета слишком длинное</h2>
            <div class="lesson__teachers">
                <div class="lesson__teacher">Преподаватель И.О.</div>
                <div class="lesson__teacher">Преподаватель И.О.</div>
            </div>
            <div class="lesson__info">
                <div class="lesson__address">
                    <img src="../assets/img/logo2.svg" alt="campus">
                    <router-link class="campus-link" :to="'/map/' + mapNameCurrent">{{mapNameCurrent}}</router-link>
                </div> 
                <div class="lesson__time">
                    <font-awesome-icon class="time-icon" icon="clock"/>
                    10 мин <br> до конца</div>
            </div>
        </div>
        <div class="lesson_upcoming">
            <span class="pair">Следующая пара</span>
            <h2>Название предмета слишком длинное</h2>
            <div class="lesson__teachers">
                <div class="lesson__teacher">Преподаватель И.О.</div>
            </div>
            <div class="lesson__info">
                <div class="lesson__address">
                    <img src="../assets/img/logo2.svg" alt="campus">
                    <router-link class="campus-link" :to="'/map/' + mapNameNext">{{mapNameNext}}</router-link>
                </div>
                <div class="lesson__time">
                    <font-awesome-icon class="time-icon" icon="clock"/>
                    10 мин <br> до начала</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            mapNameCurrent: 'Н401',
            mapNameNext: 'Н402',
        }
    }
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
        font-size: 30px;
        gap: 10px;
        font-weight: 300;
        line-height: 30px;
    }

    .lesson__time .time-icon {
        font-size: 45px;
    }

    .lesson__address {
        display: flex;
        gap: 20px;
        align-items: center;
        font-weight: 300;
        font-size: 30px;
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
        font-size: 26px;
        font-weight: 300;
        opacity: 0.4;
    }

     .pair {
        opacity: 0.6;
        font-size: 36px;
        font-weight: 700;
    }

    h2 {
        font-size: 58px;
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
        .pair {
            font-size: 30px;
        }

        .pair {
            font-size: 34px;
        }

        .lesson__teacher {
            font-size: 20px;
        }

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