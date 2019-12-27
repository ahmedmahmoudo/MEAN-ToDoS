<template>
  <div>
    <navbar v-if="$route.name != 'Home'"></navbar>
    <router-view></router-view>
    <b-toast id="notification-toast" :variant="style" solid :visible="showToast" @change="$store.commit('removeToast')">
      <template v-slot:toast-title>
        {{ toastTitle }}
      </template>
      {{ toastMsg }}
    </b-toast>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState({
      showToast: state => state.showToast,
      toastMsg: state => state.toastMsg,
      toastTitle: state => state.toastTitle,
      style: state => state.style
    }),
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.uppercase {
  text-transform: uppercase;
}
.grey-bg {
    background-color: #eee;
}
</style>
