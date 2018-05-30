<template>
  <v-content>
    <section>
      <v-parallax src="/../../static/cover_page.png" height="750">
        <v-layout
          column
          align-center
          justify-center
          class="black--text"
        >
          <!--<img src="assets/vuetify.png" alt="Vuetify.js" height="200">-->
          <h1 id='main' class="black--text mb-2 display-3 text-xs-center">shaREsearch</h1>
          <div class="subheading mb-3 text-xs-center">Web portal for researchers all around the world.</div>
          <v-btn
            v-show="!loggedIn"
            class="white--text mt-5"
            dark
            large
            router
            :to="'/CreateAccount'"
          >
            Join Us
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Start your journey and be the change</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" height="320px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-account-multiple-outline</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Meet New Researchers</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Get to meet new members who is conducting researches all around the world.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" height="320px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-table-settings</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Experience the shared whiteboard Facilities</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Work on your researches with other members using shared whiteboards which will give you a whole new
                    exerience.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" height="320px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-account-group</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Get into groups and work on Researches</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Collaborate with other users to work on your researches.
                    Add members as you wish to the groups.
                    Conduct researches in many fields without being restrcited to one field.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </v-content>
</template>

<script>
  export default {

    data() {
      return {
        loggedIn: false
      }
    },

    mounted() {
      if (localStorage.getItem('user')) {
        this.loggedIn = true
      }
    }
  }

</script>

<style scoped>
</style>




