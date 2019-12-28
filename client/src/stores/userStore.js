import {register, login, getProjects, createProject, updateProject} from '../utils/userUtils';
import router from '../router';
import {parseError} from '../helpers/errorsParser';
import Vue from 'vue';
import {setToken} from '../utils/httpUtils';


const store = {
    state: {
        user: null,
        projects: []
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user;
            if(user) {
                Vue.$cookies.set('_token', user.token);
                setToken(user.token);
            } else {
                Vue.$cookies.remove('_token');
                setToken(null);
            }

        },
        setProjects: (state, projects) => {
            state.projects = projects;
        },
        addProject: (state, project) => {
            state.projects.push(project);
        }
    },
    actions: {
        register: ({commit}, form) => {
            register(form).then(res => {
                if(res.data) {
                    commit('setUser', res.data);
                    commit('showToast', {msg: 'Your account has been registered succesfully', title: 'Registeration Success', variant: 'successs'});
                    router.push({name: 'Dashboard'});
                }
            }).catch(err => {
                let message = parseError(err);
                commit('showToast', {msg: message, title: 'ERROR!', variant:'danger'});
            });
        },
        login: ({commit}, form) => {
            return new Promise((resolve, reject) => {
                login(form).then(res => {
                    if(res.data) {
                        commit('setUser', res.data);
                        commit('showToast', {msg: 'You have succesfully logged in', title: 'Logged in', variant: 'success'});
                        router.push({name: 'Dashboard'});
                        resolve();
                    }
                }).catch(err => {
                    let message = parseError(err);
                    commit('showToast', {msg: message, title: 'ERROR!', variant:'danger'});
                    reject(message);
                });
            })
        },
        logout: ({commit}) => {
            commit('setUser', null);
            //logout from back-end
            commit('showToast', {msg: 'You have succesfully logged out', title: 'Logged Out', variant:'success'});
            router.push({name: 'Home'});
        },
        retrieveProjects: ({commit}) => {
            getProjects().then(res => {
                if(res.data) {
                    commit('setProjects', res.data);
                }
            }).catch(err => {
                let message = parseError(err);
                console.log(message);
            });
        },
        newProject: ({commit}, form) => {
            return new Promise((resolve, reject) => {
                createProject(form).then(res => {
                    if(res.data) {
                        commit('addProject', res.data);
                        commit('showToast', {msg: 'Project created succesfully', title: 'Success', variant:'success'});
                        router.push({name: 'Dashboard'}); //todo redirect to project URL
                        resolve();
                    }
                }).catch(err => {
                    let message = parseError(err);
                    commit('showToast', {msg: message, title: 'ERROR!', variant:'danger'});
                    reject();
                });
            });
        },
        editProject: ({commit}, {id, form}) => {
            return new Promise((resolve, reject) => {
                updateProject(id, form).then(res => {
                    if(res.data) {
                        commit('showToast', {msg: 'Project updated succesfully', title: 'Success', variant:'success'});
                        resolve();
                    }
                }).catch(err => {
                    let message = parseError(err);
                    commit('showToast', {msg: message, title: 'ERROR!', variant:'danger'});
                    reject();
                });
            })
        }
    }
}

export default store;