<template>
  <div id="app">
    <div class="container-fluid">
      <div class="wrapper">
        <h1 class="header-title">Todolist on Vue.js + localStorage</h1>
        <p class="sub-title">Данные сохраняються при закрытии страницы</p>
        <app-todolist></app-todolist>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html,body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
  .container-fluid {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
  .wrapper {
    float: left;
    width: 100%;
    padding: 10px;
  }
  .header-title {
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
    color: #ced;
    margin-top: 40px;
    margin-bottom: 0;
  }
  .sub-title {
    width: 100%;
    font-size: 12px;
    color: #ccc;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
  }
</style>
