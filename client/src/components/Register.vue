<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 mb-5">
            <div class="display-4">Register a new account</div>
        </div>
        <div class="col-6">
          <b-form @submit.stop.prevent>
            <b-form-group label="First Name" label-for="first_name">
              <b-form-input id="first_name" v-model.trim="$v.registerForm.first_name.$model" type="text" :state="sumbitted ? !$v.registerForm.first_name.$anyError : null" placeholder="John"></b-form-input>
              <b-form-invalid-feedback :state="$v.registerForm.first_name.required" v-if="!$v.registerForm.first_name.required && sumbitted">
                Please enter your first name
              </b-form-invalid-feedback>
              <b-form-invalid-feedback :state="$v.registerForm.first_name.minLength" v-if="!$v.registerForm.first_name.minLength && sumbitted">
                Your first name must be more than {{ $v.registerForm.first_name.$params.minLength.min }} characters
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Last Name" label-for="last_name">
              <b-form-input id="last_name" v-model.trim="$v.registerForm.last_name.$model" :state="sumbitted ? !$v.registerForm.last_name.$anyError : null" type="text" placeholder="Doe"></b-form-input>
              <b-form-invalid-feedback :state="$v.registerForm.last_name.required" v-if="!$v.registerForm.last_name.required && sumbitted">
                Please enter your last name
              </b-form-invalid-feedback>
              <b-form-invalid-feedback :state="$v.registerForm.last_name.minLength" v-if="!$v.registerForm.last_name.minLength && sumbitted">
                Your last name must be more than {{ $v.registerForm.last_name.$params.minLength.min }} characters
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" v-model.trim="$v.registerForm.email.$model" type="email" :state="sumbitted ? !$v.registerForm.email.$anyError : null" placeholder="john@gmail.com"></b-form-input>
              <b-form-invalid-feedback :state="$v.registerForm.email.required" v-if="!$v.registerForm.email.required && sumbitted">
                Please enter your email
              </b-form-invalid-feedback>
              <b-form-invalid-feedback :state="$v.registerForm.email.email" v-if="!$v.registerForm.email.email && sumbitted">
                Please enter a valid email address
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input id="password" v-model.trim="$v.registerForm.password.$model" :state="sumbitted ? !$v.registerForm.password.$anyError : null" type="password"></b-form-input>
              <b-form-invalid-feedback :state="$v.registerForm.password.required" v-if="!$v.registerForm.password.required && sumbitted">
                Please enter your password
              </b-form-invalid-feedback>
              <b-form-invalid-feedback :state="$v.registerForm.password.minLength" v-if="!$v.registerForm.password.minLength && sumbitted">
                Your password must be more than {{ $v.registerForm.password.$params.minLength.min }} characters
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirm Password" label-for="confirm_password">
              <b-form-input id="confirm_password" v-model.trim="$v.registerForm.confirmPassword.$model" :state="sumbitted ? !$v.registerForm.confirmPassword.$anyError : null" type="password"></b-form-input>
              <b-form-invalid-feedback :state="$v.registerForm.confirmPassword.required" v-if="!$v.registerForm.confirmPassword.required && sumbitted">
                Please confirm your password
              </b-form-invalid-feedback>
              <b-form-invalid-feedback :state="$v.registerForm.confirmPassword.sameAsPassword" v-if="!$v.registerForm.confirmPassword.sameAsPassword && sumbitted">
                Your password doesn't match
              </b-form-invalid-feedback>
            </b-form-group>
            <div class="row align-items-center">
                <div class="col-6">
                    <b-button type="submit" @click="doRegister">Register</b-button>
                </div>
                <div class="col-6">
                    <router-link :to="{name: 'Login'}">Already have an account? Signin</router-link>
                </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs} from 'vuelidate/lib/validators'

import { mapActions } from 'vuex';

export default {
  data() {
      return {
          registerForm: {
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              confirmPassword: ''
          },
          sumbitted: false
      }
  },
  validations: {
      registerForm: {
          first_name: {
              required,
              minLength: minLength(3)
          },
          last_name: {
              required,
              minLength: minLength(3)
          },
          email: {
              required,
              email
          },
          password: {
              required,
              minLength: minLength(6)
          },
          confirmPassword: {
              required,
              sameAsPassword: sameAs('password'),
              minLength: minLength(6)
          }
      }
  },
  methods: {
      ...mapActions(['register']),
      doRegister(e) {
          e.preventDefault();
          this.sumbitted = true;
          this.$v.registerForm.$touch();
          
          if(!this.$v.registerForm.$invalid) {
              let form = {
                  first_name: this.registerForm.first_name,
                  last_name: this.registerForm.last_name,
                  email: this.registerForm.email,
                  password: this.registerForm.password
              };
              this.register(form);
          }
      }
  }
};
</script>

<style>
</style>