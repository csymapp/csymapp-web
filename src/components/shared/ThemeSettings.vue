<template>
<div id="themeSetting">
  <v-toolbar color="primary" dark>
    <v-toolbar-title>
      Theme Settings
    </v-toolbar-title>
  </v-toolbar>
  <v-container>
    <v-layout column>
      <v-flex>
        <v-subheader class="px-1 my-2">
          Color Option
        </v-subheader>
        <div class="color-option">
          <v-layout wrap>
            <label class="color-option--label flex xs6 pa-1" v-for="(option,index) in themeColorOptions" :key="index">
              <input type="radio" name="color" v-bind:value="option.key" v-model="themeColor">
              <span class="color-option--item bg">
                <span class="overlay">
                  <span class="material-icons">check</span>
                </span>
                <span class="color-option--item--header sideNav" :class="option.value.sideNav"></span>
                <span class="color-option--item--header mainNav" :class="option.value.mainNav"></span>
                <span class="sideMenu" :class="option.value.sideManu"></span>
              </span>
            </label>
          </v-layout>
        </div>
        <div class="theme-options">
          <v-subheader class="px-1 my-2">
            Sidebar Option
          </v-subheader>
          <v-divider></v-divider>
          <div class="my-3">
            <v-btn-toggle v-model="sideBarOption">
              <v-btn flat value="dark">
                Dark
              </v-btn>
              <v-btn flat value="light">
                Light
              </v-btn>
            </v-btn-toggle>   
          </div>
        </div>        
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import colors from 'vuetify/es5/util/colors';
export default {
  data () {
    return {
      themeColor: false,
      sideBarOption: false,
      colors: colors
    };
  },
  computed: {
    themeColorOptions () {
      return [
        {
          key: 'blue',
          value: {
            sideNav: 'blue',
            mainNav: 'blue',
            sideManu: 'white'
          }
        },
        // {
        //   key: 'lightBlue',
        //   value: {
        //     sideNav: 'blue',
        //     mainNav: 'white',
        //     sideManu: 'blue lighten-1'
        //   }
        // },
        {
          key: 'teal',
          value: {
            sideNav: 'teal',
            mainNav: 'teal',
            sideManu: 'white'
          }
        },
        {
          key: 'red',
          value: {
            sideNav: 'red',
            mainNav: 'red',
            sideManu: 'white'
          }
        },
        {
          key: 'orange',
          value: {
            sideNav: 'orange',
            mainNav: 'orange',
            sideManu: 'white'
          }
        },
        {
          key: 'purple',
          value: {
            sideNav: 'purple',
            mainNav: 'purple',
            sideManu: 'white'
          }
        },
        {
          key: 'indigo',
          value: {
            sideNav: 'indigo',
            mainNav: 'indigo',
            sideManu: 'white'
          }
        },
        {
          key: 'cyan',
          value: {
            sideNav: 'cyan',
            mainNav: 'cyan',
            sideManu: 'white'
          }
        },
        {
          key: 'pink',
          value: {
            sideNav: 'pink',
            mainNav: 'pink',
            sideManu: 'white'
          }
        },
        {
          key: 'green',
          value: {
            sideNav: 'green',
            mainNav: 'green',
            sideManu: 'white'
          }
        }
      ];
    }
  },  
  watch: {
    themeColor: {
      handler (val) {
        if (val === false) {
          console.log('first time setup...')
          try{
            this.theme = JSON.parse(localStorage.theme).primary 
          }catch(error) {
            this.theme = 'indigo'
          }
          return;
        }
        if(JSON.parse(localStorage.startingNow).theme === true) {
          let tmp = JSON.parse(localStorage.startingNow)
          tmp.theme = false;
          localStorage.startingNow = JSON.stringify(tmp);
          return;
        } else {
          // let tmp = JSON.parse(localStorage.theme) === undefined?  {}: JSON.parse(localStorage.theme) 
          let tmp = {}
          try{
            tmp = JSON.parse(localStorage.theme)
          }catch(error){}
          tmp.primary = this.colors[val].base
          // localStorage.theme= JSON.stringify({
          //   primary :this.colors[val].base
          // });
          localStorage.theme = JSON.stringify(tmp)
          this.$vuetify.theme.primary = this.colors[val].base;
        }
        
      },
      immediate: true
    },
    sideBarOption: {
      handler (val) {
        if (val === false) {
          try{
            this.theme = JSON.parse(localStorage.theme).dark 
          }catch(error) {
            this.sideBarOption = 'light'
          }
          return;
        }
        if(JSON.parse(localStorage.startingNow).dark === true) {
          let tmp = JSON.parse(localStorage.startingNow)
          tmp.dark = false;
          localStorage.startingNow = JSON.stringify(tmp);
          return;
        } else {
          // localStorage.theme= JSON.stringify({
          //   primary :this.colors[val].base
          // });
          let tmp = {}
          try{
            tmp = JSON.parse(localStorage.theme)
          }catch(error){}
          // let tmp = JSON.parse(localStorage.theme) === undefined?  {}: JSON.parse(localStorage.theme) 
          tmp.dark = (val === 'dark');
          localStorage.theme = JSON.stringify(tmp)
          // localStorage.startingNow = JSON.stringify(tmp);
          // this.$vuetify.theme.primary = this.colors[val].base;
          this.$vuetify.dark = (val === 'dark');
        }
        // this.$vuetify.dark = (val === 'dark');
      },
      immediate: true      
    }
  },  

};
</script>
<style lang="stylus" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer  
    & input[type="radio"] 
      display:none
      &+span 
        position: relative
        &>.overlay
          display: none;
          position: absolute
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.3);
          text-align: center;
          line-height: 30px;
          color: #fff;                
      &:checked+span>.overlay
        display:block  
    & .bg        
      background-color: #f1f1f1
  &--item
    overflow: hidden;
    display: block;
    box-shadow: 0 0 2px rgba(0,0,0,.1);
    margin-bottom: 15px;      
    &--header
      height: 10px
    &>span 
      display: block;
      float: left;
      width: 50%;
      height: 20px;          
</style>

