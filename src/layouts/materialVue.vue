<template>
  <div id="appRoot">
    <v-app id="inspire" class="app">
    
    <app-toolbar class="app--toolbar"></app-toolbar>
    <!-- <fixedToolbar></fixedToolbar> -->
    <app-drawer class="app--drawer"></app-drawer>
    <v-content>
      <!-- <app-drawer class="app--drawer"></app-drawer> -->
        <!-- Page Header -->
        <page-header v-if="$route.meta.breadcrumb"></page-header>
        <div class="page-wrapper">
        <router-view></router-view>
        </div>   
        <!-- App Footer -->
        <!-- <v-footer height="auto" class="white pa-3 app--footer">
        <span class="caption">isocked.com Design &copy; {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
        <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon>
        </v-footer> -->

         <!-- App Footer -->
          
    </v-content>
    <v-footer height="auto" class="white pa-3 app--footer">
      <span>
        <span class="caption"><strong>Copyright &copy; <a href="https://csybersystems.cseco.co.ke" target="blank" style="text-decoration: none;">CSYBER SYSTEMS</a>, {{ new Date().getFullYear() }} </strong></span>
        <br>
        <span>Open Sourced Under Apache</span>
        <br>
        Built with <v-icon small>favorite</v-icon> by CSYBER SYSTEMS
      </span>
      <v-spacer></v-spacer>
      <span>
        <span class="caption"> 
          <v-btn icon href="https://github.com/csymapp/csymapp-web" target="_blank">
            <v-icon small>fa fa-github</v-icon>
          </v-btn> 
        </span> 
        <!-- <span class="caption"> 
          <v-btn icon href="https://github.com/tookit/vue-material-admin">
            <v-icon small color="indigo">fa fa-facebook</v-icon>
          </v-btn> 
        </span><span class="caption"> 
          <v-btn icon href="https://github.com/tookit/vue-material-admin">
            <v-icon small color="light-blue">fa fa-twitter</v-icon>
          </v-btn> 
        </span>  -->
        <br>
        <span class="caption" style="{float:right;}"> <strong>Version</strong> {{version}} </span> 

        <!-- <span class="caption mr-1"> <v-icon small>github</v-icon> </span>  -->
        <!-- <span class="caption mr-1"> <v-icon small>facebook</v-icon> </span>  -->
        <!-- <span class="caption mr-1"> <v-icon small>twitter</v-icon> </span>  -->
      </span>
    </v-footer>
    <!-- Go to top -->
    <app-fab ></app-fab>
    <!-- theme setting -->
    <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab primary" @click="openThemeSettings">
        <v-icon>settings</v-icon>
    </v-btn>
    <v-navigation-drawer
        class="setting-drawer"
        temporary
        right
        v-model="rightDrawer"
        hide-overlay
        fixed
        >
        <theme-settings></theme-settings>
    </v-navigation-drawer>        
    </v-app>
  </div>
</template>

<script>
import AppDrawer from '@/components/shared/AppDrawer';
import AppToolbar from '@/components/shared/AppToolbar';
import fixedToolbar from './toolBars/fixedToolbar';
import AppFab from '@/components/shared/AppFab';
import PageHeader from '@/components/shared/PageHeader';
import menu from '@/api/menu';
import ThemeSettings from '@/components/shared/ThemeSettings';
import AppEvents from  '../event';
import config from '@/services/config'
export default {
  name: 'materialVueLayout',
  components: {
    AppDrawer,
    AppToolbar,
    fixedToolbar,
    AppFab,
    PageHeader,
    menu,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: ''
    },
    version: config.get('/version'),
  }),
  mounted () {
    try{
      this.$vuetify.theme.primary = JSON.parse(localStorage.theme).primary;
      this.$vuetify.dark = JSON.parse(localStorage.theme).dark
    }catch(err){    }
  },
  created () {
    AppEvents.forEach(item => {
      console.log(`name:${item.name}`);
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    openThemeSettings () {
      this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    }
  },
};
</script>

<style lang="stylus" scoped>
  .setting-fab 
    top:50%!important; 
    right:0;
    border-radius:0  
  .page-wrapper
    min-height:calc(100vh - 64px - 50px - 81px );  

</style>
