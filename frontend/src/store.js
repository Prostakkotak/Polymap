import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            group: localStorage.group || null,
        }
    },
    getters: {
        group(state) {
            return state.group;
        }
    },
    mutations: {
        selectGroup(state, newGroup) {
            state.group = newGroup;
            localStorage.group = newGroup;
        }
    },
    actions: {
        selectGroup(context, payload) {
            context.commit('selectGroup', payload);
        }
    }
})

export default store;