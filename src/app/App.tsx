import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../todo/components/Header";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "../features/auth/components/PrivateRoute";
const ToDo = lazy(() => import("../todo/components/ToDo"));
const Register = lazy(() => import("../features/auth/pages/Register"));

function App() {
  return (
    <div className="todo">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Register />
            </Suspense>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/todo"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <ToDo />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
