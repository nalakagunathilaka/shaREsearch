<template>
  <v-content>
    <v-flex mt-2 md4 xs12 offset-md4>
      <div class="search-wrapper">
        <v-text-field
          name="search"
          label="Search for Researches"
          hint="Enter search hint"
          prepend-icon="mdi-account-search"
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
        <h2>{{research.Name}}<h6>{{research.Field}} ({{research.Category}} Category)</h6></h2>
        <br>
        <article></article>
        <article>{{research.Description}}</article>
        <article>{{research.Details}}</article>
        <br>
        <hr>
        <article><h5>Posted by: {{research.Username || members}}</h5></article>
        <label class="layout right">
          {{research.Publish_Date || research.StartDate}}
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
        researches: [],
        members: "",
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
            // console.log(response.data)
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                var memArray = [];
                var obj = response.data[i];
                console.log(obj.Category);
                if(obj.Category === "Group"){
                   for(var j in obj.Members){
                     if (obj.Members.hasOwnProperty(j)){
                        var childobj = obj.Members[j];
                        memArray.push(childobj)
                     }
                  }

                }
              }
            }
            var memberstring = "";
            var memberstringsliced = "";
            console.log(memArray);
            for(var i in memArray){
              memberstring += memArray[i] + ', ';

            }
            console.log(memberstring);
            memberstringsliced = memberstring.slice(0,memberstring.length-2);
            this.members = memberstringsliced;
            console.log(this.members);
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
      },

    },

    //
  mounted() {
      this.getResearches();
    },

    computed: {
      filteredResearch() {
        return this.researches.filter(research => {
          if(research.Category === "Single"){
            return (research.Publish_Date.toLowerCase().match(this.search.toLowerCase()) || research.Name.toLowerCase().match(this.search.toLowerCase()) || research.Field.toLowerCase().match(this.search.toLowerCase()) || research.Category.toLowerCase().match(this.search.toLowerCase()) || research.Description.toLowerCase().match(this.search.toLowerCase()) || research.Details.toLowerCase().match(this.search.toLowerCase()) || research.Username.toLowerCase().match(this.search.toLowerCase()))
          }
          if(research.Category === "Group"){
            return (research.StartDate.toLowerCase().match(this.search.toLowerCase()) || research.Name.toLowerCase().match(this.search.toLowerCase()) || research.Field.toLowerCase().match(this.search.toLowerCase()) || research.Category.toLowerCase().match(this.search.toLowerCase()) || research.Description.toLowerCase().match(this.search.toLowerCase()) || research.Details.toLowerCase().match(this.search.toLowerCase()) || this.members.toLowerCase().match(this.search.toLowerCase()))
          }

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
