<template>
    <div class="container">
        <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12"></div>
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 bg">
                <div class="row">
                    <h1 class="col text-center title">
                        Todo List
                    </h1>
                </div>
                <hr>
                <div class="row">
                    <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                        <div class="text-center row container side">
                            <div class="input-box">
                                <h3>Add New Task</h3>
                                <label>Task Name:</label>
                                <input type="text" class="form-control" v-model="taskName">
                                <button type="button" class="form-control btn btn-primary" v-on:click="addTask">
                                    Add
                                </button>
                            </div>
                        </div>
                        <div class="row container side">
                            <ul class="list-group text-center">
                                <li class="list-group-item">
                                    <h6>
                                        <strong>OPTIONS</strong>
                                    </h6>
                                </li>
                                <li class="list-group-item">
                                    <button class="btn btn-link" @click="showAllTasks">List All Task</button>
                                </li>
                                <li class="list-group-item">
                                    <button class="btn btn-link" @click="getNotFinishTasks">List Not Done Task</button>
                                </li>
                                <li class="list-group-item">
                                    <button class="btn btn-link" @click="getFinishTasks">List Done Task</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                        <div class="row container side">
                            <div class="input-box">
                                <h3>Task</h3>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 c0l-12 box-task"
                                v-for="(task, index) in tasks" :key="index">

                                <div class="panel panel-primary">
                                    <div class="row container side">
                                        <div class="text-center col-12" v-if="task.status=='Done'">
                                            <h4 class="text-truncate todoListDone">
                                                <strike>{{ task.todo }}</strike>
                                            </h4>
                                        </div>
                                        <div class="text-center col-12" v-else>
                                            <h4 class="text-truncate todoList"> {{ task.todo }}</h4>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="panel-footer">
                                        <div class="btn-group">
                                            <button class="btn btn-outline-primary" data-toggle="modal"
                                                data-target="#modalUpdateTask" @click="setForUpdate(task)">
                                                <i class="fas fa-save"> Edit</i>
                                            </button>
                                            <button v-if="task.status=='Not Done'" class="btn btn-outline-success" @click="finishTask(task._id)">
                                                <i class="fas fa-check"> Done</i>
                                            </button>
                                            <button v-if="task.status=='Done'" class="btn btn-outline-info" @click="unFinishTask(task._id)">
                                                <i class="fas fa-close"> Undone</i>
                                            </button>
                                            <button class="btn btn-outline-danger" @click="deleteTask(task._id)">
                                                <i class="fas fa-trash-alt"> Delete</i>
                                            </button>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="panel-footer" v-if="task.status=='Done'">
                                        <h6>Completed at: {{stringDate(task.updatedAt)}}</h6>
                                    </div>
                                </div>

                                <div class="modal fade" id="modalUpdateTask" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Update Task</h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <label>Task Name:</label>
                                                <input type="text" class="form-control" v-model="newTask">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-success" @click="updateTask(task._id)"
                                                    data-dismiss="modal">Update</button>
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12"></div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import swal from 'sweetalert'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                done: [],
                newTask: '',
                notDone: [],
                taskId: '',
                taskName: '',
            }
        },
        computed: {
            ...mapState([
                'tasks'
            ])
        },
        created() {
            this.$store.dispatch('getAllTasks', localStorage.getItem('token'));
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
            this.$store.dispatch('getAllTasks', token)
        },
        mounted() {
            this.getDataStatus();
        },
        methods: {
            addTask() {
                if (this.taskName === '') {
                    swal('You must fill in a task!', {
                        icon: 'warning'
                    })
                } else {
                    let taskDetail = {
                        task: this.taskName,
                        token: localStorage.getItem('token')
                    }
                    this.$store.dispatch('addNewtask', taskDetail)
                    this.taskName = ''
                }
            },
            
            deleteTask(id) {
                let taskDetail = {
                    taskId: id,
                    token: localStorage.getItem('token')
                }
                let self = this
                swal({
                        title: 'Are you sure?',
                        text: 'Once deleted, you will not be able to recover this task!',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            self.$store.dispatch('deleteTask', taskDetail)
                        }
                    })
            },

            finishTask(id) {
                let taskDetail = {
                    taskId: id,
                    token: localStorage.getItem('token')
                }
                this.$store.dispatch('finishTask', taskDetail)
            },

            getDataStatus() {
                for (let idx in this.tasks) {
                    if (this.tasks[idx].status === 'Done') {
                        this.done.push(this.tasks[idx]);
                    } else {
                        this.notDone.push(this.tasks[idx]);
                    }
                }
            },

            getFinishTasks() {
                this.getDataStatus();

                let taskDetail = {
                    status: 'Done',
                    token: localStorage.getItem('token')
                }

                if (this.done.length === 0) {
                    swal('Your task not found!', {
                        icon: 'warning'
                    })
                    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
                } else {
                    this.done = [];
                    this.$store.dispatch('getTaskByStatus', taskDetail)
                }
            },
            
            getNotFinishTasks() {
                this.getDataStatus();

                let taskDetail = {
                    status: 'Not Done',
                    token: localStorage.getItem('token')
                }

                if (this.notDone.length === 0) {
                    swal('Your task not found!', {
                        icon: 'warning'
                    })
                    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
                } else {
                    this.notDone = [];
                    this.$store.dispatch('getTaskByStatus', taskDetail)
                }
            },

            setForUpdate(taskDetail) {
                this.newTask = taskDetail.todo
                this.taskId = taskDetail._id
            },
            
            showAllTasks() {
                this.$store.dispatch('getAllTasks', localStorage.getItem('token'));
            },

            stringDate: function (date) {
                return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
            },

            unFinishTask(id) {
                let taskDetail = {
                    taskId: id,
                    token: localStorage.getItem('token')
                }
                this.$store.dispatch('unFinishTask', taskDetail)
            },

            updateTask() {
                let payloadUpdateTask = {
                    task: this.newTask,
                    taskId: this.taskId,
                    token: localStorage.getItem('token')
                }
                let self = this
                swal({
                        title: 'Are you sure?',
                        text: 'Do you really want to update the task?',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true
                    })
                    .then((willUpdate) => {
                        if (willUpdate) {
                            self.$store.dispatch('updateTask', payloadUpdateTask)
                        }
                    })
            },
        }
    }
</script>

<style scoped>
    .container {
        margin: 70px auto;
    }

    .container.side {
        margin: 30px 0;
    }

    h1.title {
        font-family: 'Bungee Inline', cursive;
        font-size: 40px;
        margin-bottom: 10px;
    }

    .input-box {
        width: 100%;
        margin-top: -30px;
    }

    .form-control {
        width: 100%;
        margin: 5px 0;
    }

    .list-group {
        width: 100%;
    }

    .list-group-item {
        width: 100%;
        background-color: #F5F5F5;
    }

    .btn {
        white-space: normal;
    }

    .btn-group button {
        margin-top: 10px;
        font-size: 11px;
    }

    .panel-footer h6 {
        font-size: 13px;
    }

    h4.todoListDone,
    h4.todoList {
        font-size: 18px;
        font-weight: 400;
        font-family: 'Special Elite', cursive;
    }

    strike {
        color: red;
    }

    .panel.panel-primary {
        position: center;
        margin: 0 auto;
    }

    .col-md-8.bg {
        width: 100%;
        position: center;
        margin: 0 auto;
        background-color: #f0ffff;
        padding: 60px;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .col-md-12.box-task {
        position: center;
        margin: 15px auto;
        background-color: #F5F5F5;
        padding: 4%;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
    }
</style>
