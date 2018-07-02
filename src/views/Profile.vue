<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <h3 class="text-center">Profile</h3>
      <hr>
      <div class="formProfile">
        <div class="formBody">
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" class="form-control" type="text">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input id="email" class="form-control" type="text" placeholder="jonhdoe@mail.com" v-model="email">
          </div>
          <div class="form-group">
            <label>Old Password:</label>
            <input v-model="oldPassword" class="form-control" id="newPass" type="password" placeholder="Min 6 alphanumeric characters">
          </div>
          <div class="form-group">
            <label>New Password:</label>
            <input v-model="newPassword" class="form-control" id="oldPass" type="password" placeholder="Min  6 alphanumeric characters">
          </div>
          <div>
            <label>Confirm Password</label>
            <input v-model="confirm" class="form-control" type="password" placeholder="Confirm Password">
          </div>
          <br>
          <div class="form-group">
            <button v-on:click="updateUser" type="submit" class="btn btn-default">
              <b>Update</b>
            </button>
          </div>
          <div class="form-group">
            <button v-on:click="back" type="submit" class="btn btn-default">
              <b>Cancel</b>
            </button>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      oldPassword: '',
      newPassword: '',
      confirm: ''
    }
  },
  created () {
    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
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
    back () {
      this.$router.push('/home')
    },
    updateUser () {
      let userData = {
        username: this.username,
        oldPass: this.oldPassword,
        newPass: this.newPassword,
        confirm: this.confirm,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('updateProfile', userData)
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 70px auto;
  }

  .text-center {
    font-family: 'Bungee Inline', cursive;
    font-size: 40px;
    margin-top: 0;
  }

  label {
    text-align: left;
    display: block;
    margin-bottom: .5rem;
  }

  .col-md-2 {
    font-size: 16px;
    margin: 0 auto;
  }

  .col-md-6 {
    position: center;
    margin: 0 auto;
    background-color: #f0ffff;
    padding: 60px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .btn-default {
    width: 100%;
    background-color: #4267b2;
    color: white;
  }

  .btn-default:hover {
    background-color: #00008b;
  }

  .btn-default:active {
    background-color: #e0eeee;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .btn-primary {
    background-color: #4267b2;
  }

  .btn-primary:hover {
    background-color: #00008b;
  }

  .btn-primary:active {
    background-color: #e0eeee;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .form-group {
    text-align: center;
  }

  @media (min-width: 1200px) {
    .container {
      width: 970px;
    }
  }

  .swal-text {
    text-align: center;
  }
</style>
