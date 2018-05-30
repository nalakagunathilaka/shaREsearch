<template>
  <v-content>
    <v-flex mt-5 md10 xs-12 offset-md1>



      <v-flex mt-2 md8 xs12 offset-md2>
        <div class="layout justify-center">
          <h1 >My Single Researches</h1>
        </div>
        <br>
        <hr>
        <v-card
          class="mt-2"
          hover
          color="deep-purple lighten-4"
          tile
          v-for="(item,index) in filteredResearches"
          :key="`${index}`"
        >
          <v-card-title primary-title>
            <v-flex md9 xs12>

              <h1>{{item.Name}}<h6>{{item.Field}}</h6></h1>
              <br>
              <article>{{item.Description}}</article>
              <article>{{item.Details}}</article>
              <br>
              <hr>
              <article><h5>By: {{item.Username}}</h5></article>
              <label class="layout right">
                Published on: {{item.Publish_Date}}
              </label>

            </v-flex>
            <v-flex md2 xs12>
              <v-btn v-on:click="viewResearches(item)">
                EDIT
              </v-btn>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {

        user: {},
        researches: [],


      }
    },

    methods: {

      getResearches() {
        axios.get("http://localhost:3000/research/getResearches")
          .then((response) => {
            console.log(response.data);
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
            console.log(error);
          })
      },


      viewResearches(resName) {
        localStorage.setItem('research', JSON.stringify(resName));
        this.$router.push("/EditSingleResearch/"+ resName.Name);

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
      }
    },

    mounted() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getResearches();

    }

  }
</script>
