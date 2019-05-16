<template>
    <div class="container">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <h3 class="text-center">DJ-Todo</h3>
            <hr>
            <div class="form-group">
                <input v-model="username" type="text" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
                <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
                <button @click="login" type="submit" class="btn btn-default">
                    <b>Log In</b>
                </button>
            </div>
            <div class="form-group">
                <div class="col-md-2">
                    <b>OR</b>
                </div>
            </div>
            <div class="form-group">
                <button type="button" scope="public_profile, email, gender" class="btn btn-primary form-control"
                    @click="openFbLoginDialog">
                    <img class="fb" src='https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/uPlIYLfynqH.png'
                        alt="app-facebook" width="25" height="25">
                    <span><b>Login with Facebook</b></span>
                </button>
            </div>
            <hr>
            <p class="text-foot">
                Have an login?
                <router-link to="register" class="btn btn-link">Register</router-link>
            </p>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>
    import swal from 'sweetalert'
    // const FB = window.FB;

    window.fbAsyncInit = function () {
        FB.init({
            appId: '377662989307557',
            cookie: true,
            xfbml: true,
            version: 'v3.3'
        })
        FB.AppEvents.logPageView()
    };

    (function (d, s, id) {
        let js
        let fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
            return
        }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                username: '',
            }
        },
        created() {
            let token = localStorage.getItem('token')
            if (token !== null) {
                this.$router.push('/home')
            }
        },
        methods: {
            checkLoginState: function (response) {
                let self = this
                if (response.status === 'connected') {
                    FB.api('me', {
                        fields: ['id', 'name', 'email']
                    }, function (profile) {
                        self.$store.dispatch('loginFB', profile)
                    })
                }
            },

            openFbLoginDialog() {
                FB.login(this.checkLoginState, {
                    scope: 'email'
                })
            },

            login() {
                let username = this.username
                let password = this.password
                if (username === '' || password === '') {
                    swal('Fields must not be empty!', {
                        icon: 'warning'
                    })
                }
                
                let userData = {
                    username: username,
                    password: password
                }
                this.$store.dispatch('loginUser', userData)
                this.username = ''
                this.password = ''
            },

            sendtoRegis() {
                window.location.href = 'register.html'
            },
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

    .swal-text {
        text-align: center;
    }
</style>
