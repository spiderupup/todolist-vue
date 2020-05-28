<template>
  <div id="app">
    <a-input placeholder="请输入待办" class="my_ipt"
      :value="inputValue"
      @change="handleChange($event)" />
    <a-button
      type="primary"
      @click="addItemToList"
    >添加待办</a-button>
    <a-list borderd :dataSource="todoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 选择框 -->
        <a-checkbox
          :checked="item.done"
          @change="(e) => {handleStatusChange(e, item.id)}"
        >{{item.info}}</a-checkbox>
        <a slot="actions" @click="handleDeleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer -->
      <div slot="footer" class="footer">
        <span>{{unDoneLength}}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'todoList'])
  },
  methods: {
    handleChange(e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    // 添加待办
    addItemToList() {
      if (this.inputValue.trim() === '') {
        return this.$message.warning('输入内容不能为空!')
      }
      this.$store.commit('addItem')
    },
    // 删除待办
    handleDeleteItem(id) {
      this.$store.commit('deleteItem', id)
    },
    // 复选框
    handleStatusChange(e, id) {
      // e.target.checked
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    // 清除已完成
    clean() {
      this.$store.commit('cleanDone')
    },
    changeList(str) {
      this.$store.commit('changeViewKey', str)
    }
  }
}
</script>

<style scoped>
#app {
  padding-top: 20px;
  width: 600px;
  margin: 0 auto;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
