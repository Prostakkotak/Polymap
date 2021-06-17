<template>
    <keep-alive>
        <form @submit.prevent="submitForm">
            <h1>
                <slot></slot>
            </h1>
            <div class="form-group">
                <input type="text" v-model="inputGroup">
                <button>></button>
            </div>
            <div v-if="isntValide" class="invalide">
            <font-awesome-icon class="triangle" icon="exclamation-triangle"/> <h2>Группа не была найдена</h2>
            </div>
        </form>
    </keep-alive>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            isntValide: false,
            inputGroup: '',
        }
    },
    created () {
        if (this.group !== null) {
            this.inputGroup = this.group;
        }
    },
    computed: {
        ...mapGetters(['group', 'schedule', 'isScheduleReady'])
    },
    methods: {
        ...mapActions(['selectGroup', 'getSchedule']),
        submitForm() {
            if (this.inputGroup === '') {
                this.isntValide = true;
            } else {
                this.selectGroup(this.inputGroup);
                this.$router.push('/');
                this.isntValide = false;
                this.getSchedule();
            }
        }
    },
}
</script>
<style scoped>
    input {
        background-color: #fff;
        border-radius: 0 5px 5px 0;
        padding: 10px 15px;
        font-size: 2rem;
        font-family: "Proxima Nova", Arial, Helvetica, sans-serif;
        color: #b2b2b2;
        transition: 0.6s border-radius ease;
    }

    .invalide {
        margin-top: 30px;
        background-color: #fff;
        padding: 10px 30px;
        color: #333;
        display: flex;
        align-items: center;
        border-radius: 10px;
    }

    .triangle {
        font-size: 26px;
        color: #fb171d;
        order: 2;
        margin-left: auto;
    }

    .form-group {
        position: relative;
    }

    button {
        position: absolute;
        right: 10px;
        top: 8px;
        color: #fff;
        border: none;
        font-size: 40px;
        font-weight: 700;
        cursor: pointer;
        bottom: 8px;
        width: 80px;
        background-color: #101316;
        border-radius: 5px;
    }

    input:focus {
        border-radius: 20px;
    }


    h1 {
        font-size: 3rem;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        margin-bottom: 30px;
    }


    @media (max-width: 720px) {
        form {
            width: 80%;
        }

        input {
            width: 100%;
        }

        button {
            width: 40px;
            font-size: 18px;
        }

    }
</style>