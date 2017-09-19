<template>
  <div class="home">
  	<router-link  :to="{name:'article'}">进入文章</router-link>
  </div>
</template>

<script>
import vueutil from 'src/util/vueutil.js'
import api from 'src/model/api.js'

export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  methods : {
    
  },
  mounted(){
  		
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/common_color.scss';
</style>
