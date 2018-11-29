<template>
  <v-card :color="color">
    <v-card-text>
        <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12>
            <v-progress-linear indeterminate value="15" color="white"></v-progress-linear>
            </v-flex>
            <v-flex xs12>
              We are still working on this component. Please check back later.
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
};
</script>
