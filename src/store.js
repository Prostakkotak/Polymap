import { createStore } from 'vuex';
import axios from 'axios';
const store = createStore({
    state() {
        return {
            group: localStorage.group || null,
            schedule: null,
            isScheduleReady: null,
            scheduleGroupError: false
        }
    },
    getters: {
        scheduleGroupError(state) {
            return state.scheduleGroupError;
        },
        group(state) {
            return state.group;
        },
        
        schedule(state) {
            return state.schedule;
        },

        isScheduleReady(state) {
            return state.isScheduleReady;
        }
    },
    mutations: {
        selectGroup(state, newGroup) {
            state.group = newGroup;
            localStorage.group = newGroup;
            state.isScheduleReady = false;
            state.scheduleGroupError = false;
        },
        getSchedule(state) {
            axios.get(`http://polymap-api.std-1388.ist.mospolytech.ru/?group=${state.group}&format=json`)
            .then(response => {
                if (!response.data.schedule.length) {
                    throw 'error';
                } else {
                    state.schedule = response.data.schedule;
                    state.isScheduleReady = true;
                    state.scheduleGroupError = false;
                }

            })
            .catch(() => {
                state.scheduleGroupError = true;
            })
            // state.schedule = scheduleJSON;
            // localStorage.schedule = scheduleJSON;
        }

    },
    actions: {
        selectGroup(context, payload) {
            context.commit('selectGroup', payload);
        },
        getSchedule(context, payload) {
            context.commit('getSchedule', payload);
        } 
    }
})

export default store;