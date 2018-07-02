<template>
  <div class="home">
    <h1 class="title">
      Willkommen,
      <a>{{ username }}</a>
    </h1>
    <div class="taskList">
      <h5>You currently have
        <div class="taskListCount">
          <strong>{{ notDone }} task(s)</strong>
        </div>
        not done yet
        <i class="fas fa-times-circle"></i>
        <div class="taskListCount">
          <strong>{{ finished }} task(s)</strong>
        </div>
        finished
        <i class="fas fa-check-square"></i>
      </h5>
    </div>
    <br>
    <div class="weatherInfo">
      <h4>{{ weather.location.name }}</h4>
      <h2>
        <strong>{{ weather.current.temperature}}&#x2103;</strong>
      </h2>
      <img :src="weather.current.imageUrl">
      <h6>{{ weather.current.day}}, {{ weather.current.date}}</h6>
    </div>
    <br>
    <div class="search">
      <div class="form-group">
        <label>Check weather by location?</label>
        <input type="text" placeholder="ex: Tokyo, Sidney" class="form-control" v-model="search">
      </div>
      <button type="submit" class="btn btn-success" @click="checkWeather">Check</button>
      <br>
      <h6>{{ result.data }}</h6>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  mapState
} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      username: localStorage.getItem('username'),
      notDone: 0,
      finished: 0,
      search: ''
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'notFbLogin',
      'tasks',
      'weather',
      'result'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('getCurrentWeather')
  },
  created () {
    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
    this.getTaskStatuses()
    let fbToken = localStorage.getItem('fb')
    let token = localStorage.getItem('token')
    if (token !== null) {
      if (fbToken === '1') {
        this.$store.commit('userLoginFB')
      }
      this.$store.commit('userLoggedIn')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    checkWeather: function () {
      let self = this
      let inputData = {
        search: self.search
      }
      this.$store.dispatch('getSearchWeather', inputData)
      this.search = ''
    },
    getTaskStatuses () {
      if (this.tasks.length !== 0) {
        let self = this
        let tasksTemp = this.tasks
        tasksTemp.forEach(task => {
          if (task.status === 'Done') {
            self.finished++
          } else if (task.status === 'Not Done') {
            self.notDone++
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .title {
    margin: 3%;
  }

  a {
    font-weight: 400;
    font-family: 'Metal Mania', cursive;
  }

  .form-control {
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    margin-right: auto;
    margin-left: auto;
  }

  .search {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 2%;
    padding: 1%;
    background-color: #f0ffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
  }

  .taskList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 2%;
    padding: 1%;
    background-color: #f0ffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
  }

  .taskListCount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 2%;
    padding: 1%;
    background-color: #f0ffff;
    border: 1px solid black;
  }

  .weatherInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 2%;
    padding: 1%;
    background-color: #f0ffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
  }
</style>
