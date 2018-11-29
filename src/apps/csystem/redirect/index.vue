<template>


</template>

<script>

export default {
  name: 'csystemRedirect',


  async mounted () {
    let self = this
    self.$router.go(-1)
    
  }

};
</script>