<template>
  <div class="container sidenav col-md-9">
    <div class="row">
      <div class=" sidenav col-md-4">
        <div class="col-md-3"></div>
        <div class="col-md-12">
          <h3>Add New Task</h3>
          <hr>
          <div class="modal-body">
            <label>Task Name:</label>
            <input type="text" class="form-control" v-model="taskName">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="addTask" data-dismiss="modal">Add</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
        <div class="col-md-3"></div>
        <br>
        <div class="col-md-3"></div>
        <div class="col-md-12">
          <ul class="list-group list-group-flush">
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
        <div class="col-md-3"></div>
        <br>
        <div class="col-md-3"></div>
        <div class="col-md-12">
          <div style="text-align:center;padding:1em 0;">
            <h5>
              <span style="color:gray;">Clock Local</span>
              <br />Jakarta, Indonesia</h5>
            <iframe scrolling="no" frameborder="no" clocktype="html5" style="overflow:hidden;border:0;margin:0;padding:0;width:120px;height:40px; "
              src="https://www.clocklink.com/html5embed.php?clock=004&timezone=Indonesia_Jakarta&color=gray&size=120&Title=&Message=&Target=&From=2018,1,1,0,0,0&Color=gray"></iframe>
          </div>
        </div>
      </div>
      <div class="col-md-8 mx-auto">
        <br>
        <h3>
          Todo List
        </h3>
        <hr>
        <div class="col-md-3"></div>
        <div class="col-md-12" v-for="(task, index) in tasks" :key="index">
          <div class="row">
            <div class="col-sm-6 col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h5 class="panel-title">
                    Task
                  </h5>
                </div>
                <hr>
                <div class="panel-body">
                  <div class="pull-center">
                    <div v-if="task.status=='Done'">
                      <h2 class="todoListDone">
                        <strike>{{ task.todo }}</strike>
                      </h2>
                    </div>
                    <div v-else>
                      <h2 class="todoList"> {{ task.todo }}</h2>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="panel-footer">
                  <div class="btn-group">
                    <button class="btn btn-outline-primary" data-toggle="modal" data-target="#modalUpdateTask" @click="setForUpdate(task)">
                      <i class="fas fa-save"> Edit</i>
                    </button>
                    <button class="btn btn-outline-success" @click="finishTask(task._id)">
                      <i class="fas fa-check"> Done</i>
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
            </div>
            <div class="modal fade" id="modalUpdateTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Update Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <label>Task Name:</label>
                    <input type="text" class="form-control" v-model="newTask">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="updateTask(task)" data-dismiss="modal">Update</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
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
  data () {
    return {
      taskName: '',
      newTask: '',
      taskId: ''
    }
  },
  computed: {
    ...mapState([
      'tasks'
    ])
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
    this.$store.dispatch('getAllTasks', token)
  },
  methods: {
    addTask () {
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
    showAllTasks () {
      this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
    },
    getNotFinishTasks () {
      let taskDetail = {
        status: 'Not Done',
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('getTaskByStatus', taskDetail)
    },
    getFinishTasks () {
      let taskDetail = {
        status: 'Done',
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('getTaskByStatus', taskDetail)
    },
    setForUpdate (taskDetail) {
      this.newTask = taskDetail.todo
      this.taskId = taskDetail._id
    },
    finishTask (id) {
      let taskDetail = {
        taskId: id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('finishTask', taskDetail)
    },
    deleteTask (id) {
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
    updateTask (taskDetail) {
      let payloadUpdateTask = {
        task: this.newTask,
        taskId: taskDetail._id,
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
          self.$store.dispatch('updateTask', payloadUpdateTask)
        })
    },
    stringDate: function (date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
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

.list-group-item {
  background-color: #F5F5F5;
}

.btn-link {
  font-weight: 500;
}

label {
  text-align: left;
  display: block;
  margin-bottom: .5rem;
}

h2.todoListDone {
  font-weight: 400;
  font-family: 'Special Elite', cursive;
}

h2.todoList {
  font-weight: 400;
  font-family: 'Special Elite', cursive;
}

strike {
  color: red;
}

h3 {
  font-family: 'Bungee Inline', cursive;
}

h5 {
  font-weight: 800;
}

h5.panel-title {
  background-color: #F5F5F5;
  display: block;
}

.panel.panel-primary {
  position: center;
  margin: 0 auto;
}

.modal-footer {
  position: center;
  margin: 0 auto;
}

.col-md-12 {
  position: center;
  margin: 0 auto;
  background-color: #f0ffff;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
