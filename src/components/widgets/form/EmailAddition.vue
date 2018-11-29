<template>
  <v-card :color=color>
    <v-card-title :color=color>
        <span class="headline">Email Profile</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text xs12>
        <v-form xs12>
                    <b-field 
                        :type="{'is-danger': errors.has('registeremail')}"
                        :message="errors.first('registeremail')" xs12>
                        
                        <b-input v-model="user.registeremail" name="registeremail" v-validate="'required|email'"  placeholder="Email" xs12 lg12/>
                    </b-field>
                    <b-field 
                        :type="{'is-danger': errors.has('registerpassword')}"
                        :message="errors.first('registerpassword')">
                        
                        <b-input v-model="user.registerpassword" name="registerpassword" v-validate="'required|min:6'"  placeholder="Password" type="password"/>
                    </b-field>
                    
                    <b-field 
                        :type="{'is-danger': errors.has('Confirmpassword')}"
                        :message="errors.first('Confirmpassword')">
                        
                        <b-input v-model="user.confirmpassword" name="Confirmpassword" v-validate="'required|min:6'"  placeholder="Confirm Password" type="password"/>
                    </b-field>
                  </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white" flat @click="$emit('close')">Close</v-btn>
        <v-btn color="white" flat @click="validateRegister()">Add Account</v-btn>
    </v-card-actions>
    </v-card>  
</template>

<script>
// import config from '@/services/config'
import authService from '@/apps/csystem/services/auth'
import to from 'await-to-js';
export default {
  props: {
    color: String,
  },
   components: {
    // VWidget
  },
  data () {
    return {
      basic: {
        dialog: false
      },
      user: {
      registeremail: '',
      registerpassword: '',
      confirmpassword: ''
    },
    };
  },
  methods: {
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
         window.getApp.$emit('APP_EMAIL_ADD_SUCCESS');
         ;[err, care] = await to(authService().loginusingToken(self.$store.state.token))
         let user = care.data
        let token = care.data.token
         self.$store.state.token = token;
        self.$store.state.user.userdata = user;
         this.$router.push('/csystem/redirect')
        //  self.$emit('close')
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
  }
};
</script>

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
}
.help {
    display: block;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}




</style>