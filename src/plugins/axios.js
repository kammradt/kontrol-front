import Vue from 'vue'
import axios from 'axios'

Vue.use(axios)


export default axios.create({
  baseURL: 'http://spring-course-env.us-east-1.elasticbeanstalk.com/',
})


