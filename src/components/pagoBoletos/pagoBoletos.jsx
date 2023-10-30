import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './pagoBoletos.scss'
import { Navigate, useNavigate } from "react-router-dom";


function PagoBoletos() {

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

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
     navigate("/compraExitosa");
   
    const tarjeta = data.number
    localStorage.setItem("tarjeta", JSON.parse(tarjeta))

  };


  return (
    
    <section className="page">

      <div className="pago">
        <h2 className="pago__titulo">Información personal</h2>
        <span className="pago__span">Completa los datos del formulario para realizar el pago.</span>
        
        <form  className="form"onSubmit={handleSubmit(onSubmit)} >

          <div className="divForm">
          <div>
            <label className="form__datos">
              <span className="form__span">Correo electrónico</span>
              <input className="form__input" name="email" type="email" placeholder="Ingrese su correo electrónico"
                {...register("email", { required: true })}/>
            </label>
          </div>
          <div>
            <label className="form__datos">
              <span className="form__span">Nombre en la tarjeta</span>
              <input className="form__input" name="name" type="text" placeholder="Ingrese nombre en la tarjeta"
                {...register("name", { required: true })}/>
            </label>
          </div>
          
          <div>
            <label className="form__datos" >
              <span className="form__span">Numero de la tarjeta</span>
              <div className="numero__tarjeta">
              <input className="numero__tarjeta__tarjeta" name="number" type="text" placeholder="1234 1234 1234" 
                {...register("number", { required: true, minLength:12})} 
                />
               
             <img className="numero__tarjeta__visa"src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="visa" />

             <img className="numero__tarjeta__mastercard"src="https://www.mastercard.com/content/dam/public/mastercardcom/co/es/logos/mastercard-og-image.png" alt="visa" />

             <img className="numero__tarjeta__american"src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/800px-American_Express_logo_%282018%29.svg.png" alt="visa" />

              </div>
            {
              errors.number && <span className="span__errors">Se requiere 12 caracteres</span>
            }
           
            </label>
            
          </div>

          <div className="form__datosTarjeta">
            <label className="form__datos">
              <span className="form__span">Fecha de caducidad</span>
              <input className="form__input" name="date" type="date" placeholder="MM/YY"
                {...register("date", { required: true })}/>
            </label>

            <label className="form__datos">
              <span className="form__span">CVV</span>
              <input className="form__input" name="cvv" type="text" placeholder="Enter CVV"
                {...register("cvv", { required: true, minLength:3 })}/>
                 {
              errors.number && <span className="span__errors">Se requiere 3 caracteres</span>
            }
            </label>

          </div>

         

          {/* <input type="submit" /> */}

          </div>

          <div className="compra">
          <h3 className="compra__titulo">Resumen de la compra</h3>
          <article className="compra__article">
            <figure className="compra__figure">
              <img
                className="compra__img"
                src={URL_IMAGE + poster_path}
                alt="img"
              />
            </figure>
            <div className="compra__funcion">
              <span>Pelicula: {title}</span>

              <span>Ubicación: {ubicacion}</span>

              <span>Fecha: {fecha}</span>

              <span>Función: {hora}</span>

              <span>Sala: {sala}</span>

              <span>Asientos: {asientosComa}</span>
            </div>
          </article>
          <span className="compra__span">
            Se realiza un cargo por servicio por cada boleto dentro de la orden
          </span>
          <div className="compra__boletosDiv">
            <span className="compra__total">Total(IVA incluido)</span>
            <span className="compra__valor">${total}</span>
          </div>

          <button className="compra__boletosButton" type="submit">
            Pagar ahora
          </button>
         
        </div>

         
      

        </form>
      
      </div>

      
      
    </section>
  );
}

export default PagoBoletos;
