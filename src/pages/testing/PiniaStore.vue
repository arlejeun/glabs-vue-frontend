<script lang="ts">
import { useTodoStore } from '@/stores/todo'
export default {
  setup() {
    const main = useTodoStore()
    const mytodo = ref('')
    const AddTodo = () => {
      if (mytodo.value !== '') {
        main.addTodo(mytodo.value)
        mytodo.value = ''
      }
    }
    return {
      AddTodo,
      mytodo,
      todos: computed(() => main.getAllTodos),
      isEmpty: computed(() => main.todoEmpty),
      removeTodo: main.removeTodo,
    }
  },
}
</script>

<template>
  <input
    v-model="mytodo"
    type="text"
  >
  <button @click="AddTodo">
    Add Todo
  </button>
  <div v-if="!isEmpty">
    <p
      v-for="(todo, index) in todos"
      :key="index"
    >
      {{ index }}. {{ todo }} <button @click="removeTodo(index)">
        delete
      </button>
    </p>
  </div>
  <div v-else>
    No todos found
  </div>
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
</route>
