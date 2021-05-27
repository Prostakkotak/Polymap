<template>
    <the-header></the-header>
    <div class="not-found">
        <span>404</span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 75vh;
        justify-content: center;
    }
    

    span {
        background-color: #fff;
        color: #333;
        font-size: 62px;;
        border-radius: 0 40px 0 40px;
        padding: 10px 40px;
    }
</style>