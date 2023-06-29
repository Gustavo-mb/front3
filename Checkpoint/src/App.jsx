import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
      
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div>
          <Outlet />
          <Footer />
        </div>
     
      </div>
    </>
  );
};

export default App;
