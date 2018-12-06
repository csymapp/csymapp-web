<template>
  <div>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout row wrap>
      <v-flex xs4>
          <v-tooltip bottom>
        <v-btn large flat slot="activator" outline to="/csystem/profile">
            <v-icon large >fa-user</v-icon> 
        </v-btn>
        <span>Profiles</span>
            </v-tooltip>
      </v-flex>
      
      <v-flex xs4>
          <v-tooltip bottom>
        <v-btn large flat slot="activator" outline to="/csystem/families">
            <v-icon large >fa-users</v-icon> 
        </v-btn>
        <span>Families</span>
            </v-tooltip>
      </v-flex>
      <v-flex xs4>
          <v-tooltip bottom>
        <v-btn large flat slot="activator" outline to="/csystem/apps">
            <v-icon large >fa-tasks</v-icon> 
        </v-btn>
        <span>Apps</span>
            </v-tooltip>
      </v-flex>
      
    </v-layout>
  </v-container>
  <v-container text-xs-center font-weight-medium title>
    Todo
  </v-container>
  <v-container grid-list-md text-xs-left fluid>
    
    <draggable  element="v-layout" :options="options" class="row wrap" row wrap>
       <v-flex xs4>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Profile</v-toolbar-title>
            </v-toolbar>
            <template>
              <ul>
                <li>Sending Generated codes via SMS</li>
                <li>Activating Phones for the first time</li>
                <li>Using Codes to activate emails </li>
                <li>Sending Emails activation codes </li>
                <li>Activating emails for the first time </li>
              </ul>
            </template>
        </v-card>
      </v-flex>
      
       <v-flex xs4>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Families</v-toolbar-title>
            </v-toolbar>
            <template>
              <ul>
                <li>____</li>
              </ul>
            </template>
        </v-card>
      </v-flex>
       <v-flex xs4>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Apps</v-toolbar-title>
            </v-toolbar>
            <template>
              <ul>
                <li>____</li>
              </ul>
            </template>
        </v-card>
      </v-flex>
       <v-flex xs4>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Apps to Build</v-toolbar-title>
            </v-toolbar>
            <template>
              <ul>
                <li>Vipimo</li>
                <li>Csensus</li>
                <li>Cskul</li>
                <li>Csynergy</li>
                <li>Ropebot</li>
              </ul>
            </template>
        </v-card>
      </v-flex>
       <v-flex xs4>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>DOCS</v-toolbar-title>
            </v-toolbar>
            <template>
              <ul>
                <li>csymapp-web</li>
                <li>csymapp-api</li>
                <li>csymapp-web</li>
                <li>etc</li>
              </ul>
            </template>
        </v-card>
      </v-flex>

    </draggable>
  </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import materialVueLayout from '@/layouts/materialVue';
export default {
  name: 'csystemHome',
  components: {
    materialVueLayout,
    draggable
  },
  data: () => ({
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
  })
};
</script>