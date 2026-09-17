import { EditTodoDto, Task, TasksResponse } from "../../types/types";
import api from "./todoApi";

//генератор ключей
export const todoKeys = {
  all: ["todo"] as const,
  list: () => [...todoKeys.all, "list"],
};

//API начальная Загрузка тасок
export const fetchTask = async (): Promise<Task[]> => {
  const { data } = await api.get<TasksResponse>("/todos");
  return data.data;
};

//API добавление задачи
export const createTask = async (title: string): Promise<Task> => {
  const response = await api.post<Task>("/todos", { title });
  return response.data;
};

//API изменение задачи
export const editTodoTask = async ({
  id,
  newTitle,
}: EditTodoDto): Promise<Task> => {
  const response = await api.patch<Task>(`/todos/${id}`, {
    title: newTitle,
  });
  return response.data;
};

//---API удаление таски
export const deleteTodoTask = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

//---API переключатель выполнено или нет
export const toggleTodoTask = async (id: number): Promise<Task> => {
  const response = await api.patch<Task>(`/todos/${id}/toggle`);
  return response.data;
};
