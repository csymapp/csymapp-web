<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h3 class="pr-3"><a @click="goto('/'+title)">{{ title }}</a></h3>
    </div>
    <v-breadcrumbs divider="|">
      <v-breadcrumbs-item>
      <v-icon larg>home</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-for="(item,key) in breadcrumbs" :key="key" style="cursor:pointer" >
      <a @click="goto(item.href)">{{ item.txt }}</a>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary" @click="$router.push('/csystem/redirect')">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>  
</template>

<script>
import menu from '@/api/menu';
export default {
  data () {
    return {
      title: ''
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    }
  },
  computed: {
    breadcrumbs: function () {
      let breadcrumbs = [];
      menu.forEach(item => {

        // if (item.items) {
        //   let child =  item.items.find(i => {
        //     return i.component === this.$route.name;
        //   });
        //   if (child) {
        //     breadcrumbs.push(child.title);
        //     breadcrumbs.push(this.$route.path.split('/').slice(-1)[0]);
        //     this.title = child.title;
        //   }
        // } else {
        //   if (item.name === this.$route.name) {
        //     this.title = item.title;
        //     breadcrumbs.push(item.title);
        //   }
        // }


      });
      let tmp = this.$route.path.split('/')
      console.log()
        for(let i in tmp)
          if(tmp[i] !== '')
           breadcrumbs.push({txt:tmp[i]})
        
        this.title = breadcrumbs[0].txt;

        let path = '/'
        for(let i in breadcrumbs) {
          path += breadcrumbs[i].txt + '/'
          breadcrumbs[i].href = path
        }
      
        breadcrumbs.reverse().pop()
        breadcrumbs.reverse()
      
      return breadcrumbs;
    },    
  }
};
</script>
