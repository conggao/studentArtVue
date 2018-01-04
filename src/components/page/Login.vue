<template>
  <div class="login-wrap">
    <div class="ms-login">
      <h1>登陆</h1>
      <div :style="{margin:'20px'}"></div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="60px" label-position="left"
               class="demo-ruleForm">
        <el-form-item prop="userName" label="用户名">
          <el-input placeholder="用户名" type="text" v-model="loginForm.userName" auto-complete="on"
                    icon="https://png.icons8.com/nolan/50/000000/administrator-male.png"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input placeholder="密码" prefix-icon="https://png.icons8.com/nolan/50/000000/administrator-male.png"
                    type="password" v-model="loginForm.password" auto-complete="on"></el-input>
        </el-form-item>
      </el-form>
      <el-button-group>
        <el-button type="primary" @click="doLogin" :loading="loading" round>登录</el-button>
        <el-button type="success" @click="adminLogin">管理员登录</el-button>
        <el-button type="primary" @click="register" round>注册</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      const validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        }
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        // 表单验证规则
        rules: {
          userName: [
            {validator: validateUsername, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    methods: {
      // 错误封装方法
      errorMsg (msgerror) {
        this.$message.error(msgerror)
      },
      // 把获取参数加入全局store中
      change (userName, password) {
        this.$store.state.userName = userName
        this.$store.state.password = password
      },
      // 登录加载过渡效果的方法
      load () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
        this.$Loading.start()
        setTimeout(() => {
          this.$Loading.finish()
        }, 1000)
      },
      doLogin () {
        let _this = this
        this.$http.get('/api/user/login'
          , {
            params: {
              userName: _this.loginForm.userName,
              password: _this.loginForm.password
            }
          }
        )
          .then(function (response) {
            const code = response.data.code
            if (code === '200') {
              //  console.debug(response.data.data)
              // 进去主界面的过渡效果方法
              _this.load()
              // 把获取到的参数存入store
              _this.change(response.data.data.id, _this.loginForm.userName, _this.loginForm.password, response.data.data.deptCode,
                response.data.data.deptName, response.data.data.address, response.data.data.phone, response.data.data.principal
                , response.data.data.email, response.data.data.businessScope, true)
              setTimeout(() => {
                _this.$router.push('/home')
              }, 1500)
            } else if (code === '500') {
              // 如果返回500，就在页面上方弹出错误信息
              _this.$router.push('/home')
              _this.errorMsg(response.data.errormsg)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        _this.$router.push('/home')
      },
      adminLogin () {
        this.$router.push('/adminHome')
      },
      register () {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

</style>
