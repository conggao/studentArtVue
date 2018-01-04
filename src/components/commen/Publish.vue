<template>
  <el-container>
    <el-header>
      <gk-header></gk-header>
    </el-header>
    <el-container>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
      <el-aside>
        <gk-res></gk-res>
      </el-aside>
    </el-container>
    <el-footer style="background-color: red">
      <gk-footer></gk-footer>
    </el-footer>
  </el-container>
</template>
<script>
  import GkHeader from './Header'
  import GkFooter from './Footer'
  import GkRes from './MyRes'

  export default {
    components: {
      GkHeader,
      GkFooter,
      GkRes
    }
  }
</script>
<style scoped>
</style>

