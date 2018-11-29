<template>
  <router-view></router-view>
</template>
<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import AppFab from '@/components/AppFab';
import PageHeader from '@/components/PageHeader';
import menu from '@/api/menu';
import ThemeSettings from '@/components/ThemeSettings';
import AppEvents from  './event';

import config from '@/services/config'
import authService from '@/apps/csystem/services/auth'
import to from 'await-to-js';
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
    }
  }),

  computed: {

  },

  watch: {
    $route (to, from){
      let self = this
      if(localStorage.startingNow === undefined)
      localStorage.startingNow =  JSON.stringify({
        theme:true,
        dark: true
      });
      else {
        localStorage.startingNow =  JSON.stringify({
          theme:false,
          dark: false
        });
        this.$vuetify.theme.primary = JSON.parse(localStorage.theme).primary;
        this.$vuetify.dark = JSON.parse(localStorage.theme).dark
      }
      
    },
  },

  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    
  },
  async mounted () {
    // console.log('mount')
    let urlParams = new URLSearchParams(window.location.search);
    let self = this,
      params = urlParams.toString(),
      token = urlParams.get('token');
    if (token) {
      let [err, care] = await to(authService().loginusingToken(token));
      if(err)
        window.getApp.$emit('ERROR_EVT',  err.data.error);
      else {
        
        self.$store.state.isLoggedIn = true;
        let user = care.data
        let token = care.data.token
        self.$store.state.token = token;
        self.$store.state.user.userdata = user;
        window.getApp.$emit('APP_LOGIN_SUCCESS');
        params = '?' + params
        this.$router.push('/csystem/redirect')
        let href = window.location.href.replace(params,'')
        window.location.href = href
      }

    }
    
    
  },
  methods: {
    // openThemeSettings () {
    //   this.$vuetify.goTo(0);
    //   this.rightDrawer = (!this.rightDrawer);
    // }
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
