import styles from "./Card.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ darkMode }) => {
  const [dentista, setDentista] = useState([]);

  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const response = await axios.get(
          "https://dhodonto.ctdprojetointegrador.com/dentista"
        );
        const data = response.data;
        setDentista(data);
      } catch (error) {
        console.log(error);
        console.log("Lista de dentista vazia!");
      }
    };
    fetchDentistas();
  }, []);

  return (
    <>
      {dentista.map((dentistas) => (
        <div
          key={dentistas.matricula}
          className={`card ${darkMode ? styles.dark : styles.light}`}
        >
          <img
            className="card-img-top"
            src="/images/doctor.jpg"
            alt="doctor placeholder"
          />
          <div className={`card-body ${styles.CardBody}`}>
            <a href={`/dentista/${dentistas.matricula}`}>
              <h5
                className={`card-title ${styles.title} ${
                  darkMode ? styles.darkText : styles.lightText
                }`}
              >
                {dentistas.nome} {dentistas.sobrenome}
              </h5>
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
