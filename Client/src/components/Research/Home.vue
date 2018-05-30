<template>
  <div id="app">
    <v-app id="inspire">
      <hr>
      <v-card color="" >
        <v-card-title
          class="layout justify-center">
          <div class="headline text-xs-center"><b>Welcome {{current_user}} to shaRESearch</b></div>
        </v-card-title>
      </v-card>


      <v-container fluid>
        <v-layout row>
          <v-flex md11>
            <div>
              <v-flex md10 offset-md1>
                <v-card>
                  <v-flex md4 xs12 offset-md4>
                    <div class="search-wrapper">
                      <v-text-field
                        name="search"
                        label="Search for Members"
                        hint="Enter Name"
                        prepend-icon="mdi-account-search"
                        id="testing"
                        v-model="search"
                      ></v-text-field>
                    </div>
                  </v-flex>
                  <v-container
                    class="mt-2 scroll-y"
                    style="max-height: 175px"
                  >
                    <div
                      id="show-users"
                    >
                      <div v-if="search.length > 0" v-for="user in filteredUser" class="single-user">
                        <h2>{{user.Username}}</h2>
                        <article> Field:   {{user.Field}}</article>
                        <article> Type:    {{user.Type}}</article>
                        <article> Name:    {{user.Name}}</article>
                      </div>

                    </div>
                  </v-container>

                </v-card>
              </v-flex>
            </div>
            <br>
            <div>
              <v-flex md10 offset-md1>
                <v-expansion-panel absolute>
                  <v-expansion-panel-content expand-icon="keyboard_arrow_down">
                    <div slot="header"><h4>Your Researches</h4></div>
                    <v-flex md10 offset-md1>
                      <v-alert color="success" icon="check_circle" value="true" transition="scale-transition"
                               v-show="successCond">
                        {{successMessage}}
                      </v-alert>

                      <v-alert color="error" icon="warning" value="true" transition="scale-transition"
                               v-show="failCond">
                        {{successMessage}}
                      </v-alert>
                      <v-form v-model="valid">
                        <div id="view-research">
                          <div
                            v-for="(item,index) in filteredResearches"
                            :key="`${index}`"
                            class="single-research">
                            <h2>{{item.Name}}<h6>{{item.Field}}</h6></h2>
                            <br>
                            <article>{{item.Description}}</article>
                            <article>{{item.Details}}</article>
                            <br>
                            <hr>
                            <label class="layout right">
                              Published on: {{item.Publish_Date}}
                            </label>
                          </div>
                        </div>
                      </v-form>
                    </v-flex>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </div>
          </v-flex>
          <v-flex md3>
            <div
              id="e3"
              class="grey lighten-3"
            >
              <v-toolbar color="grey darken-3" class="white--text">
                <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon>
                <v-toolbar-title>Job Posts</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card>
                <v-container
                  style="max-height: 525px"
                  class="scroll-y"
                  id="scroll-target"
                >
                  <v-layout
                    column
                    align-center
                    justify-center
                    #scroll-target="onScroll"

                  >
                    <div v-for="job in jobs" class="single-job" >
                      <h2>{{job.Job_Title}}<h6>{{job.Field}}</h6></h2>
                      <br>
                      <article>{{job.Description}}</article>
                      <br>
                      <article><h4>For more Info. Contact:</h4> {{job.Contact_Details}}</article>
                      <hr>
                      <article><h5>Posted by: {{job.Username}}</h5></article>
                      <label class="layout right">
                        {{job.Date}}
                      </label>
                    </div>
                  </v-layout>
                </v-container>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>


      <div class="row">
        <div class="col xl4 l4 m12 s12">

        </div>
        <div class="col xl8 l8 m12 s12">

        </div>
      </div>

      <v-spacer></v-spacer>

      <v-navigation-drawer stateless hide-overlay :mini-variant.sync="mini" v-model="drawer" dark absolute>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="/../../static/cover_page.png" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Research Den</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click.native.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items"
                       :key="item.title"
                       @click=""
                       router
                       :to="item.link" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

    </v-app>
  </div>




</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {

        current_user: JSON.parse(localStorage.getItem('user')).Name.split(" ")[0],
        drawer: true,
        researches: [],
        successMessage: '',
        successCond: false,
        failCond: false,
        valid: false,
        jobs: [],
        search: "",
        username: "",
        users: [],

        items: [
          {title: 'Add Research', icon: 'mdi-account-plus', link: "/AddResearch"},
          {title: 'Add Group Research', icon:'mdi-account-multiple-plus', link: "/CreateGroup"},
          {title: 'Edit Research', icon: 'mdi-account-edit', link: "/EditResearch"},
          {title: 'Search', icon: 'mdi-account-search', link: "/Search"},
          {title: 'Post Jobs', icon: 'mdi-briefcase-upload', link: "/PostJob"},
          {title: 'GroupResearch', icon: 'mdi-account-group', link: "/GroupResearch"},

        ],
        mini: true,
        right: null
      }
    },
    methods: {

      getUsers() {
        axios.get("http://localhost:3000/users/getUsers")
          .then((response) => {
            // console.log(response.data);
            var usersArray = [];
            for (let key in response.data) {
              response.data[key].id = key;
              usersArray.push(response.data[key]);
            }
            this.users = usersArray;
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
      },
      getResearches() {
        axios.get("http://localhost:3000/research/getResearches")
          .then((response) => {
            // console.log(response.data);
            // var resArray = [];
            // for (let key in response.data) {
            //   response.data[key].id = key;
            //   resArray.push(response.data[key]);
            // }
            // this.researches = resArray;
            // // console.log(resArray);
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                var obj = response.data[i]
                if (obj.Category === "Single"){
                  this.researches.push(obj);
                }
              }
            }
            console.log(this.researches);
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
      },
      getJobs() {
        axios.get("http://localhost:3000/research/getJobs")
          .then((response) => {
            // console.log(response.data);
            var jobArray = [];
            for (let key in response.data) {
              response.data[key].id = key;
              jobArray.push(response.data[key]);
            }
            this.jobs = jobArray;
            // console.log(jobArray);
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
      },

    },

    computed: {
      filteredResearches() {
        return this.researches.filter(research => {
          var cUser = research.Username;
          if(cUser.toLowerCase() === this.user.Username.toLowerCase()){
            return(cUser.toLowerCase());
          }
        })
      },
      filteredUser() {
        return this.users.filter(user => {
          return (user.Name.toLowerCase().match(this.search.toLowerCase()))
        })
      }
    },

    mounted() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getResearches();
      this.getJobs();
      this.getUsers();
    },

  }
</script>

<style>
  #view-research{
    max-width: 800px;
    margin:0 auto;
  }
  .single-research{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    background: #D1C4E9
  }
  .single-job{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border-radius: 5px;
    background: #D1C4E9
  ;
  }

   #show-users{
     max-width: 800px;
     margin:0 auto;
   }
  .single-user{
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box;
    border-radius: 5px;
    background: #eee;
  }
</style>
