<template>
  <el-main>
    <h1>{{movieName}}</h1>
    <h1>{{movieTitle}}</h1>
    <video width="720" height="360" controls preload="auto">
      <source v-if="urlList.length!==0" v-for="url in urlList" :src="'http://127.0.0.1:8081/load/file/'+url"
              :type="movieType"/>
    </video>
  </el-main>
</template>
<script>
  import axios from 'axios'

  export default {

    data () {
      return {
        movieId: {
          type: Number
        },
        movieName: '',
        movieType: 'video/mp4',
        movieFileId: '',
        movieTitle: '',
        urlList: []
      }
    },
    beforeMount () {
      let _this = this
      _this.movieId = _this.$route.query.movieId
      axios.get('http://localhost:8081/load/movieInfo'
        , {
          params: {
            movieId: _this.movieId
          }
        }
      )
        .then(function (response) {
          let code = response.data.code
          if (code === 200) {
            _this.movieFileId = response.data.movieFileId
            _this.urlList[0] = response.data.movieFileId
            _this.movieName = response.data.movieName
            _this.movieTitle = response.data.title
            console.log('movieFileId' + _this.movieFileId)
          } else if (code === 500) {
            // 如果返回500，就在页面上方弹出错误信息
            alert('code 500')
          }
        })
        .catch(function (error) {
          _this.$message.log(error)
        })
    },
    created () {
      console.log('组件创建完毕')
    },
    methods: {
      // 错误封装方法
      errormsg (msgerror) {
        this.$message.error(msgerror)
      }
    }
  }
</script>

<style>
</style>
