export type Filter = "all" | "active" | "completed";

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
  message?: string;
  statusCode?: number;
}
