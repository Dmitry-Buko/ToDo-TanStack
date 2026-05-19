import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App.jsx";
import {ToDoProvider} from "./todo/context/ToDoProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/ToDo-List-API">
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </BrowserRouter>,
);
