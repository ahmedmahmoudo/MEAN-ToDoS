<template>
  <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center display-4 mb-5">Create New Project</div>
        <div class="col-md-6 col-sm-12">
          <b-card>
            <b-card-body>
              <b-form @submit.self.prevent>
                <b-form-group label="Project Name" for="project_name">
                  <b-form-input id="project_name" v-model.trim="$v.projectForm.name.$model" type="text" :state="sumbitted ? !$v.projectForm.name.$anyError : null"></b-form-input>
                  <b-form-invalid-feedback :state="$v.projectForm.name.required" v-if="!$v.projectForm.name.required && sumbitted">
                    This field is required
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="$v.projectForm.name.minLength" v-if="!$v.projectForm.name.minLength && sumbitted">
                        Project name msut be less than {{ $v.projectForm.name.$params.minLength.min }} characters
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Project Access" for="project_access">
                  <b-form-select id="project_access"  v-model.trim="$v.projectForm.access.$model" :options="accessOptions" :state="sumbitted ? !$v.projectForm.access.$anyError : null"></b-form-select>
                  <b-form-invalid-feedback :state="$v.projectForm.access.required" v-if="!$v.projectForm.access.required && sumbitted">
                    This field is required
                  </b-form-invalid-feedback>
                </b-form-group>
                
                <b-button-group>
                  <b-button @click="saveProject" :disabled="disabled">Save</b-button>
                  <b-button variant="danger" @click="() => $router.back()">Cancel</b-button>
                </b-button-group>
              </b-form>
            </b-card-body>
          </b-card>
        </div>
      </div>
  </div>
</template>

<script>
import { required, minLength} from 'vuelidate/lib/validators'
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      projectForm: {
        name: null,
        access: null
      },
      accessOptions: [
        {text: 'Please Select', value: null, disabled: true},
        {text: 'Public', value: 'Public'},
        {text: 'Private', value: 'Private'}
      ],
      sumbitted: false,
      disabled: false
    }
  },
  validations: {
    projectForm: {
      name: {
        required,
        minLength: minLength(6)
      },
      access: {
        required,
      }
    }
  },
  methods: {
    ...mapActions(['newProject']),
    saveProject(e) {
      e.preventDefault();
      this.sumbitted = true;
      this.$v.projectForm.$touch();
      if(!this.$v.projectForm.$invalid) {
        this.disabled = true;
        this.newProject(this.projectForm).finally(() => this.disabled = false);
      }
    }
  }
}
</script>

<style>

</style>