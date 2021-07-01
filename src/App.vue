<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  computed: {
      ...mapGetters(['schedule', 'group', 'isScheduleReady',])
  },
  methods: {
    ...mapActions(['getSchedule'])
  },
  created () {
    if (this.group === null) {
      this.$router.push('select-group')
    }
    if (((this.schedule === null || this.schedule.length === 0) && this.group) || (this.group && !this.isScheduleReady)) {
        this.getSchedule();
    }
  },
}
</script>

<style>

@font-face {
    font-family: 'Proxima Nova';
    src: url('./assets/fonts/ProximaNova-Bold.eot');
    src: local('Proxima Nova Bold'), local('ProximaNova-Bold'),
        url('./assets/fonts/ProximaNova-Bold.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/ProximaNova-Bold.woff2') format('woff2'),
        url('./assets/fonts/ProximaNova-Bold.woff') format('woff'),
        url('./assets/fonts/ProximaNova-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Proxima Nova';
    src: url('./assets/fonts/ProximaNova-Regular.eot');
    src: local('Proxima Nova Regular'), local('ProximaNova-Regular'),
        url('./assets/fonts/ProximaNova-Regular.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/ProximaNova-Regular.woff2') format('woff2'),
        url('./assets/fonts/ProximaNova-Regular.woff') format('woff'),
        url('./assets/fonts/ProximaNova-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}



@font-face {
    font-family: 'Proxima Nova';
    src: url('./assets/fonts/ProximaNova-Light.eot');
    src: local('Proxima Nova Light'), local('ProximaNova-Light'),
        url('./assets/fonts/ProximaNova-Light.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/ProximaNova-Light.woff2') format('woff2'),
        url('./assets/fonts/ProximaNova-Light.woff') format('woff'),
        url('./assets/fonts/ProximaNova-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}

body {
  position: relative;
}

:root {
  --orange: #ff8c00;
  --purple: #d043e6;
  --green: #31cb00;
  --red: #ff0000;
}

html {
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  width: 100%;
  display: block;
  height: auto;
}

#app {
  font-family: 'Proxima Nova', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  overflow-x: hidden;
  background-color: #1e1e1e;
  min-height: 100vh;
  padding-top: 120px;
  overflow-y: hidden;
}

ul {
  list-style: none;
}

input:focus, button:focus {
  outline: none;
}

.exam {

}

.schedule__lessons .consultation {
  background-color: #fff;
  color: #333;
}

.schedule__lessons .exam {
  background-color: var(--red);
  color: #fff;
}

.schedule__lessons .credit {
  background-color: var(--green);
  color: #fff;
}
</style>
