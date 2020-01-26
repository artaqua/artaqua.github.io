import Vue from 'vue'
import App from './App.vue'
import Message from './Todolist.vue'

Vue.component('app-todolist', Message);

new Vue({
  el: '#app',
  render: h => h(App)
})
