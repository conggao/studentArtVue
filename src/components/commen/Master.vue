<template>
  <div class="wrapper">
    <Login></Login>
  </div>
</template>
<script>
  import Login from '@/components/page/Login'

  export default {
    components: {
      Login
    }
  }
</script>
<style scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
