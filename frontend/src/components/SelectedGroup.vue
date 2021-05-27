<template>
    <div class="group">
        <router-link to="/select-group" class="edit-group">
            {{group}}
            <font-awesome-icon class="icon" icon="pen"/>
        </router-link>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['group'])
    },
}
</script>
<style scoped>

    .edit-group {
        display: flex;
        align-items: center;
        text-decoration: none;
        background: transparent;
        border: none;
        color: #fff;
        opacity: 0.7;
        cursor: pointer;
        font-size: 32px;
        transition: 0.4s ease opacity;
    }

    .edit-group:hover {
        opacity: 1;
    }

    .icon {
        margin-left: 15px;
    }

</style>