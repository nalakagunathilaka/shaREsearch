<template>
  <v-content>
    <v-container fluid>
      <v-layout row>
        <v-flex md11 offset-md1>
          <v-card class="mb-5" raised>
            <div class="layout justify-center">
              <h1 class="display-2">{{research.Name}}</h1>
            </div>
            <div class="layout justify-center mb-2">
              <h2 class="display-1">{{research.Details}}</h2>
            </div>

            <div class="layout justify-center mt-2 mb-2 ml-4">
              <p class="subheading">{{research.Description}}</p>
            </div>
            <hr>
            <br>

            <div class="layout justify-center">
              <h1>Whiteboard</h1>
            </div>
            <v-spacer></v-spacer>
            <hr>
            <br>
            <v-card>
              <v-flex md11 offset-md1>
                <div id="app">
                  <canvas id="canvas" v-model="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="950px" height="340px"></canvas>
                </div>
              </v-flex>
            </v-card>
            <div>
              <v-btn
                dark
                @click="download"
              >Download
              </v-btn>
            </div>
          </v-card>

        </v-flex>
        <v-flex md3 offset-md1>
          <div>
            <v-toolbar color="grey darken-3" dark>
              <v-toolbar-side-icon>
                <v-icon>chat</v-icon>
              </v-toolbar-side-icon>
              <v-toolbar-title><h3>{{research.Name}} Chat</h3></v-toolbar-title>

              <v-spacer></v-spacer>

            </v-toolbar>
            <v-container
              class="mt-2 scroll-y"
              style="max-height: 400px"
            >

              <div
              >
                <div
                  v-for="(item,index) in messages"
                  :key="`${index}`"
                  avatar
                  class="single-message">

                  <br>
                  <article style="font-style: italic"><b>~{{ item.username }}~</b></article>
                  <article>{{item.text}}</article>
                  <br>
                  <hr>
                  <label class="layout right">
                    {{getTime(item.date) + " " + new Date(item.date).toDateString()}}
                  </label>
                </div>
              </div>

              <!--<div>-->
              <!--<v-list three-line="true">-->
              <!--<v-list-tile-->
              <!--v-for="(item,index) in messages"-->
              <!--:key="`${index}`"-->
              <!--avatar-->
              <!--&gt;-->
              <!--<v-list-tile-avatar>-->
              <!--<img src="/../../../static/avatar.png" alt="">-->
              <!--</v-list-tile-avatar>-->
              <!--<v-list-tile-content>-->
              <!--<div class="row">-->
              <!--<v-list-tile-sub-title>~{{ item.username }}~</v-list-tile-sub-title>-->
              <!--</div>-->
              <!--<div class="row">-->
              <!--<article>{{ item.text }}</article>-->
              <!--</div>-->
              <!--<div class="row">-->
              <!--<article><v-list-tile-action-text>{{getTime(item.date) + " " + new Date(item.date).toDateString() }}-->
              <!--</v-list-tile-action-text>-->
              <!--</article>-->
              <!--</div>-->

              <!--</v-list-tile-content>-->
              <!--&lt;!&ndash;<v-list-tile-action>&ndash;&gt;-->
              <!--&lt;!&ndash;<v-list-tile-action-text>{{getTime(item.date) + " " + new Date(item.date).toDateString() }}&ndash;&gt;-->
              <!--&lt;!&ndash;</v-list-tile-action-text>&ndash;&gt;-->
              <!--&lt;!&ndash;</v-list-tile-action>&ndash;&gt;-->
              <!--</v-list-tile>-->
              <!--</v-list>-->
              <!--</div>-->
            </v-container>
            <div class="layout row">
              <v-flex md10>
                <v-text-field
                  multi-line
                  ref="msg"
                  color="teal"
                  v-model="textMessage"
                  label="Enter your message here"
                ></v-text-field>
              </v-flex>
              <v-flex md1>
                <div class="justify-end">
                  <v-btn
                    flat icon color="teal"
                    @click="sendMessage"
                    :disabled="!textMessage"
                  >
                    <v-icon>send</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

      </v-layout>
    </v-container>
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

        canvas: null,
        textMessage: '',
        messages: [],
        mouse: {
          current: {
            x: 0,
            y: 0
          },
          previous: {
            x: 0,
            y: 0
          },
          down: false
        }

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
      sendDrawing(){
        this.socket.emit('connection whiteboard',{
          pointx: this.currentMouse.x,
          pointy: this.currentMouse.y
        })
      },
      getDrawing(){
        this.socket.on('connection whiteboard', (data) => {
          console.log(data);


        });
      },

      receiveMessages() {
        this.socket.on('message', (data) => {
          console.log(data);
          this.messages.push(data);
          return this.messages

        });
      },
      draw: function (event) {


        // requestAnimationFrame(this.draw);
        if (this.mouse.down ) {
          var c = document.getElementById("canvas");

          var ctx = c.getContext("2d");

          ctx.clearRect(0,0,800,800);


          ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
          ctx.strokeStyle ="#F63E02";
          ctx.lineWidth = 2;
          ctx.stroke()
        }

      },
      handleMouseDown: function (event) {
        this.mouse.down = true;
        this.mouse.current = {
          x: event.pageX,
          y: event.pageY
        }

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");

        ctx.moveTo(this.currentMouse.x, this.currentMouse.y)


      },
      handleMouseUp: function () {
        this.mouse.down = false;
      },
      handleMouseMove: function (event) {

        this.mouse.current = {
          x: event.pageX,
          y: event.pageY
        }

        this.draw(event)

      },
      ready: function () {

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.translate(0.5, 0.5);
        ctx.imageSmoothingEnabled = false;
        // this.draw();
      },

      download(){
        return this.canvas.toDataURL("image/jpg");
      },





    },

    mounted() {

      this.socket = io('http://localhost:3000');
      this.getResearch();
//      this.getMessages();
      this.receiveMessages();
      this.ready();
      this.getDrawing();
//      this.startConnection();


    },

    computed: {
      currentMouse: function () {
        var c = document.getElementById("canvas");
        var rect = c.getBoundingClientRect();

        return {
          x: this.mouse.current.x - rect.left,
          y: this.mouse.current.y - rect.top,

        }
        this.sendDrawing()
        console.log(x,y)
      },


    },

  }
</script>

<style scoped>
  .single-message{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border-radius: 15px 50px;
    background: #8C9EFF
  }
  {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

</style>
