<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <!-- <v-toolbar-title class="ml-0 pl-3"> -->
    <v-toolbar-title >
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
        <!-- <span class="hidden-sm-and-down">CSYMAPP</span> -->
        <span >{{logoText}}</span>
    </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        >
      </v-text-field> -->
      <v-spacer></v-spacer>     
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <!-- <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/static/avatar/man_4.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu> -->
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition" align-center justify-center color="primary" class="primary">
         <!-- <v-layout align-center justify-center > -->
        
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img :src="getProfilePic()" alt="user"/>     
          </v-avatar>
          <!-- {{ getUser('name') }} -->
        </v-btn>

        <v-list class="pa-0" align-center justify-center>

          <!-- <v-container fill-height style="background: #3c8dbc;"> -->
          <v-container fill-height class="primary">
            <v-layout row wrap align-center >
              <v-flex class="text-xs-center" xs12>
                    <v-avatar size="50px">
                         <img v-bind:src="getProfilePic()" alt="user">
                    </v-avatar>
              </v-flex>
              <v-flex class="text-xs-center" xs12 style="color: #FFF;">
                {{ getUser('name') }}
              </v-flex>
              <v-flex class="text-xs-center" xs12 style="font-size: 0.8em">
                {{ getUser('email') }}
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fill-height style="background: #f9f9f9;" class="pa-1">
            <v-layout row wrap align-center >
              <v-flex v-if="!isLoggedIn()" class="text-xs-center" xs12 >
                <v-btn block flat slot="activator" outline style="font-size: 1em; color: #666666; background-color: #f4f4f4; border-color: #ddd;" to="/csystem/auth/login">
                  <v-icon small left>fa-lock</v-icon>
                  <!-- <v-spacer></v-spacer> -->
                  Login
                </v-btn>
              </v-flex>
              <v-flex v-if="!isLoggedIn()" class="text-xs-center" xs12 style="font-size: 0.8em;">
                <v-btn block flat slot="activator" outline style="color: #666666; background-color: #f4f4f4; border-color: #ddd;" to="/csystem/auth/register">
                  <v-icon small left>fa-user-plus</v-icon>    Register
                </v-btn>
              </v-flex>
              <v-flex v-if="isLoggedIn()" class="text-xs-center" xs12 style="font-size: 0.8em;">
                <v-btn block flat slot="activator" outline style="color: #666666; background-color: #f4f4f4; border-color: #ddd;">
                  <v-icon small left>fa-user</v-icon>    Profile
                </v-btn>
              </v-flex>
              <v-flex v-if="isLoggedIn()" class="text-xs-center" xs12 style="font-size: 0.8em;">
                <v-btn block flat slot="activator" outline style="color: #666666; background-color: #f4f4f4; border-color: #ddd;" @click="logout()">
                  <v-icon small left>fa-sign-out</v-icon>    Logout
                </v-btn>
              </v-flex>
              

            </v-layout>
          </v-container>

        </v-list>
       
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
import config from '@/services/config'
import authService from '@/apps/csystem/services/auth'

export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  data: () => ({
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        },
        logoText: ''
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
  
  created() {
    let self = this
    self.logoText = config.get('/defaultAppName')
  },
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    logout() {
      this.$store.state.token = null
      this.$store.state.isLoggedIn = false
      this.$store.state.user.userdata = {}
      window.getApp.$emit('APP_LOGOUT')
    },
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    getProfilePic () {
      return this.$store.state.user.profilepic || this.$store.state.user.defaultprofilepic;
    },
    getUser (elem) {
      // let ret = this.$store.state.user[elem];
      if (elem === 'name') return authService().getUserName(this.$store.state.user)
      if (elem === 'email') return authService().getUserEmail(this.$store.state.user)
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn;
    },
  }
};
</script>
