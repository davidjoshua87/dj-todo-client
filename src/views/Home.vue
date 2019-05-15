<template>
    <div class="container">
        <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 bg">
                <div class="row">
                    <h1 class="col text-center title">
                        Welcome_
                        <span>{{ username }}</span>
                    </h1>
                </div>
                <hr>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="taskList">
                            <h3>
                                You Currently Have
                            </h3>
                            <div class="row">
                                <div class="box col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                                    <button type="button" v-on:click="goTodo" class="taskListCount">
                                        <h5>
                                            <strong>{{ notDone }} task(s)</strong>
                                        </h5>
                                    </button>
                                    <i class="fa fa-times-circle"></i>
                                    <h5>
                                        not done yet
                                    </h5>
                                </div>
                                <div class="box col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 offset-xl-1 offset-lg-1">
                                    <button type="button" v-on:click="goTodo" class="taskListCount">
                                        <h5>
                                            <strong>{{ finished }} task(s)</strong>
                                        </h5>
                                    </button>
                                    <i class="fa fa-check-square"></i>
                                    <h5>
                                        finished
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <div class="weatherInfo">
                            <h3>
                                Current Weather
                            </h3>
                            <br>
                            <h4>{{ weather.address }}</h4>
                            <h2>
                                <strong>{{ weather.temperatureShow }}</strong>
                            </h2>
                            <img :src="weather.imageShow">
                            <h6>{{ weather.dayShow }} {{ weather.dateShow }}</h6>
                        </div>
                        <br>
                        <hr>

                        <div class="search-box">
                            <h3>
                                Check Weather By City
                            </h3>
                            <br>
                            <div class="form-group">
                                <label>Enter your city!</label>
                                <input type="text" placeholder="ex: Tokyo, Sidney" class="form-control"
                                    v-model="search">
                            </div>
                            <button type="submit" class="btn btn-success" @click="checkWeather">Check</button>
                            <br>
                            <h4>{{ result.address }}</h4>
                            <h2>
                                <strong>{{ result.temperatureShow }}</strong>
                            </h2>
                            <img :src="result.imageShow">
                            <h6>{{ result.dayShow }} {{ result.dateShow }}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import swal from 'sweetalert'

    export default {
        name: 'home',
        data() {
            return {
                username: localStorage.getItem('username'),
                notDone: 0,
                finished: 0,
                search: '',
            }
        },
        computed: {
            ...mapState([
                'isLogin',
                'notFbLogin',
                'tasks',
                'weather',
                'result'
            ]),
        },
        beforeCreate() {
            this.$store.dispatch('getCurrentWeather')
        },
        created() {
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
                let inputData = {
                    search: this.search
                }
                if (this.search === '') {
                    swal('Searchfield must be filled!', {
                        icon: 'warning'
                    })
                } else {
                    this.$store.dispatch('getSearchWeather', inputData);
                    this.search = '';
                }
            },
            
            getTaskStatuses() {
                if (this.tasks.length !== 0) {
                    let tasksTemp = this.tasks
                    tasksTemp.forEach(task => {
                        if (task.status === 'Done') {
                            this.finished++
                        } else if (task.status === 'Not Done') {
                            this.notDone++
                        }
                    })
                }
            },

            goTodo(){
                this.$router.push('/todo')
            }
        }
    }
</script>

<style scoped>
    .container {
        margin: 70px auto;
    }

    .col-md-6.bg {
        position: center;
        margin: 0 auto;
        background-color: #f0ffff;
        padding: 60px;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    h1.title,
    span {
        font-family: 'Bungee Inline', cursive;
        font-size: 40px;
        margin-top: 0;
    }

    .form-control {
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 10px;
        margin-right: auto;
        margin-left: auto;
        outline: none;
        box-shadow: none;
    }

    .fa {
        font-size: 25px;
        margin-top: 15px;
    }

    .taskListCount {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin: auto;
        padding: 10%;
        border: 1px dotted black;
        background-color: #F5F5F5;
        outline: none;
        box-shadow: none;
        cursor: pointer;
    }

    .taskListCount:hover{
        color: red;
        background-color: transparent;
        border: 1px dotted red;
    }

    .box {
        width: 100%;
        padding: 1%;
        position: center;
        margin: auto;
    }

    .weatherInfo,
    .search-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding: 1%;
    }

    .btn-success {
        outline: none;
        box-shadow: none;
    }
</style>
