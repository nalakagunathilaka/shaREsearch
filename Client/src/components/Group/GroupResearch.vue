<template>
  <v-content>
    <v-flex mt-5 md10 xs-12 offset-md1>



          <v-flex mt-2 md8 xs12 offset-md2>
            <div class="layout justify-center">
              <h1 >My Group Researches</h1>
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
                    <article><h4>Group: {{item.Groupname}}</h4></article>
                    <article><h5>By: {{members}}</h5></article>
                    <label class="layout right">
                      Initialized on: {{item.StartDate}}
                    </label>

                </v-flex>
                <v-flex md2 xs12>
                  <v-btn v-on:click="viewResearches(item)">
                    Work Space
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
        members: []

      }
    },

    methods: {

      getResearches() {
        axios.get("http://localhost:3000/research/getGroupResearches")
          .then((response) => {
            console.log(response.data);
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                var obj = response.data[i]
                if (obj.Category === "Group"){
                  this.researches.push(obj);
                }
              }
            }
            console.log(this.researches);
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
            console.log(error);
          })
      },


      viewResearches(resName) {
        localStorage.setItem('research', JSON.stringify(resName));
        this.$router.push("/WorkSpace/"+ resName.Name);

      },


    },

    computed: {
      filteredResearches() {
        return this.researches.filter(research => {
          for(var i in research.Members){
            if(research.Members.hasOwnProperty(i)){
              var member = research.Members[i];
              if(member.toLowerCase().includes(this.user.Username.toLowerCase())){
                return (member.toLowerCase().includes(this.user.Username.toLowerCase()))
              }

            }
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
