<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">ToDos</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{name: 'Home'}">Home</b-nav-item>
                <b-nav-item v-if="user" :to="{name: 'Dashboard'}">Dashboard</b-nav-item>

            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-button v-if="!user && $route.name != 'Login'" variant="primary" @click="() => $router.push({name: 'Login'})">Login</b-button>
                <div v-if="user">
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em><awesome-icon icon="user"></awesome-icon> {{ `${user.first_name} ${user.last_name}`}}</em>
                        </template>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    computed: {
        ...mapState({
            user: state => state.userStore.user
        })
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>

<style>

</style>