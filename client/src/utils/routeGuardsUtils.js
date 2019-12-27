import store from '../stores/store';

export const checkIfLoggedIn = (to, from, next) => {
    if(store.state.userStore.user) {
        next({name: 'dashboard'});
    }
    next();
}