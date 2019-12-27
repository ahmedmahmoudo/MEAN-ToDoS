import VueRouter from 'vue-router';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';


import {checkIfLoggedIn} from './utils/routeGuardsUtils';


const routes = [
  {
    path: '/', 
    name:'Home', 
    component: 
    Home
  },
  {
    path: '/register', 
    name: 'Register', 
    component: 
    Register,
    beforeEnter: checkIfLoggedIn
  },
  {
    path: '/login', 
    name: 'Login', 
    component: 
    Login,
    beforeEnter: checkIfLoggedIn
  },
];
  
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;