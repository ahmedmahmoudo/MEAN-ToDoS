import {register, login} from '../utils/userUtils';
import router from '../router';
import {parseError} from '../helpers/errorsParser';
const store = {
    state: {
        user: null,
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        register: ({commit}, form) => {
            register(form).then(res => {
                if(res.data) {
                    commit('setUser', res.data);
                    commit('showToast', {msg: 'Your account has been registered succesfully', title: 'Registeration Success', variant: 'successs'});
                    router.push({name: 'dashboard'});
                }
            }).catch(err => {
                let message = parseError(err);
                commit('showToast', {msg: message, title: 'ERROR!', variant:'danger'});
            });
        },
        login: ({commit}, form) => {
            login(form).then(res => {
                if(res.data) {
                    console.log(res.data);
                    commit('setUser', res.data);
                    commit('showToast', {msg: 'You have succesfully logged in', title: 'Logged in', variant: 'success'});
                    router.push({name: 'dashboard'});
                }
            }).catch(err => {
                let message = parseError(err);
                commit('showToast', {msg: message, title: 'ERROR!', variant:'danger'});
            })
        },
        logout: ({commit}) => {
            commit('setUser', null);
            //logout from back-end
            commit('showToast', {msg: 'You have succesfully logged out', title: 'Logged Out', variant:'success'});
            router.push({name: 'Home'});
        }
    }
}

export default store;