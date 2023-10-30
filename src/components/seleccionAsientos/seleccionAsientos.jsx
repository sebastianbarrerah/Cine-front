import React, { useEffect, useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";
import { traerTiquetesComprados } from "../../service/traerTiquetesComprados/traerTiquetesComprados";
import { useNavigate } from "react-router-dom";
import './seleccionAsientos.scss'


function SeleccionAsientos() {
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
  

  const navigate = useNavigate();

  const clickTotalPagar = () => {
    navigate("/compraBoletos");
  };

  const [seleccionSilla, setSeleccionSilla] = useState([]);
  const [estadoSilla, setEstadoSilla] = useState([])

// console.log(traerTiquetesComprados)

  const asientosOcupados = traerTiquetesComprados.filter(
    (item) =>{ return item.date === fecha && item.hour === hora && item.idCinema === teatro && item.idSala === sala
    }
  );
  // console.log(asientosOcupados);

  const filas = 9;
  const columnas = 16;


  const getColor = (target, asiento) => {
    console.log(target.parentNode.parentNode)
    const divSillas = target.parentNode.parentNode; 

    if(divSillas.classList.contains("onChecked")){
      target.parentNode.style.color = 'yellow';
      divSillas.classList.add("Checked")
      divSillas.classList.remove("onChecked")
    }
    else if(divSillas.classList.contains("Checked")){
      target.parentNode.style.color = 'blue';
      divSillas.classList.add("onChecked")
      divSillas.classList.remove("Checked")
    }

    // console.log(target.parentNode.parentNode)
    // target.parentNode.style.color = 'yellow';
    // console.log(target.parentNode)

    
    const arrayAsientos = localStorage.getItem("asientos")
    let asientosSeleccionados = []; 

    if (arrayAsientos === null) {
      asientosSeleccionados.push(asiento)
      const nuevoArray = JSON.stringify(asientosSeleccionados)
      localStorage.setItem("asientos", nuevoArray)
    }
    else {
     asientosSeleccionados = JSON.parse(arrayAsientos);
     asientosSeleccionados.push(asiento)
    const nuevoArray = JSON.stringify(asientosSeleccionados)
    localStorage.setItem("asientos", nuevoArray)
      
    }
    // console.log(asiento)
  }

  const generarAsientos = () => {
    const asientos = [];

    for (let index = 0; index < filas; index++) {
      const arrayFilas = [];
      for (let position = 0; position < columnas; position++) {
        const codeSeat = `${String.fromCharCode(65 + index)}${position + 1}`;

        // Verificar si el asiento está ocupado o seleccionado
        const ocupado = asientosOcupados.some((item) => item.codeSeat === codeSeat);

        // const seleccionado = seleccionSilla.some(
        //   (item) => item.codeSeat === codeSeat);

        // Añadir el icono de ChairIcon y el botón del asiento en un contenedor
        arrayFilas.push(
          <div data-key={codeSeat} style={{ display: "flex", alignItems: "center" }} className="onChecked" onClick={ ocupado? null : (e) => {getColor(e.target, codeSeat)}}>
            <ChairIcon
              fontSize="large"
              sx={{
                color: ocupado ? "red" : "blue",
                cursor: "pointer",
                marginRight: "10px", 
                width: "25px", 
                height: '25px'
              }}
            />

            {/* <button style={{ width: '20px', height: '20px', margin: '5px' }}>
               {codeSeat}
           </button> */}
          </div>
        );
      }

      // Añadir el arrayFilas al array de asientos
      asientos.push(
        <div key={index} style={{ display: "flex" }}>
          {arrayFilas}
        </div>
      );
    }


    return asientos;
  };

 const hadleAsiento = () => {
  
    const asientosLocal = JSON.parse(localStorage.getItem("asientos")) || []
    const asientosComa = asientosLocal.join(',');
    setEstadoSilla(asientosComa)
 }

  return (
    <section className="seleccionAsientos">

      <div className="asientos">
        <h1 className="asientos__h1">Selecciona tus asientos</h1>
        <h5 className="asientos__h5">Para cambiar tu lugar asignado da click en el asiento deseado.</h5>
        <div className="asientos__sillas">
        <div className="asientos__sillasColores">
          <ChairIcon sx={{ color: "yellow"}} fontSize="large" />
          <span>Seleccion</span>
        </div>

        <div className="asientos__sillasColores">
          <ChairIcon sx={{ color: "red" }} fontSize="large" />
          <span>Ocupado</span>
        </div>

        <div className="asientos__sillasColores">
          <ChairIcon sx={{ color: "blue" }} fontSize="large" />
          <span>Disponible</span>
        </div>
        </div>

        <br />
        <hr />

        <div className="div__sillasGeneradas"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} onClick={hadleAsiento}
        >
          {generarAsientos()}
        </div>

        <div className="asientos__pantalla">
          <span>Pantalla</span>
        </div>
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

              <span>Asientos: {estadoSilla}</span>
            </div>
          </article>
          <span className="compra__span">
            Se realiza un cargo por servicio por cada boleto dentro de la orden
          </span>
          <div className="compra__divTotal">
            <span className="compra__total">Total(IVA incluido)</span>
            <span className="compra__valor">${total}</span>
          </div>
          <button onClick={clickTotalPagar} className="compra__boton">
            Continuar
          </button>
        </div>
    </section>
  );
}

export default SeleccionAsientos;

