<template>
  <v-content>
    <v-flex mt-5 md10 xs-12 offset-md1>

      <v-tabs centered grow>
        <v-tabs-bar class="black" dark>
          <v-tabs-slider class="red"></v-tabs-slider>
          <v-tabs-item href="profile">
            Profile
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="profile">
            <v-card flat>
              <v-card-title class="layout justify-center">
                <h2 class="display-1"><b>Personal Information</b></h2>
              </v-card-title>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="layout justify-center">
                      User Type: {{user.Type}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="layout justify-center">
                      Name: {{user.Name}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="layout justify-center">
                      Username: {{user.Username}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

              </v-list>

              <v-flex md8 offset-md2>
                <v-expansion-panel >
                  <v-expansion-panel-content expand-icon="keyboard_arrow_down">
                    <div slot="header"><h4>Change Password</h4></div>
                    <v-flex md6 offset-md3>
                      <v-alert color="success" icon="check_circle" value="true" transition="scale-transition"
                               v-show="successCond">
                        {{successMessage}}
                      </v-alert>

                      <v-alert color="error" icon="warning" value="true" transition="scale-transition"
                               v-show="failCond">
                        {{successMessage}}
                      </v-alert>
                      <v-form v-model="valid">
                        <v-text-field
                          label="E-mail"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>

                        <v-text-field
                          label="Enter current password"
                          v-model="curPassword"
                          :rules="passRules"
                          min="8"
                          :append-icon="pass3 ? 'visibility' : 'visibility_off'"
                          :append-icon-cb="() => (pass3 = !pass3)"
                          :type="pass3 ? 'password' : 'text'"
                          counter
                          required
                        ></v-text-field>

                        <v-text-field
                          label="Enter new passwword"
                          hint="At least 8 characters"
                          v-model="password"
                          :rules="passRules"
                          min="8"
                          :append-icon="pass1 ? 'visibility' : 'visibility_off'"
                          :append-icon-cb="() => (pass1 = !pass1)"
                          :type="pass1 ? 'password' : 'text'"
                          counter
                          required
                        ></v-text-field>

                        <v-text-field
                          label="Confirm new password"
                          v-model="cPassword"
                          :rules="cRules"
                          min="8"
                          :append-icon="pass2 ? 'visibility' : 'visibility_off'"
                          :append-icon-cb="() => (pass2 = !pass2)"
                          :type="pass2 ? 'password' : 'text'"
                          required
                        ></v-text-field>
                        <div class="layout justify-center">
                          <v-btn
                            dark
                            @click="changePass"
                            :disabled="!valid"
                          >Change Password
                          </v-btn>
                        </div>
                      </v-form>
                    </v-flex>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-card>

          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>

    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        user: {},

        valid: false,
        pass1: true,
        pass2: true,
        pass3: true,

        curPassword: '',
        password: '',
        passRules: [
          (v) => !!v || 'Password is required',
        ],

        cPassword: '',
        cRules: [
          () => !!this.cPassword || 'Please confirm the password above',
          () => this.cPassword === this.password || 'Entered passwords do not match'
        ],

        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],

        successMessage: '',
        successCond: false,
        failCond: false,

      }
    },

    methods: {
      // change the password and send the post to back end to enter the updated details to the database.
      changePass() {
        axios.post('http://localhost:3000/users/updatePass', {
          email: this.email,
          currentPass: this.curPassword,
          newPass: this.password,
          auth: this.authInfo
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            if (response.data.success) {
              this.successMessage = response.data.message;
              this.successCond = true;
              this.failCond = false;
              this.progress = false;


            }
            else {
              this.successMessage = response.data.message;
              this.progress = false;
              this.failCond = true;
              this.successCond = false;
            }
          })
          .catch((error) => {
            this.successMessage = error.message;
            this.failCond = true;
            this.successCond = false;
            this.progress = false
          });
      }
    },

    mounted() {
      this.user = JSON.parse(localStorage.getItem("user"));

    }

  }
</script>
