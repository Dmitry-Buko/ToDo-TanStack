import axios, { AxiosError } from "axios";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputLogin from "../components/InputLogin";
import {
  CreateTaskErrorResponse,
  FormDataType,
  LocationState,
  LoginResponse,
} from "../../../types/types";

const Login = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [formData, setFormData] = useState<FormDataType>({
    email: state?.email || "",
    password: state?.password || "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataType;
    setFormData({ ...formData, [name]: e.target.value });
  };
  //SubmitEvent because FormEvent - deprecated
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const url = "https://todo-redev.onrender.com/api/auth/login";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post<LoginResponse>(url, formData, config);
      const token = response.data?.access_token;
      if (token) {
        localStorage.setItem("token", token);
        setSuccess("Вход успешно выполнен!");
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/todo");
        }, 1500);
      } else {
        setError("Токен не получен!");
      }
    } catch (error) {
      const err = error as AxiosError<
        CreateTaskErrorResponse & { message?: string }
      >;
      const errorMessage =
        err?.response?.data?.errors?.[0]?.msg || err?.response?.data?.message;
      if (errorMessage) setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Вход в ToDo</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            <label>Логин</label>
            <InputLogin
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите логин"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <InputLogin
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-group__btn-enter"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="switch-link">
          Нет аккаунта?
          <Link to="/register" className="switch-link__login">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
