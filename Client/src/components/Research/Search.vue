<template>
  <v-content>
    <v-flex mt-2 md4 xs12 offset-md4>
      <div class="search-wrapper">
        <v-text-field
          name="search"
          label="Search for Researches"
          hint="Enter search hint"
          prepend-icon="search"
          id="testing"
          v-model="search"
        ></v-text-field>
      </div>


    </v-flex>

    <div id="show-users">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center"><b>All Researches</b></div>
      </v-card-title>
      <div v-for="research in filteredResearch" class="single-research">
        <h2>{{research.Name}}<h6>{{research.Field}}</h6></h2>
        <br>
        <article>{{research.Description}}</article>
        <article>{{research.Details}}</article>
        <br>
        <article><h4>Conducted by: </h4>{{research.Researcher}}</article>
        <hr>
        <article><h5>Posted by: {{research.Username}}</h5></article>
        <label class="layout right">
          {{research.Publish_Date}}
        </label>
      </div>

    </div>



  </v-content>
</template>

<script>
  import axios from 'axios';

  export default {

    data() {
      return {
        search: "",
        researches: []
      }
    },
    methods: {
      getResearches() {
        axios.get("http://localhost:3000/users/getResearches")
          .then((response) => {
            // console.log(response.data);
            var resArray = [];
            for (let key in response.data) {
              response.data[key].id = key;
              resArray.push(response.data[key]);
            }
            this.researches = resArray;
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
      },

    },


    mounted() {
      this.getResearches();
    },

    computed: {
      filteredResearch() {
        return this.researches.filter(research => {
          return (research.Name.toLowerCase().match(this.search.toLowerCase()) || research.Field.toLowerCase().match(this.search.toLowerCase())  || research.Details.toLowerCase().match(this.search.toLowerCase()) || research.Researcher.toLowerCase().match(this.search.toLowerCase()) || research.Description.toLowerCase().match(this.search.toLowerCase()) || research.Username.toLowerCase().match(this.search.toLowerCase()))
        })
      }
    }
  }

</script>

<style>
  #show-users{
    max-width: 800px;
    margin:0 auto;
  }
  .single-research{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }
</style>
