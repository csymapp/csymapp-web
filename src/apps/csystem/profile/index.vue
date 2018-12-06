<template>

<div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <draggable  element="v-layout" :options="options" class="row wrap" row wrap>
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-envelope"
            :title=String(user.Emailprofiles?user.Emailprofiles.length:String(0))
            :sub-title=profileString(user.Emailprofiles)
            color="primary"   
            social="an email"  
            togoto="/csystem/profile/email"
          >
          </profile-box>    
                  
        </v-flex>
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-facebook"
            :title=String(user.Facebooks?user.Facebooks.length:String(0))
            :sub-title=profileString(user.Facebooks)
            color="indigo"
            social="a facebook"  
            togoto="/csystem/profile/facebook"    
          >
          </profile-box>  
        </v-flex>
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-google"
            :title=String(user.Googles?user.Googles.length:String(0))
            :sub-title=profileString(user.Googles)
            color="red"   
            social="a google"   
            togoto="/csystem/profile/google" 
          >
          </profile-box>           
        </v-flex>          
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-twitter"
            :title=String(user.Twitters?user.Twitters.length:String(0))
            :sub-title=profileString(user.Twitters)
            color="light-blue"  
            social="a twitter"    
            togoto="/csystem/profile/twitter" 
          >
          </profile-box>            
        </v-flex>        
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-phone"
            :title=String(user.Telephones?user.Telephones.length:String(0))
            :sub-title=profileString(user.Telephones)
            color="primary" 
            social="a telephone"  
            togoto="/csystem/profile/telephone"    
          >
          </profile-box>             
        </v-flex>   
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-linkedin"
            :title=String(user.Linkedins?user.Linkedins.length:String(0))
            :sub-title=profileString(user.Linkedins)
            color="#0077B5" 
            social="a linkedin"  
            togoto="/csystem/profile/linkedin"    
          >
          </profile-box>             
        </v-flex>   
        <!-- <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-instagram"
            :title=String(user.Instagrams?user.Instagrams.length:String(0))
            :sub-title=profileString(user.Instagrams)
            color="purple" 
            social="an instagram"  
            togoto="/csystem/profile/instagram"    
          >
          </profile-box>             
        </v-flex>    -->
        <v-flex lg2 sm6 xs12>
          <profile-box
            icon="fa fa-github"
            :title=String(user.Githubs?user.Githubs.length:String(0))
            :sub-title=profileString(user.Githubs)
            color="black"  
            social="a github"    
            togoto="/csystem/profile/github" 
          >
          </profile-box>             
        </v-flex>   
        </draggable>

        <draggable  element="v-layout" :options="options" class="row wrap" row wrap>
        <!-- <v-layout row wrap> -->
       
        <v-flex lg12 sm12 xs12>
          <v-widget title="Profiles" content-bg="white">
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', profileData],
                  ['legend.bottom', '0'],
                  ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],         
                  ['series[0].radius', ['50%', '70%']],                      
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>
                    
        </draggable>
    </v-container>
  </div>
</template>

<script>
import materialVueLayout from '@/layouts/materialVue';
// import collapsible from 'vue-collapsible';
// const collapsibleItem = require('vue-collapsible/collapsible-item');
import draggable from 'vuedraggable'



import API from '@/api';
import EChart from '@/components/chart/echart';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import ProfileBox from '@/components/widgets/statistic/ProfileBox';
import PostListCard from '@/components/widgets/card/PostListCard';
import ProfileCard from '@/components/widgets/card/ProfileCard';
import PostSingleCard from '@/components/widgets/card/PostSingleCard';
import WeatherCard from '@/components/widgets/card/WeatherCard';
import PlainTable from '@/components/widgets/list/PlainTable';
import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';
import VCircle from '@/components/circle/VCircle';
import BoxChart from '@/components/widgets/chart/BoxChart';
import ChatWindow from '@/components/chat/ChatWindow';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';

export default {
  name: 'csystemApps',
  components: {
    materialVueLayout,
    draggable,
     VWidget,
    MiniStatistic,
    ProfileBox,
    ChatWindow,
    VCircle,
    WeatherCard,
    PostSingleCard,
    PostListCard,
    ProfileCard,
    EChart,
    BoxChart,
    CircleStatistic,
    LinearStatistic,
    PlainTable,
    PlainTableOrder    
    // collapsible
    //  "collapsible": require("vue-collapsible/collapsible"),
    // "collapsible-item": require("vue-collapsible/collapsible-item")
  },
  data: () => ({
    user: {},

    options: {
      // dropzoneSelector: 'ul',
      // draggableSelector: 'li',
      // excludeOlderBrowsers: true,
      // showDropzoneAreas: true,
      // multipleDropzonesItemsDraggingEnabled: true,
      // onDrop(event) {},
      // onDragstart(event) {
      //   event.stop();
      // },
      // onDragend(event) {
      //   event.stop();
      // }
    },
       color: Material,
    selectedTab: 'tab-1',
    }),
  methods: {
  		removeJob: function(machineId, jobNumber, jobs, index) {
      	// Remove job from GUI
        jobs.splice(index, 1);
      },
      profileString(profile) {
        if(!profile) return "Profiles"
        if(profile.length === 1)return "Profile"
        return "Profiles"
      }
  },

  async mounted () {
    let self = this
    self.user = self.$store.state.user.userdata
    console.log(self.user)
    
    
  },
  computed: {
    profileData () {
      let user = this.$store.state.user.userdata
      let data = [
        {
          name: 'Email',
          value: user.Emailprofiles?user.Emailprofiles.length : 0 
        },
        {
          name: 'Facebook',
          value: user.Facebooks?user.Facebooks.length : 0 
        },
        {
          name: 'Google',
          value: user.Googles?user.Googles.length : 0 
        },
        {
          name: 'Linkedin',
          value: user.Linkedins?user.Linkedins.length : 0 
        },
        {
          name: 'Twitter',
          value: user.Twitters?user.Twitters.length : 0 
        },
        {
          name: 'Github',
          value: user.Githubs?user.Githubs.length : 0 
        },
        {
          name: 'Phone',
          value: user.Telephones?user.Telephones.length : 0 
        },
      ]
      return data;
    }
  },

};
</script>