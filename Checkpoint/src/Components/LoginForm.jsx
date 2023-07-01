import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useApi from "../Hooks/useApi";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";


const LoginForm = () => {
  const { darkMode } = useContext(ThemeContext);
  /// Estado dos campos de input do formulário
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });


  const { data, isLoading, error, shouldFetch } = useApi();
  /// Hook utilizado para fazer a navegação entre rotas
  const navigate = useNavigate();
  // Acessa a função de login dentro do AuthContext
  const { login: handleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (data && !error) {
      /// Guardamos o token JWT no Storage
      localStorage.setItem("tokenJwt", data.token);
      // Atualiza o estado da constante local login, usando a função login dentro do AuthContext
      handleLogin();
      /// Redirecionamos o usuário para a Home
      navigate("/home");
    }
  }, [data, error, handleLogin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await shouldFetch("auth", login);
  };

  return (
    <main>
      <div className={`text-center card container ${styles.card} ${styles.Container} ${darkMode ? styles.cardDark : ""}`}>
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              type="password"
              required
            />

            <p> {isLoading ? "Carregando..." : ""}</p>

            <p> {error ? error.message : ""}</p>

            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
