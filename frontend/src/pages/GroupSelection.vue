<template>
    <div class="group-selection-wrapper">
        <group-form class="group-input">
            Ваша группа?
        </group-form>
        <div class="logo-polymap">
            <img src="../assets/img/logo.svg" alt="polymap">
        </div>
    </div>
</template>
<script>
import GroupForm from '../components/GroupForm.vue';
export default {
    components: {
        GroupForm,
    },
}
</script>
<style scoped>
    .group-selection-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 0;
        bottom: 0;
        position: absolute;
        padding: 70px 0;
        left: 0;
        right: 0;
    }

    .group-input {
        margin: auto 0;
    }

    .logo-polymap {
        margin-top: auto;
    }


    @media (max-width: 720px) {
        .logo-polymap {
            order: -1;
            margin-top: 0;
            width: 150px;
        }
    }

</style>