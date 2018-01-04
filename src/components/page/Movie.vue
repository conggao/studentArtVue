<template>
  <el-main>
    <div id="searchMovie">
      <el-form>
      </el-form>
    </div>
    <el-row>
      <el-col v-for="(movie,index) in movieList" :span="4" :offset="1">
        <router-link :to="{path:'/home/movieInfo',query:{movieId:movie.movieId}}">
          <el-card>
            <el-carousel height="60px">
              <el-carousel-item v-for="(cover,item) in movie.coverList" :key="item">
                <img :src="'http://localhost:8081/load/file/'+cover.coverFileId">
              </el-carousel-item>
            </el-carousel>
            <h2>{{movie.title}}</h2>
            <h3>{{movie.introduction}}</h3>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
    <el-pagination
      :currentPage=currentPage
      background
      layout="prev, pager, next"
      :total=pageTotal>
    </el-pagination>
  </el-main>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        currentPage: {
          type: Number
        },
        pageTotal: {
          type: Number
        },
        pageSize: {
          type: Number
        },
        movieList: []
      }
    },
    mounted () {
      let _this = this
      _this.currentPage = 1
      _this.pageSize = 10

      axios.get('http://localhost:8081/load/movie'
        , {
          params: {
            pageNum: _this.currentPage,
            pageSize: _this.pageSize
          }
        }
      )
        .then(function (response) {
          let code = response.data.code
          if (code === 200) {
            _this.movieList = [...response.data.movieList]
          } else if (code === 500) {
            // 如果返回500，就在页面上方弹出错误信息
            alert('code 500')
          }
        })
        .catch(function (error) {
          _this.$message.log(error)
        })
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
