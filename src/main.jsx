import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App.jsx";
import { ToDoProvider } from "./todo/context/ToDoProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/ToDo-List-API">
    <QueryClientProvider client={queryClient}>
      <ToDoProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false}/>
      </ToDoProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
