import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "./Card.module.css";
import { ThemeContext } from "../Context/ThemeContext";

const Card = () => {
  const { darkMode } = useContext(ThemeContext);
  const [dentistas, setDentistas] = useState([]);

  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const response = await axios.get(
          "https://dhodonto.ctdprojetointegrador.com/dentista"
        );
        const data = response.data;
        setDentistas(data);
      } catch (error) {
        console.log(error);
        console.log("Lista de dentistas vazia!");
      }
    };

    fetchDentistas();
  }, []);

  return (
    <>
      {dentistas.map((dentista) => (
        <div key={dentista.matricula} className={`card ${darkMode ? styles.cardDark : ""}`}>
          <img
            className="card-img-top"
            src="/images/doctor.jpg"
            alt="doctor placeholder"
          />
          <div className={`card-body ${darkMode ? styles.cardDark : ""}`}>
            <a href={`/dentista/${dentista.matricula}`}>
              <h5 className={`card-title ${styles.title}`}>
                {dentista.nome} {dentista.sobrenome}
              </h5>
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
