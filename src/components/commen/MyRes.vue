<template>
  <el-row >
  </el-row>
</template>
<script>
  export default {
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
