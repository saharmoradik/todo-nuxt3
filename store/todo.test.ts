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
});
// describe("run", () => {
//   test("it works", () => {
//     expect(true).toBe(true);
//   });
// });
