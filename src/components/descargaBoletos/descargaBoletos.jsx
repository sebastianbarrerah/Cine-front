import React from "react";
import './descargaBoletos.scss'
import { Link, useNavigate } from "react-router-dom";

function DescargaBoletos() {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const { title } = JSON.parse(localStorage.getItem("peliculaClick"));
  const { poster_path } = JSON.parse(localStorage.getItem("peliculaClick"));

  const fecha = localStorage.getItem("fecha");
  const hora = localStorage.getItem("hora");
  const teatro = localStorage.getItem("teatro");
  const sala = Number(localStorage.getItem("idSala"));
  const asientos = JSON.parse(localStorage.getItem("asientos")) || [];
  const asientosComa = asientos.join(",");

  const navigate = useNavigate();

  const clickHome = () => {
    localStorage.clear();
    navigate("/");

  };

  return (
     <>
    <section className="page__boletos">
  
      <div className="boletos">
       <button className="btn__backHome" onClick={clickHome}> ← Home</button>

      <div className="boletos__inicio">
        <h2 className="boletos__titulo">Boletos</h2>
        <article className="boletos__horafecha">
          <span className="boletos__fecha" >{fecha}</span>
          <span className="boletos__hora">{hora}</span>
        </article>
      </div>

      <div className="boletos__principal">
        <figure className="boletos__figure">
          <img className="boletos__img" src={URL_IMAGE+poster_path} alt="" />
        </figure>
        <article className="boletos__datos">
          <span>Pelicula: {title}</span>
          <span>Ubiación: {teatro}</span>
          <span>Asientos: {asientosComa}</span>
          <span>Sala: {sala}</span>
        </article>
      </div>

      <figure className="boletos__qr">
        <img className="boletos__qrImg" src="https://media.istockphoto.com/id/828088276/es/vector/c%C3%B3digo-qr-ilustraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=WaiK400NIuEZRzYHXXSy5_nIoYMCKUr-rc38_qnEYys=" alt="" />
      </figure>

    </div>

    </section>
    </>
    
  );
}

export default DescargaBoletos;
