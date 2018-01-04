<template>
  <el-main>
    <div class="search">
      <el-form rules="rules">
      </el-form>
    </div>
    <div id="media-wrapper">
      <div class="media" v-for="n in 10">
        <img src="@/../static/img/img.jpg">
      </div>
      <el-pagination
        :currentPage=currentPage
        background
        layout="prev, pager, next"
        :total=pageSize>
      </el-pagination>
    </div>
  </el-main>
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
        currentPage: 1,
        pageSize: 100,
        // 表单验证规则
        rules: {
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
        const _this = this
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
      }
    }
  }
</script>

<style>
  img {
    width: 100px;
    height: 100px;
  }

  #media-wrapper {
    display: flex;
    flex-flow: row wrap;
  }

  .media {
    margin: 10px 10px;
  }
  .el-pagination{
    width: 70%;
    margin-left: 15%;

  }
</style>
