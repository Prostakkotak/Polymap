<template>
    <div class="schedule">


        <div class="schedule__day">  <!-- Понедельник -->
            Понедельник
        </div>
        <button class="schedule__day_mobile">Пн</button>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 1 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">9:00 - 10:30</span>
            </div>
        </div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 1 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">10:40 - 12:10</span>
            </div>
        </div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 1 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">12:20 - 1:50</span>
            </div>
        </div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div> <!-- 7 пара -->


        <div class="schedule__day">Вторник</div> <!-- Вторник -->
        <button class="schedule__day_mobile">Вт</button>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 1 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">9:00 - 10:30</span>
            </div>
        </div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 1 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">10:40 - 12:10</span>
            </div>
        </div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>



        <div class="schedule__day">Среда</div> <!-- Среда -->
        <button class="schedule__day_mobile">Ср</button>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 1 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">9:00 - 10:30</span>
            </div>
        </div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 2 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">10:40 - 12:10</span>
            </div>
        </div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 3 пара -->
            <div class="schedule__lesson">Навыки эффективной презентации</div> 
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">12:20 - 13:50</span>
            </div>
        </div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>


        <div class="schedule__day">Четверг</div> <!-- Четверг -->
        <button class="schedule__day_mobile">Чт</button>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>



        <div class="schedule__day">Пятница</div> <!-- Пятница -->
        <button class="schedule__day_mobile">Пт</button>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil"></div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 5 пара -->
            <div class="schedule__lesson">Математический анализ</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">16:10 - 17:40</span>
            </div>        
        </div>
        <div class="schedule__ceil schedule__ceil_active"> <!-- 6 пара -->
            <div class="schedule__lesson">Математический анализ</div>
            <div class="schedule__info">
                <span class="schedule__loc">Н319</span>
                <span class="schedule__timeline">17:50 - 19:20</span>
            </div>       
         </div>
        <div class="schedule__ceil"></div>



        <div class="schedule__day">Суббота</div> <!-- Суббота -->
        <button class="schedule__day_mobile">Сб</button>

        <div class="schedule__ceil"></div>
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
        position: relative;
    }

    .schedule {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: 40px repeat(7, minmax(60px, auto));
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 5px;
        background-color: #333;
        border-radius: 10px;
        padding: 20px;
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
        position: relative;
    }

    /* .schedule__ceil:before {
        content: '';
        position: absolute;
        background-color: var(--orange);
        width: 100vw;
        left: -20px;
        height: 2px;
        top: 50%;
        z-index: 1;
        transform: translateY(-50%);
    } */

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