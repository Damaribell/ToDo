<template>
  <div>
    <h1>todoリスト</h1>

    <form @submit.prevent="addTodo()">
      <el-input placeholder="todo" v-model="todo"></el-input>
    </form>
    <el-row :gutter="12">
      <todoItem v-for="(todo, index) in todos" :key="todo" :tittle="todo" @delTodo="removeTodo(index)" />
      <todoItem v-for="(issue, index) in issues" :key="issue.number" :tittle="issue.tittle" @delTodo="closeIssue(index)" />
      </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoItem';

const client = axios.create({
  baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
  headers: {
    'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type':'application/json',
  },
})

export default {
  name: 'TodosIssues',
  components: {
    TodoItem
  },
  data () {
    return {
      todoKeys: 0,
      todo: '',
      todos: [],
      issues: []
    }
  },
  methods: {
  
    addTodo(){
      this.todos.push(this.todo);
      this.todo= '';
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    },

    closeIssue(index){
      const target = this.issues[index];
      client.patch(`/issues/${target.number}`,
          {
            state: "closed"
          },
        )
        .then(() => {
         this.issues.splice(index, 1);
      })
    },
    getIssues() {
      client.get('issues')
        .then((res) => {
          this.issues = res.data
      })
    }
  },
  created() {
    this.getIssues();
  }
}
</script>