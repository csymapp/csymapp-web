<template>
  <v-app id="login" class="primary" z-index="100">
    <v-content  z-index="100">
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
              <!-- <p v-if="errors.email.length || errors.password.length  || errors.cpassword.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors.email">{{ error }}</li>
                  <li v-for="error in errors.password">{{ error }}</li>
                  <li v-for="error in errors.cpassword">{{ error }}</li>
                </ul>
              </p> -->
              <v-tabs-items v-model="model">
                <v-tab-item :id="`tab-1`" :key="1" >
                  
                  <v-form>
                    <p class="control has-icon has-icon-right">
                      <v-text-field  name="registeremail" data-vv-as="Email" v-model="user.registeremail" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('registeremail') }" type="text" placeholder="Email" ref="registeremail"></v-text-field>
                      <i v-show="errors.has('registeremail')" class="fa fa-warning"></i>
                      <span v-show="errors.has('registeremail')" class="danger">{{ errors.first('registeremail') }}</span>
                    </p>
                    <p class="control has-icon has-icon-right">
                        <v-text-field  name="registerpassword" data-vv-as="Password" v-model="user.registerpassword" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('registerpassword') }" type="password" placeholder="Password" ref="registerpassword"></v-text-field>
                        <i v-show="errors.has('registerpassword')" class="fa fa-warning"></i>
                        <span v-show="errors.has('registerpassword')" class="danger">{{ errors.first('registerpassword') }}</span>
                    </p>  
                    <p class="control has-icon has-icon-right">
                        <v-text-field  name="Confirmpassword" data-vv-as="Confirm Password" v-model="user.confirmpassword" v-validate="'required|min:6|confirmed:registerpassword'" :class="{'input': true, 'is-danger': errors.has('Confirmpassword') }" type="password" placeholder="Confirm Password"></v-text-field>
                        <i v-show="errors.has('Confirmpassword')" class="fa fa-warning"></i>
                        <span v-show="errors.has('Confirmpassword')" class="danger">{{ errors.first('Confirmpassword') }}</span>
                    </p>    
                  </v-form>

                  <v-card-actions>
                    <v-btn block to="/">
                      <v-icon color="light-blue" left>fa fa-home</v-icon>Home
                    </v-btn>
                    <v-btn block @click="validateRegister()">
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
                  <p class="control has-icon has-icon-right">
                      <v-text-field  name="email" v-model="user.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email"></v-text-field>
                      <i v-show="errors.has('email')" class="fa fa-warning"></i>
                      <span v-show="errors.has('email')" class="danger">{{ errors.first('email') }}</span>
                  </p>
                  <p class="control has-icon has-icon-right">
                      <v-text-field  name="password" v-model="user.password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password"></v-text-field>
                      <i v-show="errors.has('password')" class="fa fa-warning"></i>
                      <span v-show="errors.has('password')" class="danger">{{ errors.first('password') }}</span>
                  </p>        
                </v-form>
                <v-card-actions>
                  <v-btn block to="/">
                    <v-icon color="light-blue" left>fa fa-home</v-icon>Home
                  </v-btn>
                  <v-btn block @click="validateLogin()">
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
                    <v-btn icon @click="githubLogin()">
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
import authService from '@/apps/csystem/services/auth'
import to from 'await-to-js';

const dict = {
  custom: {
    email: {
      required: 'Please enter your email address'
    },
    password: {
      min: 'Please enter atleast 6 characters',
      required: () => 'Please enter your password'
    },
    registeremail: {
      required: () => 'Please enter your email address'
    },
    registerpassword: {
      min: 'Please enter atleast 6 characters',
      required: () => 'Please enter your password'
    },
    Confirmpassword: {
      required: () => 'Please enter your password again',
      min: 'Please enter atleast 6 characters',
      confirmed: 'Your passwords don\'t match'
    }
  }
};



export default {
  name: 'authform',
  components: {
  //  ValidationProvider
  },
  data: () => ({
    defaultAppName: config.get('/defaultAppName'),
    loading: false,
    path: 'login',
    user: {
      email: '',
      registeremail: '',
      password: '',
      registerpassword: '',
      confirmpassword: ''
    },
    model: 'tab-2',
    id: 'login',
    formSubmitted: false
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
    async githubLogin() {
      let self = this
      let uid = authService().getUid(self.$store.state.user.userdata)
      let state = this.$store.state
      let [err, care] = await to(authService().githubLogin(state))
    },

    async login () {
      let [err, care] = await to(authService().emailLogin(this.user.email, this.user.password))
    },

    async validateRegister() {
      let self = this
      let fields = ['registeremail', 'registerpassword', 'Confirmpassword'];
      let promises = fields.map(self.validateField);
      let [err, care] = await to(Promise.all(promises));
      if(err) return;
      let uid = authService().getUid(self.$store.state.user.userdata)
      ;[err, care] = await to(authService().emailRegister({email:this.user.registeremail, password:this.user.registerpassword, cpassword:this.user.confirmpassword, state:this.$store.state, uid}))
      if(err)
        try{
          self.errors.add({
            field: 'registerpassword',
            msg: err.data.error
          }); 
          window.getApp.$emit('ERROR_EVT', err.data.error);
          
        }catch(error) {
          self.errors.add({
            field: 'registerpassword',
            msg: 'unknown error. Please try again later'
          }); 
          window.getApp.$emit('ERROR_EVT','unknown error. Please try again later');
        }
      else {
         window.getApp.$emit('APP_REGISTER_SUCCESS');
      }
    },
    async validateLogin() {
      let self = this
      let fields = ['email', 'password'];
      let promises = fields.map(self.validateField);
      let [err, care] = await to(Promise.all(promises));
      if(err) return;

      ;[err, care] = await to(authService().emailLogin({email:this.user.email, password:this.user.password}))
      if(err)
        try{
          self.errors.add({
            field: 'password',
            msg: err.data.error
          }); 
          window.getApp.$emit('ERROR_EVT', err.data.error);
          
        }catch(error) {
          self.errors.add({
            field: 'password',
            msg: 'unknown error. Please try again later'
          }); 
          window.getApp.$emit('ERROR_EVT','unknown error. Please try again later');
        }
      else {
        self.$store.state.isLoggedIn = true;
        let user = care.data
        self.$store.state.token = user.token;
        self.$store.state.user.userdata = user;
         window.getApp.$emit('APP_LOGIN_SUCCESS');
      }
    },
    validateField(field) {
      let self = this
      return new Promise(function(resolve, reject) {
      self.$validator.validate(field).then((result) => {
          if (result) {
            return resolve();
          }
          reject('Some field missing');
        });
      })

    }
    
  },
  mounted() {
    this.$validator.localize('en', dict);
    console.log('loaded...')
    console.log(urlParams.get('token')); // "edit"
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
