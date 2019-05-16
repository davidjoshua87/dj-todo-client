<template>
    <div class="container">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <h1 class="text-center title">
                Profile
            </h1>
            <hr>
            <div class="formProfile">
                <div class="formBody">
                    <div class="form-group">
                        <label>Username</label>
                        <input v-model="username" class="form-control" type="text">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input id="email" class="form-control" type="text" v-model="email">
                    </div>
                    <br>
                        <button v-on:click="checkPassword" class="btn btn-default" type="submit" data-toggle="collapse"
                            :data-target="dataTarget" aria-expanded="false"
                            aria-controls="multiCollapseExample1 multiCollapseExample2 multiCollapseExample3">
                            Update
                        </button>
                    <div class="col-12 container my-0">
                        <div class="row">
                            <div class="col-12">
                                <div class="collapse multi-collapse mt-3" id="multiCollapseExample1">
                                    <div class="form-group">
                                        <label>Password:</label>
                                        <input v-model="password" class="form-control" type="password"
                                            placeholder="Your Password">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="collapse multi-collapse" id="multiCollapseExample2">
                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input v-model="confirm" class="form-control" type="password"
                                            placeholder="Confirm Password">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="collapse multi-collapse" id="multiCollapseExample3">
                                    <div class="form-group">
                                        <button v-on:click="updateUser" type="submit" class="btn btn-default">
                                            <b>Submit</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="formChangePassword">
                <div class="formBody">
                        <button class="btn btn-default" type="submit" data-toggle="collapse"
                            data-target=".multi-collapse-password" aria-expanded="false"
                            aria-controls="multiCollapseExample4 multiCollapseExample5 multiCollapseExample6">
                            ChangePassword
                        </button>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="collapse multi-collapse-password mt-4" id="multiCollapseExample3">
                                    <div class="form-group">
                                        <label>Old Password:</label>
                                        <input v-model="old_password" class="form-control" type="password"
                                            placeholder="Your Old Password">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="collapse multi-collapse-password" id="multiCollapseExample3">
                                    <div class="form-group">
                                        <label>New Password:</label>
                                        <input v-model="new_password" class="form-control" type="password"
                                            placeholder="Your New Password">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="collapse multi-collapse-password" id="multiCollapseExample5">
                                    <div class="form-group">
                                        <label>Confirm New Password</label>
                                        <input v-model="new_confirm" class="form-control" type="password"
                                            placeholder="Confirm New Password">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="collapse multi-collapse-password" id="multiCollapseExample6">
                                    <div class="form-group">
                                        <button v-on:click="changePassword" type="submit" class="btn btn-default">
                                            <b>Submit</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="back" type="submit" class="btn btn-default">
                <b>Cancel</b>
            </button>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
    </div>
</template>

<script>
    import swal from 'sweetalert'

    export default {
        name: 'profile',
        data() {
            return {
                confirm: '',
                dataTarget: '',
                email: localStorage.getItem('email'),
                new_confirm: '',
                new_password: '',
                old_password: '',
                password: '',
                username: localStorage.getItem('username'),
            }
        },
        created() {
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
            back() {
                this.$router.push('/home')
            },

            changePassword () {
                let userPassword = {
                    old_password: this.old_password,
                    new_password: this.new_password,
                    new_confirm: this.new_confirm,
                    token: localStorage.getItem('token')
                }
                if (this.old_password === '') {
                    swal('Your old password must be filled!', {
                        icon: 'warning'
                    })
                } else if (this.new_password === '') {
                    swal('Your new password must be filled!', {
                        icon: 'warning'
                    })
                } else if (this.new_password !== this.new_confirm) {
                    swal('Your new password and confirm new password is not the same!', {
                        icon: 'warning'
                    })
                } else {
                    swal({
                        title: 'Alert',
                        text: 'Do you really want to change password?',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true
                    })
                    .then((change) => {
                        if (change) {
                            this.$store.dispatch('changePassword', userPassword)
                            swal('You have successfully change password!', {
                                icon: 'success'
                            })
                        }
                    })
                }
            },
            
            checkPassword() {
                if (this.username === '') {
                    swal('Username must be filled!', {
                        icon: 'warning'
                    })
                } else if (this.email === '') {
                    swal('Email must be filled!', {
                        icon: 'warning'
                    })
                } else {
                    this.dataTarget = '.multi-collapse'
                }
            },

            updateUser() {
                let userData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirm: this.confirm,
                    token: localStorage.getItem('token')
                }
                if (this.password === '') {
                    swal('Your password must be filled!', {
                        icon: 'warning'
                    })
                } else if (this.password !== this.confirm) {
                    swal('Your password and confirm password is not the same!', {
                        icon: 'warning'
                    })
                } else {
                    this.dataTarget = '';
                    this.$store.dispatch('updateProfile', userData)
                }
            },
        }
    }
</script>

<style scoped>
    .container {
        margin: 70px auto;
    }

    h1.title {
        font-family: 'Bungee Inline', cursive;
        font-size: 40px;
        margin-top: 0;
    }

    label {
        text-align: left;
        display: block;
        margin-bottom: .5rem;
    }

    .col-md-3 {
        font-size: 16px;
        margin: 0 auto;
    }

    .col-md-6 {
        width: 100%;
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
        outline: none;
        box-shadow: none;
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
