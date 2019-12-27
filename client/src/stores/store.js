import Vuex from 'vuex';
import userStore from './userStore';
import Vue from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        userStore
    },
    state: {
        showToast: false,
        toastMsg: '',
        toastTitle: '',
        style: '',
    },
    mutations: {
        showToast: (state, {msg, title = 'Notification', variant = ''}) => {
            state.toastMsg = msg;
            state.toastTitle = title;
            state.style = variant;
            state.showToast = true;
        },
        removeToast: (state) => {
            state.showToast = false;
        }
    }

});

export default store;