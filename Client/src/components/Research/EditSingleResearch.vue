<template>
  <v-content>
    <v-flex mt-2 md6 xs12 offset-md3>
      <v-card>

        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>Update Project Details</b></div>
        </v-card-title>
        <div class="layout justify-center">
          <p class="body-1">Please note that the Research Name and the Username cannot be changed.</p>
        </div>
        <v-flex md10 xs12 offset-md1>
          <v-form v-model="valid" ref="research">
            <v-text-field
              label="Research Name"
              v-model="name"
              disabled
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              label="Username"
              v-model="username"
              disabled
              :rules="uRules"
              required
            ></v-text-field>

            <v-text-field
              label="Field"
              v-model="field"
              :rules="fRules"
              required
            ></v-text-field>

            <v-text-field
              label="Researcher"
              v-model="Researcher"
              :rules="rRules"
              required
            ></v-text-field>



            <v-text-field
              v-model="description"
              label="Research Description"
              :rules="desRules"
              multi-line
              required
            ></v-text-field>

            <v-text-field
              v-model="details"
              label="Research Details"
              multi-line
              :rules="detRules"
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
                  :return-value.sync="publishdate"
                >
                  <v-text-field
                    slot="activator"
                    label="Published Date"
                    v-model="publishdate"
                    prepend-icon="event"
                    :rules="dRules"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="publishdate"
                    scrollable
                    color="black"
                  >
                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu1.save(publishdate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>

            </v-layout>
            <br>
            <hr>
            <p>Please confirm that the above information is correct.</p>
            <v-switch
              color="green"
              v-model="switch1"
            ></v-switch>

            <div class="layout justify-center">
              <v-btn
                dark
                :disabled="!switch1"
                @click="updateResearch"
              >Update
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
        name: null,
        nameRules: [
          (v) => !!v || 'Research name is required',
        ],
        username: null,
        uRules: [
          (v) => !!v || 'Username name is required',
        ],

        field : null,
        fRules: [
          (v) => !!v || 'Field is required',
        ],

        Researcher: null,
        rRules: [
          (v) => !!v || 'Researcher is required',
        ],

        description: "",
        desRules: [
          (v) => !!v || 'Description is required',
        ],

        details: "",
        detRules: [
          (v) => !!v || 'Details are required',
        ],

        publishdate: null,
        dRules: [
          (v) => !!v || 'Date is required',
        ],

        user: null,






        menu1: false,

        switch1: false,
        successCond: false,
        failCond: false,
        successMessage: "",

        localResearch: JSON.parse(localStorage.getItem('research')),
        key: '',
        research: {}

      }
    },
    methods: {

      updateResearch() {
        axios.post("http://localhost:3000/research/updateResearch", {
          name: this.name,
          username: this.username,
          description: this.description,
          details: this.details,
          publishdate: this.publishdate,
          field: this.field,
          Researcher: this.Researcher,
          key: this.key
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            this.successMessage = response.data.message;
            this.successCond = true;
            this.failCond = false;
            setTimeout(() => {
              this.successCond = false
            }, 5000);
            console.log(response.data.message);
          })
          .catch((error) => {
            this.successMessage = error.message;
            this.successCond = false;
            this.failCond = true;
            console.log(error);
          })
      },

      getResearch() {
        axios.post("http://localhost:3000/research/getCurrentResearch",
          {
            name: this.localResearch.Name
          },
          {"headers": {'Content-Type': 'application/json'}})
          .then((response) => {
            var key = response.data.key;
            console.log(response.data.research[key]);
            var research = response.data.research[key];
            this.name = research.Name;
            this.username = research.Username;
            this.field =  research.Field,
            this.details = research.Details
            this.Researcher = research.Researcher,
            this.description = research.Description;
            this.publishdate = research.Publish_Date;
            this.key = key;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },

    mounted() {
      this.getResearch();

    }
  }

</script>
