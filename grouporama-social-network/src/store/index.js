import Vue from 'vue'
import Vuex from 'vuex'
import Users from '../data/users.js'
import Posts from '../data/posts.js'
import Comments from '../data/comments.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Users,
    Posts,
    Comments
  },
  getters:{
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
