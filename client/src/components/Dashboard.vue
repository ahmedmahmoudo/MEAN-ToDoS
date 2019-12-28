<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-3 col-sm-12">
              <div class="card">
                  <div class="card-header bg-secondary text-light">
                      <div class="d-flex justify-content-between align-items-center">
                          <div>Your Projects</div>
                          <router-link :to="{name: 'New Project'}"><b-button class="btn-sm" variant="success"><awesome-icon icon="plus"></awesome-icon></b-button></router-link>
                      </div>
                  </div>
                  <div class="card-body">
                      <div v-if="projects.length == 0">You have no projects, create one</div>
                      <div v-if="projects.length > 0">
                          <b-list-group flush>
                              <b-list-group-item href="#" v-for="project in projects" :key="project.id">
                                  {{ project.name }}
                              </b-list-group-item>
                          </b-list-group>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState({
            user: state => state.userStore.user,
            projects: state => state.userStore.projects,
        })
    },
    methods: {
        ...mapActions(['retrieveProjects'])
    },
    mounted() {
        this.retrieveProjects();
    }
}
</script>

<style>

</style>