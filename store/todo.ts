import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export interface ToDo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoAdd {
  title: string;
}

export interface TodoUpdate {
  title?: string;
  done?: boolean;
}

export interface TodoState {
  items: ToDo[] | undefined[];
}

const state = (): TodoState => ({
  items: [],
});

const getters = {
  getById: (state: TodoState) => (id: string) => {
    return state.items.find((item) => item.id === id);
  },
  getOrderedTodo: (state: TodoState) =>
    state.items.sort(
      (a: ToDo, b: ToDo) =>
        a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds()
    ),
};
const actions = {
  add(partialTodo: TodoAdd) {
    const todo: ToDo = {
      //generate unique id
      id: uuid(),
      ...partialTodo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(todo);
  },
  remove(id: string) {
    this.items = this.items.filter((todo) => todo.id != id);
  },
  update(id: string, update: TodoUpdate) {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, ...update, updateAt: new Date() } : item
    );
  },
};

export const useToDoStore = defineStore("todoStore", {
  state,
  getters,
  actions,
});
