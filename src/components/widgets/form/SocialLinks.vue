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
        </v-layout>
    </v-container>
</template>

<script>
export default {
  
};
</script>