import { useState, useCallback, useMemo, ReactNode } from "react";
import { ToDoContext } from "./ToDoContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  todoKeys,
  fetchTask,
  createTask,
  editTodoTask,
  deleteTodoTask,
  toggleTodoTask,
} from "../api/todoApiFunc";
import {
  CreateTaskErrorResponse,
  EditTodoDto,
  ErrorHandler,
  FilterType,
  Task,
} from "../../types/types";
import { AxiosError } from "axios";

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const queryClient = useQueryClient();

  const {
    data: receivedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: todoKeys.list(),
    queryFn: fetchTask,
    staleTime: 5000,
  });

  const tasks = useMemo(() => receivedData || [], [receivedData]);

  // Считаем кол-во активных
  const activeCount = useMemo(() => {
    let count = 0;
    tasks.forEach((el) => {
      if (!el.completed) count++;
    });
    return count;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => !item.completed);
      case "completed":
        return tasks.filter((item) => item.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  // --- API добавление задачи ---
  const addMutation = useMutation<
    Task, //что возвращает мутация
    AxiosError<CreateTaskErrorResponse>, //тип ошибки, тк юзаем axios, (а у него своя структура ответа), используем AxiosError
    string // тип данных, который передается в mutate()
  >({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list() });
    },
  });

  const addTask = useCallback(
    (title: string, onError?: ErrorHandler) => {
      addMutation.mutate(title, {
        onError: (error) => {
          const errorMessage =
            error.response?.data?.errors?.[0]?.msg || "Произошла ошибка";
          onError?.(errorMessage);
        },
      });
    },
    [addMutation],
  );

  // --- API изменение задачи ---
  const updateTitleMutation = useMutation<
    Task,
    AxiosError<CreateTaskErrorResponse>,
    EditTodoDto //тип входных данных в mutate()
  >({
    mutationFn: editTodoTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list() });
    },
  });

  const editTitle = useCallback(
    (id: number, newTitle: string, onError?: ErrorHandler) => {
      if (!newTitle || !newTitle.trim()) {
        onError?.("Задача не может быть пустой!");
        return;
      }
      updateTitleMutation.mutate(
        { id, newTitle },
        {
          onError: (error) => {
            const errorMessage =
              error.response?.data?.errors?.[0]?.msg || "Произошла ошибка";
            onError?.(errorMessage);
          },
        },
      );
    },
    [updateTitleMutation],
  );

  // --- API удаление таски ---
  const deleteTitleMutation = useMutation<
    void,//deleteTodoTask ничего не возвращает, соответственно mutation так же ничего не возвращает
    AxiosError<CreateTaskErrorResponse>,
    number
  >({
    mutationFn: deleteTodoTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list() });
    },
  });

  const deleteTask = useCallback(
    (id: number, onError?: ErrorHandler) => {
      deleteTitleMutation.mutate(id, {
        onError: (error) => {
          const errorMessage =
            error.response?.data?.errors?.[0]?.msg || "Ошибка удаления";
          onError?.(errorMessage);
        },
      });
    },
    [deleteTitleMutation],
  );

  // --- API переключатель выполнено или нет ---
  const isDoneTogglerMutation = useMutation({
    mutationFn: toggleTodoTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.list() });
    },
  });

  const isDoneToggler = useCallback(
    (id: number) => {
      isDoneTogglerMutation.mutate(id);
    },
    [isDoneTogglerMutation],
  );

  // --- API очистка выполненных ---
  const clearCompeted = useCallback(
    (onError?: ErrorHandler) => {
      const completedTask = tasks.filter((item) => item.completed);
      if (completedTask.length === 0) return;

      const deletedPromise = completedTask.map((task) =>
        deleteTodoTask(task.id),
      );

      Promise.all(deletedPromise)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: todoKeys.list() });
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.errors?.[0]?.msg || "Произошла ошибка";
          onError?.(errorMessage);
        });
    },
    [tasks, queryClient],
  );

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      deleteTask,
      isDoneToggler,
      editTitle,
      filteredTasks,
      filter,
      setFilter,
      activeCount,
      clearCompeted,
      loadingAddTask: addMutation.isPending,
      loadingChangeTask: updateTitleMutation.isPending,
      loadingDeleteTask: deleteTitleMutation.isPending,
      error,
      isLoading,
      isError,
    }),
    [
      tasks,
      addTask,
      deleteTask,
      isDoneToggler,
      editTitle,
      filteredTasks,
      filter,
      setFilter,
      activeCount,
      clearCompeted,
      addMutation.isPending,
      updateTitleMutation.isPending,
      deleteTitleMutation.isPending,
      error,
      isLoading,
      isError,
    ],
  );

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
