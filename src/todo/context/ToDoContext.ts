import { createContext, useContext } from "react";
import { IToDoContext } from "../../types/types";

export const ToDoContext = createContext<IToDoContext | null>(null);

export const useTodo = (): IToDoContext => {
  const context = useContext(ToDoContext);
  if (!context) throw new Error("Забыли обернуть в ToDoProvider!");
  return context;
};
