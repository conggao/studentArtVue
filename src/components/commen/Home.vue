<template>
  <el-container>
    <el-header>
      <gk-header></gk-header>
    </el-header>
    <el-container direction="horizontal">
      <el-aside>
        <gk-res></gk-res>
      </el-aside>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
    <el-footer>
      <gk-footer></gk-footer>
    </el-footer>
  </el-container>
</template>
<script>
  import GkHeader from './Header'
  import ElContainer from 'element-ui/packages/container/src/main'
  import GkFooter from './Footer'
  import GkRes from './MyRes'
  import ElHeader from 'element-ui/packages/header/src/main'
  import ElMain from 'element-ui/packages/main/src/main'
  import ElFooter from 'element-ui/packages/footer/src/main'
  import ElAside from 'element-ui/packages/aside/src/main'

  export default {
    components: {
      ElAside,
      ElFooter,
      ElMain,
      ElHeader,
      ElContainer,
      GkHeader,
      GkFooter,
      GkRes
    }
  }
</script>
<style scoped>
</style>

