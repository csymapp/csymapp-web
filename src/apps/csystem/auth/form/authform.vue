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
              <div class="layout column align-center has-text-centered">
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
                    <b-field 
                        :type="{'is-danger': errors.has('registeremail')}"
                        :message="errors.first('registeremail')">
                        
                        <b-input v-model="user.registeremail" name="registeremail" v-validate="'required|email'"  placeholder="Email" />
                    </b-field>
                    <b-field 
                        :type="{'is-danger': errors.has('registerpassword')}"
                        :message="errors.first('registerpassword')">
                        
                        <b-input v-model="user.registerpassword" name="registerpassword" v-validate="'required|min:6'"  placeholder="Password" type="password" ref="password"/>
                    </b-field>
                    
                    <b-field 
                        :type="{'is-danger': errors.has('Confirmpassword')}"
                        :message="errors.first('Confirmpassword')">
                        
                        <b-input v-model="user.confirmpassword" name="Confirmpassword" v-validate="'required|min:6|confirmed:password'"  placeholder="Confirm Password" type="password"/>
                    </b-field>
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
                     <!-- <v-btn icon>
                      <v-icon color="blue" @click="facebookLogin()">fa fa-facebook-square fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red" @click="googleLogin()">fa fa-google fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-blue" @click="twitterLogin()">fa fa-twitter fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-black"  @click="githubLogin()">fa fa-github fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="#0077b5" @click="linkedinLogin()">fa fa-linkedin fa-lg</v-icon>
                    </v-btn> -->

                  

                    <SocialLinks></SocialLinks>
                  </v-card-actions>


              <div grid-list-xl fluid row wrap class="row wrap">
                
                <!-- <v-flex lg1 sm1 xs2>
                  <v-btn icon>
                    <v-icon color="blue" @click="facebookLogin()">fa fa-facebook-square fa-lg</v-icon>
                  </v-btn>  
                </v-flex>
                <v-flex lg2 sm2 xs2>
                  <v-btn icon>
                    <v-icon color="red" @click="googleLogin()">fa fa-google fa-lg</v-icon>
                  </v-btn>  
                </v-flex>
                <v-flex lg2 sm6 xs12>
                  <v-btn icon>
                    <v-icon color="light-blue" @click="twitterLogin()">fa fa-twitter fa-lg</v-icon>
                  </v-btn>  
                </v-flex>
                <v-flex lg2 sm6 xs12>
                  <v-btn icon>
                    <v-icon color="blue" @click="facebookLogin()">fa fa-facebook-square fa-lg</v-icon>
                  </v-btn>  
                </v-flex>
                <v-flex lg2 sm6 xs12>
                  <v-btn icon>
                    <v-icon color="light-black"  @click="githubLogin()">fa fa-github fa-lg</v-icon>
                  </v-btn> 
                </v-flex>
                <v-flex lg2 sm6 xs12> 
                  <v-btn icon>
                    <v-icon color="#0077b5" @click="linkedinLogin()">fa fa-linkedin fa-lg</v-icon>
                  </v-btn>  
                </v-flex> -->
              </div>
                          
                
                </v-tab-item>
                <v-tab-item :id="`tab-2`" :key="2" >
                <v-form>

                  <b-field 
                      :type="{'is-danger': errors.has('email')}"
                      :message="errors.first('email')">
                      
                      <b-input v-model="user.email" name="email" v-validate="'required|email'"  placeholder="Email" />
                  </b-field>

                  <b-field
                      :type="{'is-danger': errors.has('password')}"
                      :message="errors.first('password')">
                      <b-input v-model="user.password" name="password" v-validate="'required|min:6'" placeholder="Password" type="password"/>
                  </b-field>
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
                     <!-- <v-btn icon>
                      <v-icon color="blue" @click="facebookLogin()">fa fa-facebook-square fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red" @click="googleLogin()">fa fa-google fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-blue" @click="twitterLogin()">fa fa-twitter fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon @click="githubLogin()">
                      <v-icon color="light-black">fa fa-github fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon @click="linkedinLogin()">
                      <v-icon color="#0077b5">fa fa-linkedin fa-lg</v-icon>
                    </v-btn> -->
                    <SocialLinks></SocialLinks>

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
import SocialLinks from '@/components/widgets/form/SocialLinks'
import to from 'await-to-js';

const dict = {
  custom: {
    email: {
      required: 'Please enter your email address',
      email: () => 'Please enter a valid email address'
    },
    password: {
      min: 'Please enter atleast 6 characters',
      required: () => 'Please enter your password'
    },
    registeremail: {
      required: () => 'Please enter your email address',
      email: () => 'Please enter a valid email address'
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
    SocialLinks
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
          let tmpErr =  err.data.error;
          try{
            tmpErr = JSON.parse(tmpErr)
          }catch(error) {}
          let field = 'registerpassword';
          if(typeof tmpErr === 'object') {
             
            for (let i in tmpErr) {
              err = tmpErr[i]
              if(i === 'Email'){
                field = 'registeremail'
                err = tmpErr[i]
              }
              if(i === 'Password')
                field = 'registerpassword'
              
              if(i === 'Cpassword')
                field = 'Confirmpassword'
            }
              
          }

          self.errors.add({
            // field: 'registerpassword',
            field,
            msg: err
          }); 
          window.getApp.$emit('ERROR_EVT',err);
          
        }catch(error) {
          // self.errors.add({
          //   field: 'registerpassword',
          //   msg: 'unknown error. Please try again later'
          // }); 
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
          let tmpErr =  err.data.error;
          try{
            tmpErr = JSON.parse(tmpErr)
          }catch(error) {}

          let field = 'password';
          if(typeof tmpErr === 'object') {
             
            for (let i in tmpErr) {
              err = tmpErr[i]
              if(i === 'Email'){
                field = 'email'
                err = tmpErr[i]
              }
              if(i === 'Password')
                field = 'password'
            }
              
          }
          self.errors.add({
            field,
            msg: err
          }); 
          window.getApp.$emit('ERROR_EVT', err);
          
        }catch(error) {
          // console.log(error)
          // self.errors.add({
          //   field: 'password',
          //   msg: 'unknown error. Please try again later'
          // }); 
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
  },


};
</script>
<style  scoped lang="css">
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

<style   lang="css">
  
  
.input:hover, .taginput .taginput-container.is-focusable:hover, .input.is-hovered, .taginput .is-hovered.taginput-container.is-focusable, .textarea:hover, .textarea.is-hovered {
    border-color: #b5b5b5;
}
.input, .taginput .taginput-container.is-focusable, .textarea {
    -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    max-width: 100%;
    width: 100%;
}
.input, .taginput .taginput-container.is-focusable, .textarea {
    background-color: white;
    border-color: #dbdbdb;
    color: #363636;
    -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    max-width: 100%;
    width: 100%;
}
.button, .input, .taginput .taginput-container.is-focusable, .textarea, .select select, .file-cta, .file-name, .pagination-previous, .pagination-next, .pagination-link, .pagination-ellipsis {
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
}
body, button, input, select, textarea {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
button, input, select, textarea {
    margin: 0;
}
button, input, select, textarea {
    background-color: transparent;
    border-style: none;
    color: inherit;
}
button, input, optgroup, select, textarea {
    font: inherit;
}
input {
    border-radius: 0;
}
*, *::before, *::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
* {
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
}
*, ::before, ::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
/* user agent stylesheet */
input {
    padding: 1px 0px;
}
/* user agent stylesheet */
/* input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 1px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
} */
/* user agent stylesheet */
input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
}
/* user agent stylesheet */
input, textarea, select, button, meter, progress {
    -webkit-writing-mode: horizontal-tb !important;
}
input.is-danger {
    border-color:#ff3860;
}
.control {
    clear: both;
    font-size: 1rem;
    position: relative;
    text-align: left;
}
.theme--light .v-card, .application .theme--light.v-card {
    background-color: #fff;
    color: rgba(0,0,0,0.87);
}
.application--wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
}
.application.theme--light {
    background: #fafafa;
    color: rgba(0,0,0,0.87);
}
.application {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
}
.application--wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
}
.application.theme--light {
    background: #fafafa;
    color: rgba(0,0,0,0.87);
}
.application {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
}
body {
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
}
body, button, input, select, textarea {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
body {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
}
html {
    background-color: white;
    font-size: 16px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
}
html {
    font-size: 14px;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-text-size-adjust: 100%;
}
*, *::before, *::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
::before, ::after {
    text-decoration: inherit;
    vertical-align: inherit;
}
*, ::before, ::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
*, *::before, *::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
::before, ::after {
    text-decoration: inherit;
    vertical-align: inherit;
}
*, ::before, ::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
::selection {
    background-color: #b3d4fc;
    color: #000;
    text-shadow: none;
}

.help.is-danger {
    color: #ff3860;
    margin-left: 3rem;
}
.help {
    display: block;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}




</style>


