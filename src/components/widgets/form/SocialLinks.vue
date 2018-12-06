<template>
    <v-container grid-list-md text-xs-center fluid>
        <v-layout row wrap>
        <v-flex xs2>
            <v-btn icon>
            <v-icon color="blue" @click="facebookLogin()">fa fa-facebook-square fa-lg</v-icon>
            </v-btn>
        </v-flex>
        
        <v-flex xs2>
            <v-btn icon>
            <v-icon color="red" @click="googleLogin()">fa fa-google fa-lg</v-icon>
            </v-btn>
        </v-flex>
        
        <v-flex xs2>
            <v-btn icon>
            <v-icon color="light-blue" @click="twitterLogin()">fa fa-twitter fa-lg</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs2>
            <v-btn icon>
            <v-icon color="light-black"  @click="githubLogin()">fa fa-github fa-lg</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs2>
            <v-btn icon>
            <v-icon color="#0077b5" @click="linkedinLogin()">fa fa-linkedin fa-lg</v-icon>
            </v-btn>
        </v-flex>
        <!-- <v-flex xs2>
            <v-btn icon>
            <v-icon color="#0077b5" @click="phoneLogin()">fa fa-phone fa-lg</v-icon>
            </v-btn>
        </v-flex> -->
        </v-layout>
    </v-container>
</template>

<script>
import authService from '@/apps/csystem/services/auth'
import to from 'await-to-js';
export default {
    methods: {
        async githubLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().githubLogin(state))
    },

    
    async linkedinLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().linkedinLogin(state))
    },



    
    async facebookLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().facebookLogin(state))
    },
    
    async googleLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().googleLogin(state))
    },
    
    async twitterLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().twitterLogin(state))
    },

    async phoneLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().twitterLogin(state))
    },
    }
  
};
</script>