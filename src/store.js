import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex);

const baseURL = 'https://boxing-celsius-81252.herokuapp.com'

export default new Vuex.Store({
  state: {
    isLogin: false,
    notFbLogin: true,
    tasks: [],
    weather: {},
    result: {},
  },
  mutations: {
    userLoginFB (state) {
      state.isLogin = true
      state.notFbLogin = false
    },
    userLoggedIn (state) {
      state.isLogin = true
    },
    userLoggedOut (state) {
      state.isLogin = false
      state.notFbLogin = true
    },
    setTodo (state, todoList) {
      state.tasks = todoList.data.list
    },
    setWeather (state, weatherData) {
      state.weather = weatherData.data.data[0]
    },
    setResult (state, resultData) {
      state.result = resultData.data
    },
  },
  actions: {
    loginUser ({
      commit
    }, userData) {
      axios.post(`${baseURL}/index/login`, {
          username: userData.username,
          email: userData.email,
          password: userData.password
        })
        .then(function (response) {
          if (response.data.message != 'Success login') {
            swal(response.data.message, {
              icon: 'warning'
            })
          } else {
            swal(response.data.message, {
              icon: 'success'
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('fb', 0)
            commit('userLoggedIn')
            router.push('/home')
          }
        })
        .catch(function (error) {
          swal(error.response.data.message, {
            icon: 'warning'
          })
        })
    },
    registerNewUser ({
      dispatch
    }, userData) {
      axios.post(`${baseURL}/index/register`, {
          username: userData.username,
          email: userData.email,
          password: userData.password
        })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          })
          dispatch('loginAfterRegister', userData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    loginAfterRegister ({
      commit
    }, userData) {
      axios.post(`${baseURL}/index/login`, {
          username: userData.username,
          password: userData.password
        })
        .then(function (response) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('email', response.data.email)
          commit('userLoggedIn')
          router.push('/home')
        })
        .catch(function (error) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    loginFB ({
      commit
    }, profile) {
      let username = profile.username
      let email = profile.email
      let fbId = profile.id
      axios.post(`${baseURL}/index/loginfb`, {
          username: username,
          email: email,
          fbId: fbId
        })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          })
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('fb', 1)
          commit('userLoginFB')
          router.push('/home')
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getAllTasks ({
      commit
    }, token) {
      axios.get(`${baseURL}/todo/show`, {
          headers: {
            token: token
          }
        })
        .then(function (todoList) {
          commit('setTodo', todoList)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getCurrentWeather ({
      commit
    }) {
      axios.get(`${baseURL}/weather/show-weather`)
        .then(function (weatherData) {
          commit('setWeather', weatherData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: 'Something went wrong! Please contact the developer',
            icon: 'Warning'
          })
        })
    },
    getSearchWeather ({
      commit
    }, inputData) {
      axios.post(`${baseURL}/weather/search`, inputData)
        .then(function (resultData) {
          commit('setResult', resultData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: 'Something went wrong! Please contact the developer',
            icon: 'Warning'
          })
        })
    },
    addNewtask ({
      dispatch
    }, taskDetail) {
      axios.post(`${baseURL}/todo/add`, {
          todo: taskDetail.task
        }, {
          headers: {
            token: taskDetail.token
          }
        })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', taskDetail.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {
            icon: 'warning'
          })
        })
    },
    finishTask ({
      dispatch
    }, taskDetail) {
      axios.put(`${baseURL}/todo/finish/${taskDetail.taskId}`, {}, {
          headers: {
            token: taskDetail.token
          }
        })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', taskDetail.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {
            icon: 'warning'
          })
        })
    },
    deleteTask ({
      dispatch
    }, taskDetail) {
      axios.delete(`${baseURL}/todo/delete/${taskDetail.taskId}`, {
          headers: {
            token: taskDetail.token
          }
        })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', taskDetail.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {
            icon: 'warning'
          })
        })
    },
    updateTask({
      dispatch
    }, taskDetail) {
      axios.put(`${baseURL}/todo/update/${taskDetail.taskId}`, {
          todo: taskDetail.task
        }, {
          headers: {
            token: taskDetail.token
          }
        })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', taskDetail.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {
            icon: 'warning'
          })
        })
    },
    getTaskByStatus({
      commit
    }, taskDetail) {
      axios.get(`${baseURL}/todo/show/${taskDetail.status}`, {
          headers: {
            token: taskDetail.token
          }
        })
        .then(function (taskData) {
          commit('setTodo', taskData)
        })
        .catch(function (err) {
          swal(err.response.data.message, {
            icon: 'warning'
          })
        })
    },
    updateProfile ({
      commit
    }, userData) {
      //Change username and email only
      if (userData.newPass == '' && userData.confirm == '') {
        axios.put(`${baseURL}/user/update-user`, {
            username: userData.username,
            email: userData.email,
            new_password: userData.newPass,
            old_password: userData.oldPass
          }, {
            headers: {
              token: userData.token
            }
          })
          .then(function (response) {
            let message = response.data.message
            if (message !== 'Successfully updated your profile') {
              swal(message, {
                icon: 'warning'
              })
            } else {
              swal(message, {
                icon: 'success'
              })
              localStorage.removeItem('username')
              localStorage.setItem('username', userData.username)
              localStorage.setItem('email', userData.email)
              router.push('/home')
            }
          })
          .catch(function (err) {
            swal(err.response.data.message, {
              icon: 'warning'
            })
          })
      }
      //Change username, email + password 
      else {
        if (new_password != confirm) {
          swal('Password and confirm password is not the same!', {
            icon: 'warning'
          })
        } else {
          axios.put(`${baseURL}/user/update-user`, {
            username: username,
            email: email,
            new_password: new_password,
            old_password: old_password
          }, {
            headers: {
              token: userData.token
            }
          })
            .then(function (response) {
              let message = response.data.message
              if (message !== 'Successfully updated your profile') {
                swal(message, {
                  icon: 'warning'
                })
              } else {
                swal(message, {
                  icon: 'success'
                })
                localStorage.removeItem('username')
                localStorage.setItem('username', userData.username)
                localStorage.setItem('email', userData.email)
                router.push('/home')
              }
            })
            .catch(function (err) {
              swal(err.response.data.message, {
                icon: 'warning'
              })
            })
        }
      }
    }
  }
})
