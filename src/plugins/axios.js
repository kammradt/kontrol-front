import Vue from 'vue'
import axios from 'axios'

Vue.use(axios)


export default axios.create({
  baseURL: 'http://localhost:8080/',
})


