import VueRouter from 'vue-router';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import newProject from './components/Projects/New';

import {checkIfNotLoggedIn, checkIfLoggedIn} from './utils/routeGuardsUtils';


const routes = [
  {
    path: '/', 
    name:'Home', 
    component: Home,
    beforeEnter: checkIfLoggedIn
  },
  {
    path: '/register', 
    name: 'Register', 
    component: Register,
    beforeEnter: checkIfNotLoggedIn
  },
  {
    path: '/login', 
    name: 'Login', 
    component: Login,
    beforeEnter: checkIfNotLoggedIn
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: checkIfLoggedIn
  },
  {
    path: '/projects/new',
    name: 'New Project',
    component: newProject,
    beforeEnter: checkIfLoggedIn
  }
];
  
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;