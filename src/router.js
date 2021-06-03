import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './pages/NotFound.vue';
import GroupSelection from './pages/GroupSelection.vue';
import MainPage from './pages/MainPage.vue';
import SchedulePage from './pages/SchedulePage.vue';
import MapPage from './pages/MapPage';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/select-group',
            component: GroupSelection,
        },
        {
            path: '/schedule',
            component: SchedulePage,
        },
        {
            path: '/map/:name',
            component: MapPage,
        },
        {
            path: '/map',
            component: MapPage,
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
});

export default router;