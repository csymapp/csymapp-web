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
  mounted () {
    if(localStorage.startingNow === undefined)  {
      localStorage.startingNow =  JSON.stringify({
        theme:true,
        dark: true
      });
    }
    else {
      localStorage.startingNow =  JSON.stringify({
        theme:false,
        dark: false
      });
      this.$vuetify.theme.primary = JSON.parse(localStorage.theme).primary;
      this.$vuetify.dark = JSON.parse(localStorage.theme).dark
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
