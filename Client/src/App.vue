<template>
  <v-app>
    <v-navigation-drawer
      temporary
      absolute
      v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in toolbarItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-show="signedIn"
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark>
      <v-toolbar-side-icon
        @click.native="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-icon>mdi-chart-areaspline</v-icon>
        <router-link to="/HomePage" tag="span" style="cursor: pointer">{{title}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in toolbarItems"
               :key="item.title"
               router
               :to="item.link"
        >
          <v-icon>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
          v-show="signedIn"
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
    <v-footer>
      <span>{{new Date().getFullYear()}}</span>
      <v-spacer></v-spacer>
      <span> © Nalaka Gunathilaka</span>
    </v-footer>
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        title: "ShaREsearch",
        sideNav: false
      }
    },
    computed: {
      // setting up toolbar items.
      toolbarItems() {
        let toolbarItems = [
          {title: "CreateAccount", icon: "mdi-account-plus", link: "/CreateAccount"},
          {title: "Login", icon: "mdi-login-variant", link: "/login"},
          {title: "Profile", icon: "mdi-account-key", link: "/profile"},
          {title: "RemoveUsers", icon: "mdi-account-plus", link: "/RemoveUsers"},
          {title: "Complaints", icon: "mdi-account-plus", link: "/ViewComplaints"},
          {title: "Notifications", icon: "mdi-account-plus", link: "/Notifications"},
          {title: "Home", icon: "home", link: "/Home"}
        ];
        // Select the toolbar items according to the user.
        if (localStorage.getItem("user")) {
          var user = JSON.parse(localStorage.getItem('user'));
          // console.log(user);
          if (user.Type === "Admin") {
            toolbarItems = [

              {title: "Complaints", icon: "mdi-account-plus", link: "/ViewComplaints"},
              {title: "Remove Users", icon: "mdi-account-plus", link:"/RemoveUsers"},
              {title: "Create Account", icon: "mdi-account-plus", link:"/CreateAdminAccount"},
              {icon: "notifications", link: "/Notifications"},
              {title: user.Name.split(" ")[0], icon: "mdi-account-key", link: "/profile"},
              // {title: "Login", icon: "mdi-login-variant", link: "/login"},
            ]
          }
          else if (user.Type === "Student") {
            toolbarItems = [
              {title: "Complaints", icon: "mdi-account-plus", link: "/Complaints"},
              {title: user.Name.split(" ")[0], icon: "mdi-account-key", link: "/profile"},
              {icon: "notifications", link: "/ViewNotifications"},
              {icon: "home", link: "/Home"},
//            {title: "Login", icon: "mdi-login-variant", link: "/login"},
            ]
          }
          else if (user.Type === "Professor") {
            toolbarItems = [
              {title: "Complaints", icon: "mdi-account-plus", link: "/Complaints"},
              {title: user.Name.split(" ")[0], icon: "mdi-account", link: "/profile"},
              {icon: "notifications", link: "/ViewNotifications"},
              {icon: "home", link: "/Home"},
//            {title: "Login", icon: "mdi-login-variant", link: "/login"},
            ]
          }
          else if (user.Type === "Teacher") {
            toolbarItems = [
              {title: "Complaints", icon: "mdi-account-plus", link: "/Complaints"},
              {title: user.Name.split(" ")[0], icon: "mdi-account", link: "/profile"},
              {icon: "notifications", link: "/ViewNotifications"},
              {icon: "home", link: "/Home"},
//            {title: "Login", icon: "mdi-login-variant", link: "/login"},
            ]
          }
        }
        else {
          toolbarItems = [
//            {title: "CreateAccount", icon: "mdi-account-plus", link:"/CreateAccount"},
            {title: "Login", icon: "mdi-login-variant", link: "/login"},
          ]
        }
        return toolbarItems;
      },

      signedIn() {
        if (localStorage.getItem("token")) {
          return true
        }
        else {
          return false
        }
      }
    },
    methods: {
      logout() {
        localStorage.setItem("token", null);
        localStorage.clear();
        axios.post('http://localhost:3000/users/logout', {headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            console.log("Logged out");
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push('/HomePage');
        location.reload();
      }
    },
  }
</script>

<style>
  /*@import "./stylus/main.styl"*/
</style>
