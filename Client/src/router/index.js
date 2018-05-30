import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import Login from '../components/Profiles/Login'
import CreateAccount from '../components/Profiles/CreateAccount'
import Profile from '../components/Profiles/Profile'
import CreateAdminAccount from '../components/Profiles/CreateAdminAccount'
import RemoveUsers from '../components/Profiles/RemoveUsers'
import Complaints from '../components/Profiles/Complaints'
import ViewComplaints from '../components/Profiles/ViewComplaints'
import Notifications from '../components/Profiles/Notifications'
import ViewNotifications from '../components/Profiles/ViewNotifications'
import Home from '../components/Research/Home'
import AddResearch from '../components/Research/AddResearch'
import PostJob from '../components/Research/PostJob'
import Search from '../components/Research/Search'
import CreateGroup from '../components/Group/CreateGroup'
import GroupResearch from '../components/Group/GroupResearch'
import WorkSpace from '../components/Group/WorkSpace'
import EditResearch from '../components/Research/EditResearch'
import EditSingleResearch from '../components/Research/EditSingleResearch'


Vue.use(Router)

// Setting up the routes that need to be routed from front end to back end.
export default new Router({
  mode: "history",
  routes: [
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/CreateAccount',
      name: 'CreateAccount',
      component: CreateAccount
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/CreateAdminAccount',
      name: 'CreateAdminAccount',
      component: CreateAdminAccount
    },
    {
      path: '/RemoveUsers',
      name: 'RemoveUsers',
      component: RemoveUsers
    },
    {
      path: '/Complaints',
      name: 'Complaints',
      component: Complaints
    },
    {
      path: '/ViewComplaints',
      name: 'ViewComplaints',
      component: ViewComplaints
    },
    {
      path: '/Notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: '/ViewNotifications',
      name: 'ViewNotifications',
      component: ViewNotifications
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/AddResearch',
      name: 'AddResearch',
      component: AddResearch
    },
    {
      path: '/PostJob',
      name: 'PostJob',
      component: PostJob
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/CreateGroup',
      name: 'CreateGroup',
      component: CreateGroup
    },
    {
      path: '/GroupResearch',
      name: 'GroupResearch',
      component: GroupResearch
    },
    {
      path: '/WorkSpace/:id',
      name: 'WorkSpace',
      component: WorkSpace
    },
    {
      path: '/EditResearch',
      name: 'EditResearch',
      component: EditResearch
    },
    {
      path: '/EditSingleResearch/:id',
      name: 'EditSingleResearch',
      component: EditSingleResearch
    },

  ]
})
