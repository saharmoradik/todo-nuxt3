import { setActivePinia, createPinia } from "pinia";
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";
import { Title } from "~~/.nuxt/components";
import { useToDoStore } from "../store/todo";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useToDoStore>;
  beforeEach(() => {
    store = useToDoStore();
  });
  afterEach(() => {
    store.$reset();
  });
  /////////////
  test("create a store", () => {
    expect(store).toBeDefined();
  });
  ////////////////
  test("initializes with empaty items", () => {
    expect(store.items).toStrictEqual([]);
  });
  /////////////
  test("create a todo", () => {
    store.add({ title: "test my code" });
    expect(store.items[0]).toBeDefined();
    expect(store.items[0]?.title).toBe("test my code");
  });
  //////////////
  test("gets by ID", () => {
    store.add({ title: "test" });
    const item = store.items[0];
    const todo = store.getById(item.id);
    expect(todo).toStrictEqual(item);
  });

  /////////////////
  test("gets ordered todo without mutating state", () => {
    const items = [
      {
        createdAt: new Date(2021, 1, 22),
      },
      {
        createdAt: new Date(2019, 1, 22),
      },
      {
        createdAt: new Date(2020, 1, 22),
      },
    ];

    // @ts-ignore
    store.items = items;

    const orderedTodo = store.getOrderedTodo;
    expect(orderedTodo[0].createdAt.getFullYear()).toBe(2019);
    expect(orderedTodo[1].createdAt.getFullYear()).toBe(2020);
    expect(orderedTodo[2].createdAt.getFullYear()).toBe(2021);
    expect(orderedTodo[2].createdAt.getFullYear()).toBe(2021);
    expect(store.items[0].createdAt.getFullYear()).toBe(2021);
  });
  //////////
  test("removes a todo", () => {
    store.add({ title: "teset" });
    const todo = store.items[0];
    store.remove(todo.id);
    expect(store.items).toStrictEqual([]);
  });

  test("updates a todo", () => {
    store.add({ title: "test" });
    const todo = store.items[0];
    store.update(todo?.id, { done: true });
    const updated = store.items[0];
    expect(store.items[0]?.done).equal(true);
    expect(updated?.done).equal(true);
  });
});
// describe("run", () => {
//   test("it works", () => {
//     expect(true).toBe(true);
//   });
// });
