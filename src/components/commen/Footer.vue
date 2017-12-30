<template>
  <el-footer height="70px" :style="{backgroundColor:'#2a88bd'}">
    <div>gk</div>
  </el-footer>
</template>
<script>
  import ElFooter from 'element-ui/packages/footer/src/main'

  export default {
    components: {
      ElFooter
    },
    data () {
      return {
        name: 'guest'
      }
    },
    computed: {
      getUserName () {
        let userName = localStorage.getItem('ms_userName')
        return userName === '' ? this.name : userName
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'logout') {
          localStorage.removeItem('ms_userName')
          this.$router.push('/login')
        }
      }
    }
  }
</script>
<style scoped>
</style>
