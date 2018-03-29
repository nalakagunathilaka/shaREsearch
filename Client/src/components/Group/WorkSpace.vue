<template>
  <v-content>
    <v-flex mt-2 md8 xs12 offset-md2>
      <v-card class="mb-5" raised>
        <div class="layout justify-center">
          <h1 class="display-3">{{research.Name}}</h1>
        </div>
        <div class="layout justify-center mb-2">
          <h2 class="display-1">{{research.Details}}</h2>
        </div>

        <div class="layout justify-center mt-2 mb-2 ml-4">
          <p class="subheading">{{research.Description}}</p>
        </div>
      </v-card>
      <div>
        <v-toolbar color="teal" dark>
          <v-toolbar-title><h3 class="display-1">{{research.Name}} Discussion</h3></v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <v-container
          class="mt-2 scroll-y"
          style="max-height: 500px"
        >

          <div>
            <v-list two-line>
              <v-list-tile
                v-for="(item,index) in messages"
                :key="`${index}`"
                avatar
              >
                <v-list-tile-avatar>
                  <img src="/../../../static/avatar.png" alt="">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-sub-title>~{{ item.username }}~</v-list-tile-sub-title>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{getTime(item.date) + " " + new Date(item.date).toDateString() }}
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-container>
        <div class="layout row">
          <v-flex md11>
            <v-text-field
              ref="msg"
              color="teal"
              clearable
              v-model="textMessage"
              label="Enter your message here"
            ></v-text-field>
          </v-flex>
          <v-flex md1>
            <div class="text-xs-right">
              <v-btn
                @click="sendMessage"
                :disabled="!textMessage"
              >Send
              </v-btn>
            </div>
          </v-flex>
        </div>
      </div>
    </v-flex>
  </v-content>
</template>

<script>
  import axios from 'axios';
  import io from 'socket.io-client';



  export default {

    data() {
      return {
        socket: '',
        localResearch: JSON.parse(localStorage.getItem('research')),
        key: '',
        research: {},
        cUser: JSON.parse(localStorage.getItem('user')),
        date1: new Date(Date.now()).toISOString().slice(0, 10),


        textMessage: '',
        messages: []

      }
    },
    methods: {
      getResearch() {
        axios.post("http://localhost:3000/research/getCurrentResearch",
          {
            name: this.localResearch.Name
          },
          {"headers": {'Content-Type': 'application/json'}})
          .then((response) => {
            var key = response.data.key;
            console.log(response.data.research[key]);
            this.research = response.data.research[key];
            this.key = key;
            this.getMessages();
          })
          .catch((error) => {
            console.log(error);
          });
      },

      getMessages() {
        axios.post("http://localhost:3000/chats/getMessages",
          {
            key: this.key
          },
          {"headers": {'Content-Type': 'application/json'}})
          .then((response) => {
            console.log(response.data);
            for (var i in response.data) {
              if (response.data.hasOwnProperty(i)) {
                this.messages.push(response.data[i])
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      getTime(dateString) {
        var d = new Date(dateString);
        if (d.getMinutes().toString().length === 1) {
          return d.getHours() + ":0" + d.getMinutes()
        }
        else {
          return d.getHours() + ":" + d.getMinutes()
        }

      },



      sendMessage() {
        this.socket.emit('chat', {
          msg: {username: this.cUser.Name, text: this.textMessage, date: new Date()},
          key: this.key
        });
        this.$refs.msg.focus();
        this.textMessage = "";


      },

      receiveMessages() {
        this.socket.on('message', (data) => {
          console.log(data);
          this.messages.push(data);
          return this.messages

        });
      }


    },

    mounted() {
      this.socket = io('http://localhost:3000');
      this.getResearch();
//      this.getMessages();
      this.receiveMessages();

//      this.startConnection();


    },

    computed: {},

  }
</script>

<style scoped>

</style>
