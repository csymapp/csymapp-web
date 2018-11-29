<template>
  <v-card :color="color">
    <v-card-text>
        <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12>
            <v-progress-linear indeterminate value="15" color="white"></v-progress-linear>
            </v-flex>
            <v-flex xs12>
              <v-btn  @click="githubLogin()">Add Account</v-btn>
            </v-flex>
        </v-layout>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white" flat @click="$emit('close')">Close</v-btn>
    </v-card-actions>
    </v-card>  
</template>

<script>
import authService from '@/apps/csystem/services/auth'
import to from 'await-to-js';
export default {
  props: {
    color: String
  },
   components: {
    // VWidget
  },
  data () {
    return {
      basic: {
        dialog: false
      },
    };
  },
  methods: {
    async githubLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().githubLogin(state))
    },
  },
   mounted () {
     
  },
};
</script>
