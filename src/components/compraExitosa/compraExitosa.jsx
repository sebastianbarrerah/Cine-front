import React from "react";
import icono from './imagenes/iconoCheck.png'
import './compraExitosa.scss'
import { useNavigate } from "react-router-dom";
import NumeroSeguro from "./numeroTarjeta";

function CompraExitosa() {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const { title } = JSON.parse(localStorage.getItem("peliculaClick"));
  const { poster_path } = JSON.parse(localStorage.getItem("peliculaClick"));

  const ubicacion = localStorage.getItem("teatro");
  const fecha = localStorage.getItem("fecha");
  const hora = localStorage.getItem("hora");
  const total = localStorage.getItem("totalPagar");
  const teatro = localStorage.getItem("teatro");
  const idPelicula = localStorage.getItem("idPelicula");
  const sala = Number(localStorage.getItem("idSala"))
  const asientos = JSON.parse(localStorage.getItem("asientos")) || []
  const asientosComa = asientos.join(',');
  const tarjeta = localStorage.getItem("tarjeta")

  const navigate = useNavigate();

  const clickTotalPagar = () => {
    navigate("/descargaBoletos");
  };

  return (
    <section className="page__compraExitosa">
      <div className="compra__exitosa">
        <img  className="compra__exitosa__icono" src={icono} alt="iconoCheck" />
        <span className="compra__exitosa__titulo">¡Transacción exitosa!</span>
      </div>

      <div className="info__titulo">
        <h2 className="info__titulo__principal">Información de compra</h2>
        <span className="info__titulo__facturacion">Facturación</span>
      </div>

      <div className="info__compra">
        <article className="info__compra__article">
          <span className="info__compra__span" >Código</span>
          <span className="info__compra__dato">#238920483</span>
        </article>

        <article className="info__compra__article">
          <span className="info__compra__span" >Fecha</span>
          <span className="info__compra__dato">{fecha}</span>
        </article>

        <article className="info__compra__article">
          <span className="info__compra__span" >Total</span>
          <span className="info__compra__dato">${total}</span>
        </article>

        <article className="info__compra__article">
          <span className="info__compra__span" >Método de pago</span>
          <div className="info__compra__divPago">
            <img className="info__compra__tarjeta" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="" />
            <span>Master Card - </span>
            <NumeroSeguro numeroLargo={tarjeta} />
          </div>
        </article>

      </div>


      <div className="compraFinal">
          <h3 className="compraFinal__titulo">Resumen de la compra</h3>
          <article className="compraFinal__article">
            <figure className="compraFinal__figure">
              <img
                className="compraFinal__img"
                src={URL_IMAGE + poster_path}
                alt="img"
              />
            </figure>
            <div className="compraFinal__funcion">
              <span>Pelicula: {title}</span>

              <span>Ubicación: {ubicacion}</span>

              <span>Fecha: {fecha}</span>

              <span>Función: {hora}</span>

              <span>Sala: {sala}</span>

              <span>Asientos: {asientosComa}</span>
            </div>
          </article>
          <span className="compraFinal__span">
            Se realiza un cargo por servicio por cada boleto dentro de la orden
          </span>
          <div className="compraFinal__boletosDiv2">
            <span className="compraFinal__total">Total(IVA incluido)</span>
            <span className="compraFinal__valor">${total}</span>
          </div>

          <button onClick={clickTotalPagar} className="compraFinal__boton">
            Descargar boletos
          </button>
         
        </div>



    </section>
  );
}

export default CompraExitosa;
