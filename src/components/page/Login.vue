<template>
  <div id="login">
    <div id="login_img"><img src=""/></div>
    <div id="login_main">
      <div id="login_main_top">
        <h1>登陆</h1>
      </div><!-- main头部结尾-->
      <div id="login_main_center">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="60px" class="demo-ruleForm">
          <el-form-item prop="userName">
            <el-input placeholder="用户名" type="text" v-model="loginForm.userName" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model="loginForm.password" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" @click="doLogin" :loading="loading" round>登录</el-button>
              <el-button type="success" @click="adminLogin">管理员登录</el-button>
              <el-button type="text" @click="register">注册</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
      </div><!-- main中部结尾-->
    </div><!-- main结尾-->
  </div><!-- login结尾-->
</template>
<script>
  import ElForm from 'element-ui/packages/form/src/form'
  import ElInput from 'element-ui/packages/input/src/input'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import ElButton from 'element-ui/packages/button/src/button'
  import ElButtonGroup from 'element-ui/packages/button/src/button-group'

  export default {
    components: {
      ElButtonGroup,
      ElButton,
      ElFormItem,
      ElInput,
      ElForm
    },
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
        self.$router.push('/home')
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

<style>
  /*登录form*/
  #login {
    width: 100%;
    margin: 0 auto;
    /*position:relative;*/
    /*background-color:black;*/
  }

  /*登录背景*/
  #login_img {
    height: 720px;
    position: absolute
  }

  /*输入框*/
  #login_main {
    width: 400px;
    margin: 250px 50px 200px 450px;
    border: 1px solid #C0CCDA;
    opacity: 0.8;
    border-radius: 10px;
    box-shadow: inset 0 0 1px 1px #C0CCDA;
    position: absolute;
    background-color: #F9FAFC;
  }

  #login_main_top {
    height: 60px;
    /*background-color:green;*/
    text-align: center;
  }

  #login_main_center {
    margin: 0 30% 0 0;
    /*background-color:green;*/
  }
</style>
