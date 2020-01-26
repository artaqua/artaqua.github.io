<template>
  <div class="todolist">
    <input class="field-text" type="text" placeholder="Какие у вас планы?" autofocus autocomplete="off"
      v-model="newTodoText"
      @keyup.enter="addTodo"
      @keyup.esc="clearInput" 
    >
    <button class="all-done" 
      v-show="filteredItems.length"
      @click="allDone"
      :class="{ active: toggleClass }">V
    </button>
    <transition-group class="items"
      v-cloak
      tag="ul"
      name="slide-toggle" 
      @enter="enterTransition" 
      @leave="leaveTransition"
      appear
      appear-class="onload">
      <li
        v-for="item in filteredItems"
        :key="item.id"
        :class="{ editing: item == editedItem }">
        <div class="check">
          <input type="checkbox" 
            :id="'checkbox-' + item.id" 
            v-model="item.checked">
          <label class="label-checkbox"
            :for="'checkbox-' + item.id"> 
          </label>
        </div>
        <p class="info">кликните для редактирования</p>
        <button class="del-item" 
          @click="removeItem(item)">X
        </button>
        <label class="item-text" 
          :class="{ active: item.checked }"
          @click="editItem(item)">{{ item.title }}
        </label>
        <input class="edit-item" type="text"
          v-model="item.title"
          v-item-focus="item == editedItem"
          @blur="doneEdit(item)"
          @keyup.enter="doneEdit(item)"
          @keyup.esc="cancelEdit(item)">
      </li>
    </transition-group>
    <footer v-show="items.length" v-cloak>
      <span class="count-items">Невыполненных дел: {{ notCompleteItems }}</span>
      <ul class="list-showing">
        <li>
          <button 
            @click="visibility = 'all'" 
            :class="{ selected: visibility == 'all' }">Все
          </button>
        </li>
        <li>
          <button 
            @click="visibility = 'active'" 
            :class="{ selected: visibility == 'active' }">Активные
          </button>
        </li>
        <li>
          <button 
            @click="visibility = 'completed'" 
            :class="{ selected: visibility == 'completed' }">Выполненые
          </button>
        </li>
      </ul>
      <button class="del-active-item" 
        v-show="items.length > notCompleteItems" 
        @click="removeComplete">Удалить выполненные
      </button>
    </footer>
  </div>
</template>

<script>

  // Local storage
  const STORAGE_KEY = 'ItemsTodo'
  const itemsStorage = {
    fetch: function () {
      var items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      items.forEach(function (item, index) {
        item.id = index;
      })
      itemsStorage.id = items.length;
      return items;
    },
    save: function (items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }

  // Todolist
  const filters = {
    all(items) {
      return items
    },
    active(items) {
      return items.filter(function (item) {
        return !item.checked
      })
    },
    completed(items) {
      return items.filter(function (item) {
        return item.checked
      })
    }
  }

  export default {
    data() {
      return {
        newTodoText: '',
        items: itemsStorage.fetch(),
        visibility: 'all',
        editedItem: null,
        toggleClass: false
      }
    },
    watch: {
      items: {
        handler: function (items) {
          itemsStorage.save(items);
        },
        deep: true
      }
    },
    computed: {
      filteredItems() {
        return filters[this.visibility](this.items);
      },
      notCompleteItems() {
        return filters.active(this.items).length;
      }
    },
    methods: {
      addTodo() {
        if ( this.newTodoText.length > 0 ) {
          this.items.push({
            id: itemsStorage.id++,
            title: this.newTodoText,
            checked: false,
          });
          this.clearInput();
        }
      },
      removeItem(item) {
        this.items.splice(this.items.indexOf(item),1);
      },
      clearInput() {
        this.newTodoText = '';
      },
      removeComplete() {
        this.items = filters.active(this.items);
      },
      allDone() {
        this.toggleClass = !this.toggleClass;
        const toggleClass = this.toggleClass;

        this.items.forEach(function(el,index) {
          if (toggleClass) {
            el.checked = true;
          } else {
            el.checked = false;
          }
        });
      },
      editItem(item) {
        this.beforeEditCache = item.title;
        this.editedItem = item;
      },
      doneEdit(item) {
        if (!this.editedItem) {
          return
        }
        this.editedItem = null;
        item.title = item.title.trim();
        if (!item.title) {
          this.removeItem(item);
        }
      },
      cancelEdit(item) {
        this.editedItem = null;
        item.title = this.beforeEditCache;
      },
      enterTransition(el) {
        el.style.maxHeight = el.scrollHeight + 'px';
        el.style.opacity = 1;
      },
      leaveTransition(el) {
        el.style.maxHeight = '0px';
        el.style.opacity = 0;
      }
    },
    directives: {
      'item-focus': function(el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
    }
  }
</script>

<style>
  body {
    overflow-y: scroll;
  }
  [v-cloak] {
    display: none;
  }
  .todolist {
    position: relative;
    float: left;
    width: 100%;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.2);
  }
  .field-text {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #797979;
    padding: 20px 70px;
    outline: none;
    border: none;
    border-bottom: 1px solid #57d89f;
  }
  .all-done {
    position: absolute;
    top: 23px;
    left: 24px;
    background: none;
    border: none;
    font-size: 16px;
    color: #ccc;
    outline: none;
    cursor: pointer;
    transition: all 300ms ease;
  }
  .all-done.active {
    color: #57d89f;
  }
  .items {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .items li {
    position: relative;
    float: left;
    width: 100%;
    list-style: none;
    border-bottom: 1px solid #ccc;
    max-height: 0;
    opacity: 0;
    transition: max-height 300ms ease, opacity 300ms ease;
  }
  .items li.onload {
    max-height: auto;
    opacity: 1;
    transition: none;
  }
  .items .check {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0,-50%);
  }
  .items .check input[type="checkbox"] {
    display: none;
  }
  .items .check .label-checkbox {
    display: block;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: all 100ms ease-out;
  }
  .items .check .label-checkbox:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-75%) scale(1.6);
    display: black;
    content: 'V';
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    opacity: 0;
    transition: all 100ms ease-out 200ms;
  }
  .items .check input:checked + .label-checkbox {
    background: #57d89f;
    border-color: #57d89f;
  }
  .items .check input:checked + .label-checkbox:after {
    opacity: 1;
    transform: translate(-50%,-50%) scale(1);
  }
  .items .item-text {
    float: left;
    display: block;
    min-height: 64px;
    width: 100%;
    font-size: 20px;
    text-overflow: ellipsis;
    color: #333;
    padding: 20px 70px;
    transition: all 300ms ease;
    cursor: pointer;
  }
  .items .item-text.active {
    color: #EFEFEF;
    text-decoration: line-through;
  }
  .items .edit-item {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #333;
    padding: 0 70px;
    transition: all 300ms ease;
  }
  .items li.editing .edit-item {
    display: block;
    background: #f9f9f9;
  }
  .items li .del-item {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0,-50%);
    background: #57d89f;
    color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
    height: auto;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 700;
    opacity: 0;
    transition: all 300ms ease;
  }
  .items li:hover .del-item {
    opacity: 1;
  }
  .items li .info {
    position: absolute;
    top: 2px;
    left: 50%;
    font-size: 11px;
    margin: 0;
    pointer-events: none;
    opacity: 0;
    transform: translate(-60%,0);
    transition: all 300ms ease;
  }
  .items li:hover .info {
    opacity: 1;
    transform: translate(-50%,0);
  }
  footer {
    float: left;
    width: 100%;
    padding: 15px 20px;
  }
  footer .count-items {
    float: left;
    font-size: 14px;
    color: #333;
    margin-top: 5px;
  }
  footer .list-showing {
    float: left;
    margin: 0;
    padding: 0;
    margin-left: 30px;
  }
  footer .list-showing li {
    float: left;
    list-style: none;
    padding: 0 8px;
  }
  footer .list-showing li button {
    color: #333;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
  }
  footer .list-showing li button:hover {
    color: #fff;
    background: #57d89f;
    border-color: #57d89f;
  }
  footer .list-showing li button.selected {
    color: #333;
    background: #EFEFEF;
    border-color: #EFEFEF;
  }
  footer .del-active-item {
    float: right;
    color: #333;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
  }
  footer .del-active-item:hover {
    color: #fff;
    background: #57d89f;
    border-color: #57d89f;
  }
  /* MEDIA */
  @media screen and (max-width: 760px) {
    .field-text {
      padding: 20px 60px;
    }
    .all-done {
      left: 19px;
    }
    .items .item-text {
      padding: 20px 60px;
    }
    .items .edit-item {
      padding: 0 60px;
    }
    .items li .info { 
      display: none;
    }
    .items .check {
      left: 15px;
    }
    .items li .del-item {
      right: 15px;
      opacity: 1;
    }
  }
  @media screen and (max-width: 700px) {
    footer {
      padding: 15px;
    }
    footer .count-items {
      width: 100%;
      margin-top: 0;
    }
    footer .list-showing {
      text-align: center;
      margin: 15px 0;
      margin-bottom: 0;
    }
    footer .list-showing li { 
      float: none;
      display: inline-block;
      padding: 0;
      margin-right: 8px;
    }
    footer .del-active-item {
      margin: 15px 0;
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 500px) {
    .field-text {
      font-size: 18px;
      padding: 20px 50px;
    }
    .all-done {
      left: 13px;
    }
    .items .edit-item {
      font-size: 18px;
      padding: 0 50px;
    }
    .items .check {
      left: 10px;
    }
    .items li .del-item {
      right: 10px;
    }
    .items .item-text {
      font-size: 18px;
      min-height: 62px;
      padding: 20px 50px;
    }
    footer {
      padding: 10px;
    }
    footer .count-items {
      margin-top: 5px;
      margin-bottom: 15px;
    }
    footer .list-showing {
      float: none;
      display: block;
      width: auto;
      margin: 0 -5px;
    }
    footer .list-showing li {
      float: left;
      width: 33.3333%;
      margin: 0;
      padding: 0 5px;
    }
    footer .list-showing li button {
      width: 100%;
      font-size: 11px;
      text-transform: uppercase;
      padding: 8px 12px;
    }
    footer .del-active-item {
      float: left;
      width: 100%;
      clear: both;
      font-size: 11px;
      text-transform: uppercase;
      padding: 8px 12px;
      margin-top: 10px;
    }
  }
</style>