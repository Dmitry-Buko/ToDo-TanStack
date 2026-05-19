import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLogin from "../components/InputLogin";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess("");
    
    try {
      const response = await axios.post(
        "https://todo-redev.herokuapp.com/api/users/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      setTimeout(() => {
        navigate("/login", {
          state: {
            email: formData.email,
            password: formData.password,
          },
        });
      }, 2000);

      setSuccess("Аккаунт создан. Заходим!");
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message;
      if (errorMessage) setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Регистрация</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
            {/*Логин */}
          <div className="form-group">
            <label>Логин</label>
            <InputLogin
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Придумайте логин"
              required
            />
          </div>

            {/*E-mail */}
          <div className="form-group">
            <label>E-mail</label>
            <InputLogin
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите e-mail"
              required
            />
          </div>

            {/*Пароль */}
          <div className="form-group">
            <label>Пароль</label>
            <InputLogin
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Придумайте пароль"
              required
            />
          </div>

            {/*Gender */}
          <div className="form-group">
            <label>Пол</label>
            <InputLogin
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Ваш гендер"
              required
            />
          </div>

            {/*Возраст */}
          <div className="form-group">
            <label>Возраст</label>
            <InputLogin
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ваш возраст"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="form-group__btn-enter">
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="switch-link">
          Уже есть аккаунт? <Link to="/login" className="switch-link__login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
