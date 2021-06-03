<template>
    <the-header></the-header>
    <div class="schedule-wrapper">
          <schedule-table></schedule-table>
    </div>
</template>
<script>
import ScheduleTable from '../components/ScheduleTable3.vue';
export default {
  components: { ScheduleTable },
}
</script>
<style scoped>
.schedule-wrapper {
  padding: 0px 65px;
}

@media (max-width: 900px) {
    .schedule-wrapper {
        padding: 0 30px;
    }

}
</style>