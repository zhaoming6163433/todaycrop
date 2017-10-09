<template>
  <div class="home">
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
    <navbar></navbar>
    <collecturl></collecturl>
    <createseek></createseek>
  </div>
</template>

<script>
import navbar from 'components/navbar'
import collecturl from 'components/collecturl'
import createseek from 'components/createseek'

export default {
  name: 'home',
  props : [],
  data () {
    return {
    }
  },
  components: {
    navbar,
    collecturl,
    createseek
  },
  created(){

  },
  methods : {

  },
  mounted(){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .home{
        height:100%;
    }
</style>
