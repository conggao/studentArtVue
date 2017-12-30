<template>
  <div id='publishMedia'>
    <el-form>
      <el-form-item>
        <el-input placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="简介" type="textarea"></el-input>
      </el-form-item>
      <el-upload-drag>
      </el-upload-drag>
      <el-form-item>
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import ElForm from 'element-ui/packages/form/src/form'
  import ElInput from 'element-ui/packages/input/src/input'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import ElUploadDrag from 'element-ui/packages/upload/src/upload-dragger'

  export default {
    components: {
      ElUploadDrag,
      ElFormItem,
      ElInput,
      ElForm
    },
    data () {
      const validateTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'))
        }
        callback()
      }
      const validateIntroduction = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入简介'))
        }
        callback()
      }
      return {
        // 标题，简介
        movie: {
          title: '',
          introduction: '',
          coverId: '',
          movieId: ''
        },
        // 表单验证规则
        rules: {
          title: [
            {validator: validateTitle, trigger: 'blur'}
          ],
          introduction: [
            {validator: validateIntroduction, trigger: 'blur'}
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
      publish () {
        let _this = this
        this.$http.get('/api/user/login'
          , {
            params: {
              title: _this.movie.title,
              introduction: _this.movie.introduction,
              coverId: _this.movie.coverId,
              movieId: _this.movie.movieId
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

</style>
