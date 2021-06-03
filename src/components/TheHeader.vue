<template>
    <header>
        <div class="logo-polymap">
            
        </div>
        <nav class="nav">
            <ul class="menu">
                <li class="menu__item">
                    <router-link 
                    to="/"
                    class="menu__link">Главная</router-link>
                </li>
                <li class="menu__item">
                    <router-link 
                    to="/schedule"
                    class="menu__link">Расписание</router-link>
                </li>
                <li class="menu__item">
                    <router-link 
                    to="/map"
                    class="menu__link">Карта</router-link>
                </li>
            </ul>
        </nav>
        <selected-group></selected-group>

        <the-hamburger @click="toggleMenu" class="hamburger"></the-hamburger>

    </header>
</template>
<script>
import SelectedGroup from './SelectedGroup.vue';
import TheHamburger from './TheHamburger.vue';
export default {
    components: {
        SelectedGroup,
        TheHamburger
    },
    methods: {
        toggleMenu() {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('nav_visible');
        }
    },
}
</script>
<style scoped>
    .logo-polymap {
        background: url('../assets/img/logo.svg') no-repeat;
        width: 215px;
        height: 60px;
    }

    header {
        display: flex;
        justify-content: space-between;
        padding: 10px 65px;
        align-items: center;
        background-color: #1e1e1e;
        -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10001;
    }

    .hamburger {
        display: none;
    }

    .menu {
        display: flex;
        gap: 70px;
    }

    .menu__link {
        color: #fff;
        text-decoration: none;
        font-size: 32px;
        font-weight: 300;
        position: relative;
    }

    .menu__link:after {
        display: block;
        content: '';
        border-bottom: solid 3px #fff;
        transform: scaleX(0);
        transition: transform .5s ease-in-out;
        transform-origin: 100% 50%;
    }

    .menu__link:hover:after {
        transform: scaleX(1);
        transform-origin: 0 50%;
    }

    .router-link-active:after {
        transform: scaleX(1);
        transform-origin: 0 50%;
    }

    @media (max-width: 1070px) {
        .nav {
            position: absolute;
            transform: translateX(100%);
            left: 20%;
            right: 0;
            bottom: 0;
            top: 0;
            transition: 0.6s ease all;
            z-index: 15;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #333;
            height: 100vh;
        }

        .menu {
            flex-direction: column;
            align-items: flex-end;
        }

        .menu__link {
            font-size: 48px;
        }

        .nav_visible {
            transform: translateX(0);
        }
        

        .hamburger {
            display: block;
            position: relative;
            z-index: 101;
        }
    }

    @media (max-width: 720px) {
        .logo-polymap {
            background: url('../assets/img/logo1.svg') no-repeat center;
            width: 100px;
            height: 90px;
            background-size: 60%;
        }
    }
    @media (max-width: 576px) {
        header {
            padding: 10px 20px;
        }
    }

    @media (max-width: 420px) {
        .logo-polymap {
            background: none;
            display: none;
        }
    }
</style>