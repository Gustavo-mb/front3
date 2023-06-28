import styles from "./Card.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Card = () => {
  const [dentista, setDentista] = useState([]);

useEffect(()=>{
  const fetchDentistas = async () => {
    try {
      const response = await axios.get(
        "https://dhodonto.ctdprojetointegrador.com/dentista" 
      );
      const data = response.data;
      setDentista(data);
    } catch (error) {
      console.log(error)
      console.log("Lista de dentista vazia!")
    }
  };
  fetchDentistas();
},[]);

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        
        {dentista.map((dentistas)=> (
      <div key={dentista.matricula} className={`card`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <a href={`/dentista/${dentistas.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{dentistas.nome} {dentistas.sobrenome}</h5>
          </a>
        </div>
      </div>
       ))}
    </>
  );
};

export default Card;