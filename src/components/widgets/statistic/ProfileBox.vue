<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <div class="layout row ma-0">
          
          <div class="sm6 xs6 flex">
            <v-tooltip bottom>
              <div slot="activator" class="layout column ma-0 justify-center align-center">
                <v-dialog v-model="basic.dialog" persistent max-width="500px">
                  <div class="layout column ma-0 justify-center align-center" slot="activator">
                    <v-badge left :color="color" >
                        <span slot="badge"  style="cursor:pointer">+</span>
                        <v-icon size="56px" :color="color" :background-color="color" style="cursor:pointer">{{icon}}</v-icon>
                    </v-badge>
                    
                  </div>
                  <EmaAddition @close="basic.dialog = false" v-if="social==='an email'" :color=color></EmaAddition>
                  <GitAddition @close="basic.dialog = false" v-else-if="social==='a github'" :color=color ></GitAddition>
                  <GoogleAddition @close="basic.dialog = false" v-else-if="social==='a google'" :color=color ></GoogleAddition>
                  <FacebookAddition @close="basic.dialog = false" v-else-if="social==='a facebook'" :color=color ></FacebookAddition>
                  <TwitterAddition @close="basic.dialog = false" v-else-if="social==='a twitter'" :color=color ></TwitterAddition>
                  <LinkedinAddition @close="basic.dialog = false" v-else-if="social==='a linkedin'" :color=color ></LinkedinAddition>
                  <TelephoneAddition @close="basic.dialog = false" v-else-if="social==='a telephone'" :color=color ></TelephoneAddition>
                  <StillWorking @close="basic.dialog = false" v-else :color=color></StillWorking>
                </v-dialog>
              </div>
              <span>Add {{ social }} account</span>
            </v-tooltip>
          </div>
          <div class="sm6 xs6 flex text-sm-center py-3 white--text" :class="color" :style="{ backgroundColor: color}" style="cursor:grab">
            <div >{{ title }} {{ subTitle }}</div> 
            <span class="caption" underline @click="goto(togoto)" style="cursor:pointer;"> <v-icon dark left small>arrow_forward</v-icon></span>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>    
</template>

<script>
import VWidget from '@/components/VWidget';
import EmaAddition from '@/components/widgets/form/EmailAddition';
import GitAddition from '@/components/widgets/form/GithubAddition';
import GoogleAddition from '@/components/widgets/form/GoogleAddition';
import FacebookAddition from '@/components/widgets/form/FacebookAddition';
import TwitterAddition from '@/components/widgets/form/TwitterAddition';
import LinkedinAddition from '@/components/widgets/form/LinkedinAddition';
import TelephoneAddition from '@/components/widgets/form/TelephoneAddition';
import StillWorking from '@/components/widgets/form/stillWorking';
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String,
    social: String,
    togoto: String,
  },
   components: {
    VWidget,
    EmaAddition,
    StillWorking,
    GitAddition,
    GoogleAddition,
    FacebookAddition,
    TwitterAddition,
    LinkedinAddition,
    TelephoneAddition
  },
  data () {
    return {
      basic: {
        dialog: false
      },
      fullscreen: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false        
      },
      scrollable: {
        name: '',
        dialog: false        
      }
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    }
  }
};
</script>
