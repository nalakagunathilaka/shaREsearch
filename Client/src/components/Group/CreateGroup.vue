<template>
  <v-content>
    <v-flex mt-2 md6 xs12 offset-md3>
      <v-card>

        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center"><b>Add New  Group Research</b></div>
        </v-card-title>
        <div class="layout justify-center">
          <p class="body-2">Please enter the relevant details regarding the research</p>
        </div>
        <v-flex md10 xs12 offset-md1>
          <v-form v-model="valid" ref="addForm">
            <v-text-field
              label="Research Name"
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              label="Group Name"
              v-model="groupName"
              :rules="gnameRules"
              required
            ></v-text-field>


            <v-text-field
              label="Field"
              v-model="field"
              :rules="fRules"
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
                  :return-value.sync="startDate"
                >
                  <v-text-field
                    slot="activator"
                    label="Start Date"
                    v-model="startDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="startDate"
                    scrollable
                    color="black"
                  >
                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu1.save(startDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>

            </v-layout>

            <hr>
            <br>

            <div>
              <p class="title">Members</p>
              <p>Select a user to add to the group</p>
            </div>

            <div>
              <v-layout row wrap>
                <v-flex xs11 md8>

                  <v-select
                    :items="users"
                    :filter="customFilter"
                    item-text="Name"
                    v-model="user"
                    label="Select a user"
                    autocomplete
                  ></v-select>

                </v-flex>
                <v-flex xs11 md4>
                  <v-btn
                    :disabled="(user === null)"
                    @click="addMember"
                  >Add Member
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
            <br>
            <hr>
            <br>
            <v-layout v-model="members" v-for="(item,index) in members" :key="`${index}`">
              <v-flex xs11 md8>
                <p>{{item}}</p>

              </v-flex>
              <v-flex xs11 md4>
                <v-btn @click="members.splice(index,1)">Remove Member</v-btn>
              </v-flex>
            </v-layout>
            <hr v-show="members.length>0">
            <br v-show="members.length>0">
            <p>Please confirm that the above information is correct.</p>
            <v-switch
              color="green"
              v-model="switch1"
            ></v-switch>

            <div class="layout justify-center">
              <v-btn
                dark
                :disabled="!switch1"
                @click="addGroupResearch"
              >Add Group Research
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
          (v) => !!v || 'Research name is required',
        ],

        field: '',
        fRules: [
          (v) => !!v || 'Field is required',
        ],

        username: '',
        uRules: [
          (v) => !!v || 'Username is required',
        ],

        description: "",
        desRules: [
          (v) => !!v || 'Description is required',
        ],

        details: "",
        detRules: [
          (v) => !!v || 'Details are required',
        ],


        groupName: "",
        gnameRules: [
          (v) => !!v || 'Group name is required',
        ],

        user: null,
        members: [],


        startDate: null,
        menu1: false,
        menu2: false,
        menu3: false,
        modal: false,

        users: [],

        customFilter(item, queryText, itemText) {
          const hasValue = val => val != null ? val : '';
          const text = hasValue(item.Name);
          const query = hasValue(queryText);
          return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
        },

        switch1: false,
        successCond: false,
        failCond: false,
        successMessage: ""

      }
    },
    methods: {

      getUsers() {
        axios.get("http://localhost:3000/users/getUsers")
          .then((response) => {
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                var obj = response.data[i]
                console.log(obj);
                if(obj.Type != "Admin"){
                  this.users.push({Name: obj.Name, Username: obj.Username});
                }
              }
            }

          })
          .catch((error) => {

          })
      },

      addMember() {
        var member = new Object();
        member.user = this.user.Username;
        this.members.push(member.user);
        this.users.splice(this.users.indexOf(this.user),1);
        // console.log(this.members);
        // console.log(this.users);
      },

      addGroupResearch() {
        axios.post("http://localhost:3000/research/addGroupResearch", {
          name: this.name,
          groupname: this.groupName,
          field: this.field,
          description: this.description,
          details: this.details,
          startDate: this.startDate,
          members: this.members
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            this.successMessage = response.data.message;
            this.successCond = true;
            this.failCond = false;
            this.$refs.addForm.reset();
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
      }
    },

    mounted() {
      this.getUsers()
    }
  }

</script>

