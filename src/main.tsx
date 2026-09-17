import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { ToDoProvider } from "./todo/context/ToDoProvider.tsx";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Не найден элемент #root");
}
createRoot(rootElement).render(
  <BrowserRouter basename="/ToDo-TanStack">
    <QueryClientProvider client={queryClient}>
      <ToDoProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </ToDoProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
