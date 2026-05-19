import { createContext, useContext } from "react";

export const ToDoContext = createContext();

export const useTodo = () => {
  const context = useContext(ToDoContext);
  if (!context) throw new Error("Забыли обернуть в ToDoProvider!");
  return context;
};