<<template>
  <v-container>
    <v-flex mt-5 md10 xs8 offset-md1>
      <v-alert color="success" icon="check_circle" value="true" transition="scale-transition" v-show="successCond">
        {{successMessage}}
      </v-alert>

      <v-alert color="error" icon="warning" value="true" transition="scale-transition" v-show="failCond">
        {{successMessage}}
      </v-alert>
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center"><b>Notifications</b></div>
      </v-card-title>
      <v-layout row v-model="valid">
        <div class="layout justify-center">
          <v-text-field
            v-model="notifications"
            :rules="nRules"
            label="Enter your notification here"
            multi-line
          ></v-text-field>
        </div>
      </v-layout>
      <div class="layout justify-center">
        <v-btn
          dark
          @click="send"
          :disabled="!valid"
        >Send
        </v-btn>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
      data(){
        return{
          notifications:'',
          valid: false,
          nRules: [
            (v) => !!v || 'At least one complaint is required',
          ],
          successMessage: '',
          successCond: false,
          failCond: false,
          progress: false,

        }
      },
      methods: {
        send(){
          axios.post('http://localhost:3000/users/notifications', {
            notifications: this.notifications,
          }, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
              if (response.data.success) {
                this.successMessage = "Notification sent successfully";
                this.successCond = true;
                this.failCond = false;
                setTimeout(() => {
                  // this.$router.push('/HomePage');
                }, 2000);

              }
              else {
                this.successMessage = response.data.message;
                this.failCond = true;
                this.successCond = false;
              }
              console.log(response.data.message);
            }).catch((error) => {
            console.log("Error: " + error);
          });
        }
      }
    }
</script>

<style scoped>

</style>
