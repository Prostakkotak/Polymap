<template>
    <the-header></the-header>
    <main class="main">
        <coming-lessons></coming-lessons>
    </main>
</template>
<script>
import ComingLessons from '../components/ComingLessons.vue';
export default {
    components: {
        ComingLessons,
    },
}
</script>
<style>
    .main {
        padding: 10px 65px;
        display: grid;
        place-content: center;
        min-height: calc(100vh - 200px)
    }
</style>