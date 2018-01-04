<template>
  <div id='publishMedia'>
    <h1>发布视频</h1>
    <el-form :model="movie" ref="movie" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="movie.title" placeholder="输入标题"></el-input>
      </el-form-item>
      <el-form-item prop="introduction">
        <el-input v-model="movie.introduction" placeholder="输入简介" type="textarea" :rows=5></el-input>
      </el-form-item>
      <div class="upload-wrapper">
        <el-upload
          class="movie"
          drag
          accept="video/*"
          action="http://localhost:8081/publish/upload"
          :onSuccess="onMovieUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，上传影片</div>
        </el-upload>
        <el-upload
          class="cover"
          drag
          accept="image/*"
          action="http://localhost:8081/publish/upload"
          :onSuccess="onCoverUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，上传封面</div>
        </el-upload>
      </div>
      <el-button type="primary" @click="onSubmit">发布</el-button>
      <el-button type="danger" @click="onClear">撤销</el-button>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        // 标题，简介
        movie: {
          title: '',
          introduction: '',
          coverId: null,
          movieId: null
        },
        // 表单验证规则
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          introduction: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ],
          coverId: [
            {required: true, message: '请上传封面', trigger: 'blur'}
          ],
          movieId: [
            {required: true, message: '请上传视频', trigger: 'blue'}
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
      onMovieUpload (response, file) {
        let _this = this

        if (response.id !== '') {
          _this.movie.movieId = response.id
        }
      },
      onCoverUpload (response, file) {
        let _this = this
        if (response.id !== '') {
          _this.movie.coverId = response.id
        }
      },
      onSubmit (event) {
        let _this = this
        _this.$refs['movie'].validate((valid) => {
          if (!valid) {
            _this.errormsg('请完成填写')
            return false
          }
        })
        axios.get('http://localhost:8081/publish/movie'
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
            if (response.movieId !== '') {
              _this.$router.push('/home/movie')
            } else {
              // 如果返回500，就在页面上方弹出错误信息
              _this.errormsg(response.result)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      onClear () {
        let _this = this
        _this.model.title.set('')
        _this.model.introduction.set('')
      }
    }
  }
</script>

<style scoped>
  .upload-wrapper {
    display: flex;
    justify-content: center;
  }

  .movie {
    margin: 0px 20px;
  }

  .cover {
    margin: 0px 20px;
  }


</style>
