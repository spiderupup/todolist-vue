import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [], // 所有的任务列表
    inputValue: '',
    nextId: 4,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除待办
    deleteItem(state, id) {
      state.list = state.list.filter(item => {
        return item.id !== id
      })
    },
    changeStatus(state, param) {
      state.list.forEach(item => {
        if (item.id === param.id) {
          item.done = param.status
        }
      })
    },
    // 清除已完成
    cleanDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 修改视图
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('./list.json').then(({ data }) => {
        context.commit('initList', data)
        console.log(context)
      })
    }
  },
  getters: {
    // 统计未完成的条数
    unDoneLength(state) {
      return state.list.filter(item => {
        return item.done === false
      }).length
    },
    // 获取各个视图列表
    todoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(item => item.done === false)
      } else if (state.viewKey === 'done') {
        return state.list.filter(item => item.done)
      }
      return state.list
    }
  }
})
