<template>
  <div id="app">
    <nav v-if="isLogin" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="home">DJ-TODO</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="btn btn-dark" to="home">Home</router-link>
          </li>
          <li class="navbar-nav active">
            <router-link class="btn btn-dark" to="todo">Todo</router-link>
          </li>
          <li class="navbar-nav active">
            <router-link v-if="notFbLogin" class="btn btn-dark logoutBtn" to="profile">Profile</router-link>
          </li>
        </ul>
        <button class="btn btn-dark" @click="logout">Logout</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import swal from 'sweetalert'
import {
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState(['isLogin', 'notFbLogin'])
  },
  methods: {
    logout () {
      swal({
        title: 'Alert',
        text: 'Do you really want to log out?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((logout) => {
          if (logout) {
            swal('You have successfully logged out!', {
              icon: 'success'
            })
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.removeItem('fb')
            this.$store.commit('userLoggedOut')
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style>
  body {
    background-color: #f5f5f5;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .navbar-brand {
    font-family: 'Bungee Inline', cursive;
  }

  a.btn.btn-dark {
    font-weight: bold;
  }

  button.btn.btn-dark {
    font-weight: bold;
  }

  .btn-dark:hover {
    background-color: white;
    color: black;
  }

  .btn-dark:active {
    background-color: white;
    color: black;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
</style>
