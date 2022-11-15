import { defineStore } from 'pinia'
import type { Item } from "@/interfaces";
import type { RemovableRef } from '@vueuse/shared';


export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: [] as Item[]
  }),
  getters: {
    getAllTodos(): Item[] {
      return this.todos
    },
    todoEmpty(): Boolean {
      return this.todos.length <= 0
    },
  },
  actions: {
    addTodo(todo: String) {
      // @ts-ignore
      this.todos.push(todo)
    },      

    removeTodo(index: number) {
      this.todos.splice(index, 1)
    },
  },
})
