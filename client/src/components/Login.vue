<template>
  <div class="container">
    <div class="row">
        <div class="col-12">
            <div class="display-4">Sign in</div>
        </div>
        <div class="col-md-6 col-sm-12">
            <b-form @submit.stop.prevent>
                <b-form-group label="Email" label-for="email">
                    <b-form-input id="email" v-model.trim="$v.loginForm.email.$model" type="email" :state="sumbitted ? !$v.loginForm.email.$anyError : null" placeholder="john@gmail.com"></b-form-input>
                    <b-form-invalid-feedback :state="$v.loginForm.email.required" v-if="!$v.loginForm.email.required && sumbitted">
                        Please enter your email
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback :state="$v.loginForm.email.email" v-if="!$v.loginForm.email.email && sumbitted">
                        Please enter a valid email address
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Password" label-for="password">
                    <b-form-input id="password" v-model.trim="$v.loginForm.password.$model" :state="sumbitted ? !$v.loginForm.password.$anyError : null" type="password"></b-form-input>
                    <b-form-invalid-feedback :state="$v.loginForm.password.required" v-if="!$v.loginForm.password.required && sumbitted">
                        Please enter your password
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback :state="$v.loginForm.password.minLength" v-if="!$v.loginForm.password.minLength && sumbitted">
                        Your password must be more than {{ $v.loginForm.password.$params.minLength.min }} characters
                    </b-form-invalid-feedback>
                </b-form-group>
                <div class="row align-items-center">
                    <div class="col-6">
                        <b-button type="submit" :disabled="disabled" @click="doLogin">Login</b-button>
                    </div>
                    <div class="col-6">
                        <router-link :to="{name: 'Register'}">Don't have an account? Register</router-link>
                    </div>
                </div>
            </b-form>
        </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex';

export default {
  data() {
      return {
          loginForm: {
              email: '',
              password: '',
          },
          sumbitted: false,
          disabled: false
      }
  },
  validations: {
      loginForm: {
          email: {
              required,
              email
          },
          password: {
              required,
              minLength: minLength(6)
          },
      }
  },
  methods: {
      ...mapActions(['login']),
      doLogin(e) {
          e.preventDefault();
          this.sumbitted = true;
          this.$v.loginForm.$touch();
          if(!this.$v.loginForm.$invalid) {
              let form = this.loginForm;
              this.disabled = true;
              this.login(form).finally(() => this.disabled = false);
          }
      }
  }
};
</script>

<style>

</style>