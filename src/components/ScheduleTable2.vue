<template>
    <div class="schedule">
        <span class="schedule__lesson-heading">Пара</span>
        <div class="schedule__day">Понедельник</div>
        <div class="schedule__day">Вторник</div>
        <div class="schedule__day">Среда</div>
        <div class="schedule__day">Четверг</div>
        <div class="schedule__day">Пятница</div>
        <div class="schedule__day">Суббота</div>

        <button class="schedule__day_mobile">Пн</button>
        <button class="schedule__day_mobile">Вт</button>
        <button class="schedule__day_mobile">Ср</button>
        <button class="schedule__day_mobile">Чт</button>
        <button class="schedule__day_mobile">Пт</button>
        <button class="schedule__day_mobile">Сб</button>

        <div class="schedule__lesson-number">1</div>
        <div class="schedule__ceil schedule__ceil_active">
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">9:00 - 10:30</span>
            </div>
        </div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>

        <div class="schedule__lesson-number">2</div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil schedule__ceil_active">
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">10:40 - 12:10</span>
            </div>
        </div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>

        <div class="schedule__lesson-number">3</div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>

        <div class="schedule__lesson-number">4</div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>

        <div class="schedule__lesson-number">5</div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil schedule__ceil_active">
            <div class="schedule__lesson">Математический анализ</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">16:10 - 17:40</span>
            </div>        </div>
        <div class="schedule__ceil"></div>

        <div class="schedule__lesson-number">6</div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil schedule__ceil_active">
            <div class="schedule__lesson">Математический анализ</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">17:50 - 19:20</span>
            </div>        </div>
        <div class="schedule__ceil"></div>

        <div class="schedule__lesson-number">7</div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>


    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .schedule__lesson-heading {
        padding: 5px; 
        background-color: var(--orange);
        width: 60px;
        justify-self: center;
        font-size: 18px;
        border-radius: 0 0 10px 10px;
    }


    .schedule__day {
        align-self: center;
    }

    .schedule {
        display: grid;
        grid-template-rows: 40px repeat(6, minmax(60px, auto));
        grid-template-columns: 80px repeat(6, 1fr);
        grid-gap: 5px;
        background-color: #333;
        border-radius: 10px;
        padding: 20px 0 20px 20px;
        min-height: 90vh;
        margin-bottom: 10px;
        position: relative;
    }

    .schedule__lesson {
        margin-bottom: 5px;
        width: 100%;
    }

    .schedule::after {
        content: '';
        position: absolute;
        left: 100%;
        z-index: 12;
        background-color: #1e1e1e;
        height: 100%;
        width: 100vw;
    }
    
    .schedule__info span {
        color: #fff;
        border-radius: 5px;
        padding: 3px;
        display: flex;
        align-items: center;
        text-align: center;
    }

    .schedule__loc {
        background-color: var(--orange);
    }

    .schedule__ceil {
        color: #333;
        text-align: left;
        border-radius: 5px;
        align-items: center;
        padding: 5px;
        z-index: 5;
    }

    .schedule__lesson-number {
        align-self: center;
        padding: 10px;
        background-color: var(--orange);
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-self: center;
        position: relative;
    }

    .schedule__lesson-number::after {
        content: '';
        position: absolute;
        background-color: var(--orange);
        width: 100vw;
        left: 60px;
        height: 2px;
        top: 50%;
        z-index: 1;
        transform: translateY(-50%);
    }

    .schedule__lesson-number:last-child {
        align-self: flex-end
    }

    .schedule__ceil_active {
        background-color: #fff;
        cursor: pointer;
    }

    .schedule__info {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        flex-wrap: wrap;
    }

    .schedule__timeline {
        background-color: var(--purple);
    }

    .schedule__day_mobile {
        display: none;
    }


    @media (max-width: 900px) {
        .schedule__lesson-number::after {
            display: none;
        }

        .schedule::after {
            display: none;
        }

        .schedule__lesson-number, .schedule__lesson-heading {
            display: none;
        }

        .schedule {
            grid-template-columns: repeat(6, minmax(20px, 1fr));
        }

        .schedule__day {
            display: none;
        }

        .schedule__day_mobile {
            display: block;
            border-radius: 15px;
            background-color: #fff;
            color: #1e1e1e;
            border: none;
        }

    }
</style>