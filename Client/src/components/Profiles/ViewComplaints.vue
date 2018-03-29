<template>
  <v-content>
    <v-flex mt-2 md4 xs12 offset-md4>
      <div class="search-wrapper">
        <v-text-field
          name="search"
          label="Search for Complaints"
          hint="Enter hint"
          prepend-icon="search"
          id="testing"
          v-model="search"
        ></v-text-field>
      </div>
    </v-flex>
    <div id="view-complaints">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center"><b>Complaints</b></div>
      </v-card-title>
      <div v-for="complaint in filteredComplaints" class="single-complaint">
        <h2>{{complaint.Username}}</h2>
        <article>{{complaint.Complaint}}</article>
        <label class="layout right">
          {{complaint.Date_complaint}} / {{complaint.Time_complaint}}
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
          complaints: [],
          search: '',
        }
      },
      methods:{
        getComplaints() {
          axios.get("http://localhost:3000/users/getComplaints")
            .then((response) => {
              // console.log(response.data);
              var complaintsArray = [];
              for (let key in response.data) {
                response.data[key].id = key;
                complaintsArray.push(response.data[key]);
              }
              this.complaints = complaintsArray;
            })
            .catch((error) => {
              console.log("Error: " + error);
            })
        },
      },
      mounted() {
        this.getComplaints();
      },
      computed: {
        filteredComplaints() {
          return this.complaints.filter(complaint => {
            return (complaint.Complaint.toLowerCase().match(this.search.toLowerCase()))
          })
        }
      }

    }
</script>

<style scoped>
  #view-complaints{
    max-width: 800px;
    margin:0 auto;
  }
  .single-complaint{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #D1C4E9;
  }
</style>
