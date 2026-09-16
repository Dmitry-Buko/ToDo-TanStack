import { EditTodoDto, Task, TasksResponse } from "../../types/types";
import api from "./todoApi";

//генератор ключей
export const todoKeys = {
  all: ["todo"],
  list: () => [...todoKeys.all, "list"],
};

//API начальная Загрузка тасок
export const fetchTask = async () => {
  const response = await api.get<TasksResponse>("/todos");
  return response.data.data;
};

//API добавление задачи
export const createTask = async (title: string): Promise<Task> => {
  const response = await api.post("/todos", { title });
  return response.data;
};

//API изменение задачи
export const editTodoTask = async ({ id, newTitle }: EditTodoDto) => {
  const response = await api.patch(`/todos/${id}`, {
    title: newTitle,
  });
  return response.data;
};

//---API удаление таски
export const deleteTodoTask = async (id: number) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

//---API переключатель выполнено или нет
export const toggleTodoTask = async (id: number) => {
  const response = await api.patch(`/todos/${id}/toggle`);
  return response.data;
};
