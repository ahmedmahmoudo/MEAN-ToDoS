import store from '../stores/store';
import Vue from 'vue';
import {fetchUser} from '../utils/userUtils';

export const checkIfNotLoggedIn = (to, from, next) => {
    if(store.state.userStore.user) {
        next({name: 'Dashboard'});
    }
    next();
}

export const checkIfLoggedIn = async (to, from , next) => {
    if(store.state.userStore.user) {
        next();
        return;
    } else if(Vue.$cookies.get('_token')) {
        try {
            let fetched = await fetchUser(Vue.$cookies.get('_token'));
            if(fetched.data) {
                store.commit('setUser', fetched.data);
                next();
            }
        } catch {
            store.commit('showToast', {msg: 'Your session has expired, please log in again!', title: 'ERROR!', variant:'danger'});
            Vue.$cookies.remove('_token');
            if(to.name != 'Home') {
                next({name: 'Login'});
            }
            else {
                next({name: 'Home'});
            }
        }
    } else {
        if(to.name != 'Home') {
            next({name: 'Login'});
        }
        else {
            next();
        }
    }

}