<template>
  <div>
  <v-card>
    <v-dialog v-model="basic.dialog1" persistent max-width="500px" style="display:none;">
      <ChangePwd @close="basic.dialog1 = false" color="primary" :thisphone="thisphone"></ChangePwd>
    </v-dialog>
    
    <v-dialog v-model="basic.dialog2" persistent max-width="500px" style="display:none;">
      <ActivatewithCode @close="basic.dialog2 = false" color="primary" :thisphone="thisphone"></ActivatewithCode>
    </v-dialog>

    <v-card-title>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4><v-icon left color="primary">fa-phone</v-icon>  Phone Profiles</h4></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
              <div slot="activator" class="layout column ma-0 justify-center align-center">
                <v-dialog v-model="basic.dialog" persistent max-width="500px">
                  <div class="layout column ma-0 justify-center align-center" slot="activator">
                    <v-btn icon class="primary">
                        <v-icon>fa-plus</v-icon>
                    </v-btn>
                  </div>
                  <EmaAddition @close="basic.dialog = false" color="primary"></EmaAddition>
                </v-dialog>
              </div>
              <span>Add a telephone profile</span>
            </v-tooltip>
    </v-toolbar>
    </v-card-title>

    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="profiles"
          class="elevation-0"
          :search="search"
          :pagination.sync="pagination"
        >
          <template slot="items" slot-scope="props">
            <!-- <td>
              <v-avatar size="36px">
                <img :src="props.item.avatar || defaultprofilepic" />
              </v-avatar>
            </td> -->
            <td>{{ props.item.Telephone }}</td>
            <!-- <td class="text-xs-left" ><v-btn flat :class=whichColour(props.item.IsActive)> 
              {{ whichStatus(props.item.IsActive)}}
              </v-btn>
              </td> -->
            <!-- <td class="text-xs-left"><v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td> -->
            <td class="text-xs-right">
              <v-btn flat :class=whichColour(props.item.IsActive) @click="deactivateTelephone(props.item, props.item.IsActive); thisphone=props.item.puid">
                {{ whichText(props.item.IsActive)}}
              </v-btn>
             

               <v-btn flat icon color="primary" @click="basic.dialog1=true; thisphone=props.item.puid">
                <v-icon >edit</v-icon>
              </v-btn>

              <v-btn flat icon color="red"  @click="dropTelephone(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
        </v-data-table>
        
       
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
   <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" circle>..</v-pagination>
        </div>
  </div>
</template>

<script>
import { Projects } from '@/api/project';
import EmaAddition from '@/components/widgets/form/TelephoneAddition';
import ChangePwd from '@/components/widgets/form/TelephoneChangePin';
import ActivatewithCode from '@/components/widgets/form/ActivatewithCode';
import authService from '@/apps/csystem/services/auth'
import to from 'await-to-js';

export default {
    components: {
    EmaAddition,
    ActivatewithCode,
    ChangePwd
  },
  data () {
    return {
      search: '',
      pagination: {
        totalItems: 15,
        rowsPerPage: 5
      },
      // selected: [],
      headers: [
        // {
        //   text: 'Profile picture',
        //   align: 'center',
        //   sortable: false,
        //   value: 'avatar'
        // },
        {
          text: 'Phone Number',
          align: 'left',
          value: 'Telephone'
        },
        // { text: 'Status', value: 'status' },
        { text: 'Action', value: 'status', align: 'right' },

      ],
      basic: {
        dialog: false,
        dialog1: false,
        dialog2: false
      },
      thisphone:null,
      profiles: {},
      defaultprofilepic:''
    };
  },
  methods : {
      whichColour(active) {
          if(active===true)
            return 'warning'
        return 'success'
      },
      whichText(active) {
          if(active===true)
            return 'Deactivate'
        return 'Activate'
      },
      whichStatus(active) {
          if(active===true)
            return 'Active'
        return 'Inactive'
      },

      async deactivateTelephone(email, status) {
        let editedIndex = this.profiles.indexOf(email),
          editedItem = Object.assign({}, email),
          self = this,
          [err, care] = []
          let phone = editedItem.Telephone
          let puid = editedItem.puid
          if(status === true) {
            [err, care] = await to(authService().deactivateTelephone(self.$store.state, puid))
            ;[err, care] = await to(authService().loginusingToken(self.$store.state.token))
            let user = care.data
            let token = care.data.token
            self.$store.state.token = token;
            self.$store.state.user.userdata = user;
            window.getApp.$emit('APP_SOME_SUCCESS', 'Profile has been deactivated');
            self.$emit('close')

          }
          else {
            ;[err, care] = await to(authService().getTelephoneCode(phone))
            if(err)
              window.getApp.$emit('ERROR_EVT','unknown error. Please try again later');
            else {
              self.basic.dialog2 = true;

            }
          }
      },

      async dropTelephone(email) {
        let res = await this.$confirm('Do you really want to delete?', {title: 'Delete?'})
        if (res) {
         let editedIndex = this.profiles.indexOf(email),
          editedItem = Object.assign({}, email),
          self = this,
          [err, care] = []
          email = editedItem.Telephone
          let puid = editedItem.puid
          ;[err, care] = await to(authService().deleteTelephone(self.$store.state, puid))
          
          if(err)
            try{
              window.getApp.$emit('ERROR_EVT', err.data.error);
              
            }catch(error) {
              window.getApp.$emit('ERROR_EVT','unknown error. Please try again later');
            }
          else{
            console.log(care)
            let user = care.data
            self.$store.state.user.userdata = user
            window.getApp.$emit('PROFILE_REMOVED', 'Telephone');
          }
        }else window.getApp.$emit('APP_NO_CHANGES');
        
      },
      async changePwd(email) {
        
      }
  },
  mounted() {
    let self = this;
    //   ;[err, care] = await to(authService().loginusingToken(self.$store.state.token))
    let user = self.$store.state.user.userdata
    let defaultprofilepic = self.$store.state.user.defaultprofilepic
    let emailProfiles = user.Telephones;
    self.profiles = emailProfiles
    for(let i in self.profiles) {
      self.profiles[i].status = self.profiles[i].IsActive === true? "enabled": "disabled"
    }
    self.defaultprofilepic = defaultprofilepic
  },
  computed: {
    projects () {
      return Projects;
    },

    pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) 
          return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
  }
  
};
</script>
