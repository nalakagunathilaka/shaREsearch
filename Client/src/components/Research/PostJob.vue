<template>
  <v-content>
    <v-flex mt-2 md6 xs12 offset-md3>
      <v-card>

        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>Post a Job</b></div>
        </v-card-title>
        <div class="layout justify-center">
          <p class="body-2">Please enter job details</p>
        </div>
        <v-flex md10 xs12 offset-md1>
          <v-form v-model="valid" ref="postForm">
            <v-text-field
              label="Job Title"
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              label="Field"
              v-model="field"
              :rules="fRules"
              required
            ></v-text-field>

            <v-text-field
              label="Username"
              v-model="username"
              :rules="uRules"
              required
            ></v-text-field>

            <v-text-field
              label="Contact Details"
              v-model="contact"
              :rules="conRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="description"
              label="Job Description"
              :rules="desRules"
              multi-line
              required
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs11 sm5>
                <v-menu
                  ref="menu1"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu1"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="submitdate"
                >
                  <v-text-field
                    slot="activator"
                    label="Date"
                    v-model="submitdate"
                    prepend-icon="event"
                    readonly
                    required
                    :rules="dateRules"
                  ></v-text-field>
                  <v-date-picker
                    v-model="submitdate"
                    scrollable
                    color="black"
                  >
                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu1.save(submitdate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>

            <br>
            <hr>
            <br>

            <p>Please confirm that the above information is correct.</p>
            <v-switch
              :disabled="!valid"
              color="green"
              v-model="switch1"
            ></v-switch>

            <div class="layout justify-center">
              <v-btn
                dark
                :disabled="!switch1"
                @click="submitJob"
              >Post Job
              </v-btn>
            </div>

          </v-form>


        </v-flex>
      </v-card>
      <v-alert color="success" icon="check_circle" value="true" transition="scale-transition" v-show="successCond">
        {{successMessage}}
      </v-alert>

      <v-alert color="error" icon="warning" value="true" transition="scale-transition" v-show="failCond">
        {{successMessage}}
      </v-alert>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        valid: false,
        name: '',
        nameRules: [
          (v) => !!v || 'Job title is required',
        ],

        field: '',
        fRules: [
          (v) => !!v || 'Field is required',
        ],

        contact: '',
        conRules: [
          (v) => !!v || 'Either an email or phone number required',
        ],

        username: '',
        uRules: [
          (v) => !!v || 'Username is required',
        ],

        description: "",
        desRules: [
          (v) => !!v || 'Description is required',
        ],

        submitdate: null,
        dateRules: [
          (v) => !!v || ' Date is required',
        ],
        menu1: false,

        switch1: false,
        successCond: false,
        failCond: false,
        successMessage: ""

      }
    },
    methods: {

      submitJob() {
        axios.post("http://localhost:3000/research/submitJob", {
          name: this.name,
          field: this.field,
          username: this.username,
          contact: this.contact,
          description: this.description,
          submitdate: this.submitdate,
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            this.successMessage = response.data.message;
            this.successCond = true;
            this.failCond = false;
            this.$refs.postForm.reset();
            setTimeout(() => {
              this.successCond = false
            }, 5000);
            console.log(response.data.message);
            // this.$router.push('/Home');
          })
          .catch((error) => {
            this.successMessage = error.message;
            this.successCond = false;
            this.failCond = true;
            console.log(error);
          })
      }
    },
  }
</script>

<style scoped>

</style>
