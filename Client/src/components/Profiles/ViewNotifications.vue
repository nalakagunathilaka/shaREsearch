<template>
  <v-content>
    <div id="view-notifications">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center"><b>Notifications</b></div>
      </v-card-title>
      <div v-for="notification in notifications" class="single-notification">
        <h2>{{notification.Username}}</h2>
        <article>{{notification.Notification_body}}</article>
        <br>
        <hr>
        <article><h5>-{{notification.Type}}-</h5></article>
        <label class="layout right">
          {{notification.Date_notice}} / {{notification.Time_notice}}
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
        notifications: [],
      }
    },
    methods:{
      getNotifications() {
        axios.get("http://localhost:3000/users/getNotifications")
          .then((response) => {
            // console.log(response.data);
            var notificationArray = [];
            for (let key in response.data) {
              response.data[key].id = key;
              notificationArray.push(response.data[key]);
            }
            this.notifications = notificationArray;
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
      },
    },
    mounted() {
      this.getNotifications();
    },
  }
</script>

<style scoped>
  #view-notifications{
    max-width: 800px;
    margin:0 auto;
  }
  .single-notification{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border-radius: 25px;
    background: #D1C4E9;
  }
</style>
