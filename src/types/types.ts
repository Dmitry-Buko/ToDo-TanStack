import { Dispatch, SetStateAction } from "react";

export type FilterType = "all" | "active" | "completed";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Task {
  completed: boolean;
  createdAt: string;
  description: string | null;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface TasksResponse {
  data: Task[];
}

export type CreateTodoDto = {
  title: string;
};

export type EditTodoDto = {
  id: number;
  newTitle: string;
};

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      statusCode?: number;
    };
  };
}

export type ErrorHandler = (message: string) => void;

export interface IToDoContext {
  tasks: Task[];
  addTask: (title: string, onError?: (errorMessage: string) => void) => void;
  deleteTask: (id: number, onError?: (errorMessage: string) => void) => void;
  isDoneToggler: (id: number) => void;
  editTitle: (
    id: number,
    newTitle: string,
    onError?: (errorMessage: string) => void,
  ) => void;
  filteredTasks: Task[];
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<string>>;
  activeCount: number;
  clearCompeted: (onError?: (errorMessage: string) => void) => void;
  loadingAddTask: boolean;
  loadingChangeTask: boolean;
  loadingDeleteTask: boolean;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}


export type CreateTaskErrorResponse = {
  errors?: {
    msg: string;
  }[];
};