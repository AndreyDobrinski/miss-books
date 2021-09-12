<template>
  <div>
    <app-header v-if="!isInHome"/>
    <router-view />
  </div>
</template>


<script>
import AppHeader from '@/cmps/AppHeader'

export default {
  computed:{
    isInHome(){
      return this.$route.path === '/'
    }

  },
  components:{
    AppHeader
  }
  
}
</script>