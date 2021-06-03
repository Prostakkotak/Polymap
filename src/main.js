import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TheHeader from './components/TheHeader.vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';

library.add([faPen, faClock, faBars, faExclamationTriangle]);

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(axios);
// app.use(VueAxios);


app.component('the-header', TheHeader);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
