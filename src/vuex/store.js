import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_id: '',
    username: '游客',
    password: '',
    dept_code: '',
    dept_name: '',
    address: '',
    phone: '',
    principal: '',
    email: '',
    business_scope: '',
    manager_id: '',
    islogin: false
  },
  getters: {
    user_id: state => state.user_id,
    username: state => state.username,
    password: state => state.password,
    dept_code: state => state.deptCode,
    dept_name: state => state.dept_name,
    address: state => state.address,
    phone: state => state.phone,
    principal: state => state.principal,
    email: state => state.email,
    business_scope: state => state.business_scope
  },
  mutations: {
    login (state, msg) {
      state.username = msg.username
      state.password = msg.password
    }
  }
})

export default store
