<template>
  <div id="search">
    <el-form></el-form>
  </div><!-- movie结尾-->
</template>
<script>

  export default {
    data () {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        }
        callback()
      }
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        // 表单验证规则
        rules2: {
          username: [
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
      errormsg (msgerror) {
        this.$message.error(msgerror)
      },
      // 把获取参数加入全局store中
      change (id, username, password, deptCode, deptName, address, phone, principal, email, businessScope, islogin) {
        this.$store.state.user_id = id
        this.$store.state.username = username
        this.$store.state.password = password
        this.$store.state.dept_code = deptCode
        this.$store.state.deptName = deptName
        this.$store.state.address = address
        this.$store.state.phone = phone
        this.$store.state.principal = principal
        this.$store.state.email = email
        this.$store.state.businessScope = businessScope
        this.$store.state.islogin = islogin
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
        var _this = this
        this.$http.get('/api/user/login'
          , {
            params: {
              username: _this.loginForm.username,
              password: _this.loginForm.password
            }
          }
        )
          .then(function (response) {
            let code = response.data.code
            if (code === '200') {
              //  console.debug(response.data.data)
              // 进去主界面的过渡效果方法
              _this.load()
              // 把获取到的参数存入store
              _this.change(response.data.data.id, _this.loginForm.username, _this.loginForm.password, response.data.data.deptCode,
                response.data.data.deptName, response.data.data.address, response.data.data.phone, response.data.data.principal
                , response.data.data.email, response.data.data.businessScope, true)
              setTimeout(() => {
                _this.$router.push({path: '/Main'})
              }, 1500)
            } else if (code === '500') {
              // 如果返回500，就在页面上方弹出错误信息
              _this.errormsg(response.data.errormsg)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      adminLogin () {
        this.$router.push({path: '/LoginAdmin'})
      },
      register () {
        this.$router.push({path: '/Register'})
      }
    }
  }
</script>

<style>
  /*展示视频*/


</style>
