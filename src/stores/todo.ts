import { defineStore } from 'pinia'
import type { NewTodo } from "@/interfaces/todo";

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: useStorage('todos', ['test']),
  }),
  getters: {
    getAllTodos(): Array<NewTodo> {
      // @ts-ignore
      return this.todos
    },
    todoEmpty(): Boolean {
      return this.todos.length <= 0
    },
  },
  actions: {
    addTodo(todo: NewTodo) {
      // @ts-ignore
      this.todos.push(todo)
    },      

    removeTodo(index: number) {
      this.todos.splice(index, 1)
    },
  },
})
