import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
    // Adicione a mensagem de login bem-sucedido aqui
    alert("Login realizado com sucesso!");
  };

  const logout = () => {
    setLoggedIn(false);
    // Remova o token JWT do Armazenamento local do navegador
    localStorage.removeItem("tokenJwt");
    // Adicione a mensagem de logout bem-sucedido aqui
    alert("Usuário saiu com sucesso!");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };