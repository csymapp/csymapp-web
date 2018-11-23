<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5 lg4>
            <v-card class="elevation-1 pa-1">
              <v-card-text>

                <v-tabs
                  slot="extension"
                  v-model="model"
                  centered
                  slider-color="black"
                  grow
                >
                  <v-tab :key="1" href="#tab-1">New Account</v-tab>
                  <v-tab :key="2" href="#tab-2">Login</v-tab>
              </v-tabs>
              <v-spacer></v-spacer>
              <div class="layout column align-center">
                  <!-- <h2>{{defaultAppName.toUpperCase()}}</h2> -->
                  <h2>{{defaultAppName}}</h2>
                  <v-icon v-if="model==='tab-2'" right>fa-lock</v-icon>
                  <v-icon v-if="model==='tab-1'" right>fa-user-plus</v-icon>
              </div>   
              <v-tabs-items v-model="model">
                <v-tab-item :id="`tab-1`" :key="1" >
                  
                  <v-form>
                    <v-text-field append-icon="person" name="email" label="Email" type="text" v-model="user.email"></v-text-field>
                    <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="user.password"></v-text-field>
                    <v-text-field append-icon="lock" name="cpassword" label="Confirm Password" id="cpassword" type="password" v-model="user.cpassword"></v-text-field>
                  </v-form>

                  <v-card-actions>
                    <v-btn block to="/">
                      <v-icon color="light-blue" left>fa fa-home</v-icon>Home
                    </v-btn>
                    <!-- <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn> -->
                    <v-btn block to="/#/">
                      <v-icon color="light-blue" left>fa fa-user-plus</v-icon>Register
                    </v-btn>

                  </v-card-actions>
                  <v-card-actions>
                     <v-btn icon>
                      <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red">fa fa-google fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-black">fa fa-github fa-lg</v-icon>
                    </v-btn>

                  </v-card-actions>
                </v-tab-item>
                <v-tab-item :id="`tab-2`" :key="2" >
                  <v-form>
                    <v-text-field append-icon="person" name="login" label="Email" type="text" v-model="user.email"></v-text-field>
                    <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="user.password"></v-text-field>
                  </v-form>

                  <v-card-actions>
                    <v-btn block to="/">
                      <v-icon color="light-blue" left>fa fa-home</v-icon>Home
                    </v-btn>
                    <!-- <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn> -->
                    <v-btn block to="/#/">
                      <v-icon color="light-blue" left>fa fa-sign-in</v-icon>Login
                    </v-btn>

                  </v-card-actions>
                  <v-card-actions>
                     <v-btn icon>
                      <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red">fa fa-google fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-black">fa fa-github fa-lg</v-icon>
                    </v-btn>

                  </v-card-actions>

                </v-tab-item>
              </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import config from '@/services/config'
export default {
 name: 'authform',
  data: () => ({
    defaultAppName: config.get('/defaultAppName'),
    loading: false,
    path: 'login',
    user: {
      email: '',
      password: '',
      cpassword: ''
    },
    model: 'tab-2',
    id: 'login'
  }),
  watch: {
    $route (to, from){
      let self = this
      let path = to.fullPath;
      this.changeTab(path)
    },
  },
  created () {
    let path = this.$route.path;
    this.changeTab(path)
  },
  methods: {
    changeTab(path) {
      // go home if user logged in
      if (this.$store.state.isLoggedIn === true) {
        this.$router.push('/');
      }
      path = path.split('/');
      this.path = path[path.length - 1];
      if (this.path !== 'login' && this.path !== 'register') {
        this.$router.push('/404');
      }
      if (this.path === 'login') {
        this.model = 'tab-2';
      }
      else { this.model = 'tab-1' }
    },
    login () {
      this.loading = true;
      setTimeout(() => {
        this.$router.push('/dashboard');
      }, 1000);
   }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
