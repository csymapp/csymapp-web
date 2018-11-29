<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <draggable  element="v-layout" :options="options" class="row wrap" row wrap>
       <v-flex lg12 sm12 xs12>
            <email-profile></email-profile>
          </v-flex>
      </draggable>
    </v-container>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import EmailProfile from '@/components/widgets/list/EmailProfiles';

export default {
  name: 'csystemEmailProfiles',
  components: {
    draggable,
    EmailProfile,
  },
  data: () => ({
    user: {},
     options: {
      // dropzoneSelector: 'ul',
      // draggableSelector: 'li',
      // excludeOlderBrowsers: true,Ma
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
    }),
  methods: {
  	
  },

  async mounted () {
    let self = this
    self.user = self.$store.state.user.userdata
    console.log(self.user)
    
    
  },
  computed: {
    
  },

};
</script>