<template>
  <v-content>
    <v-flex mt-2 md4 xs12 offset-md4>
      <div class="search-wrapper">
        <v-text-field
          name="search"
          label="Search for Users"
          hint="Enter the Username"
          prepend-icon="search"
          id="testing"
          v-model="search"
        ></v-text-field>
      </div>
      <v-text-field
        name="Username"
        label="Enter Username to remove"
        hint="Enter the Username"
        v-model="username"
      ></v-text-field>
      <div class="layout justify-center">
        <v-btn
          dark
          @click="Remove"
        >Remove
        </v-btn>
      </div>

    </v-flex>
    <!--nalaka gg-->
    <div id="show-users">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center"><b>All Users</b></div>
      </v-card-title>
      <div v-for="user in filteredUser" class="single-user">
        <h2>{{user.Username}}</h2>
        <article> Field:   {{user.Field}}</article>
        <article> Type:    {{user.Type}}</article>
        <article> Name:    {{user.Name}}</article>
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
        username: "",
        users: []
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
      Remove(){
        axios.post("http://localhost:3000/users/removeUser" , {
          username: this.username,
        }, {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            if (response.data.success) {
              this.successMessage = "User Removed Successfully";
              setTimeout(() => {
                this.$router.push('/RemoveUsers');
              }, 2000);

            }
            else {
              this.successMessage = response.data.message;
            }
            console.log(response.data.message);
          }).catch((error) => {
          console.log("Error: " + error);
          this.progress = false;
        });

      }
    },


    mounted() {
      this.getUsers();
    },

    computed: {
      filteredUser() {
        return this.users.filter(user => {
          return (user.Username.toLowerCase().match(this.search.toLowerCase()))
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
  .single-user{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }
</style>

