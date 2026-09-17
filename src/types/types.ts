import { Dispatch, KeyboardEvent, SetStateAction } from "react";

export type FilterType = "all" | "active" | "completed";

// export interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

export interface Task {
  completed: boolean;
  createdAt: string;
  description: string | null;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface TasksMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TasksResponse {
  data: Task[];
  meta: TasksMeta; //добавлено, потому что в объекте с сервера есть meta
}

export type CreateTodoDto = {
  title: string;
};

export type EditTodoDto = {
  id: number;
  newTitle: string;
};

// export interface ErrorResponse {
//   response?: {
//     data?: {
//       message?: string;
//       statusCode?: number;
//     };
//   };
// }

export type ErrorHandler = (message: string) => void;

export interface IToDoContext {
  tasks: Task[];
  addTask: (title: string, onError?: ErrorHandler) => void;
  deleteTask: (id: number, onError?: ErrorHandler) => void;
  isDoneToggler: (id: number) => void;
  editTitle: (id: number, newTitle: string, onError?: ErrorHandler) => void;
  filteredTasks: Task[];
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  activeCount: number;
  clearCompeted: (onError?: ErrorHandler) => void;
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

export type TaskEditFormProps = {
  editText: string;
  setEditText: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => Promise<void>;
};


export type FormDataType = {
    email: string;
    password: string;
}

export type LocationState = {
  email?: string;
  password?: string;
};

export type LoginResponse = { access_token: string };