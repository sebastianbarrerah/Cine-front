import React, { useEffect, useState } from "react";
import "./header.scss";
import {
  traerFunciones,
  traerTeatros,
} from "../../service/traerBack/traerBack.js";
import { useNavigate } from "react-router-dom";
import LoginAdmi from "../loginAdmi/loginAdmi";
import { useContext } from "react";
import { AppContext } from "../../router/router";

const Header = () => {
  const [teatro, setTeatro] = useState([]);
  const [funcion, setfuncion] = useState([]);
  const [value, setvalue] = useState({});
  const [valueFecha, setValueFecha] = useState({});
  const [modal, setModal] = useState(false);

  
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    traerDataTeatro();
    traerDataFuncion();
  }, []);

  const traerDataTeatro = async () => {
    const dataBack = await traerTeatros();
    setTeatro(dataBack);
    return dataBack;
  };

  const traerDataFuncion = async () => {
    const funciones = await traerFunciones();
    for (const element of funciones) {
      const fechas = element.programacion.date;
      setfuncion(fechas);
      return fechas;
    }
  };

  const teatroClick = (event) => {
    const { value } = event.target;
    setvalue(value);
    localStorage.setItem("teatro", value);
  };

  const fechaClick = (event) => {
    const { value } = event.target;
    setValueFecha(value);
    localStorage.setItem("fecha", value);
  };

  const dataUbicacion = teatro.find((item) => item.name === value);

  const navigate = useNavigate();

  const handleAdmi = () => {
    navigate("/loginAdministrador");
  };

  const clickBtn = (dataId) => {
    navigate(`/${dataId}`);
  };

  return (
    <header className="header">

      <div className="menu__div">
        <span className="material-symbols-outlined menu">menu</span>
        </div>
        
      <figure className="header__figure">
        <img
          className="header__img"
          src="https://seeklogo.com/images/C/cine-colombia-logo-1C443A07F5-seeklogo.com.png"
          alt="logo"
        />
      </figure>

      <nav className="header__nav">
        <button
          className="header__nav__button"
          onClick={() => {
            clickBtn(28);
          }}
        >
          Acción
        </button>
        <button
          className="header__nav__button"
          onClick={() => {
            clickBtn(27);
          }}
        >
          Terror
        </button>
        <button
          className="header__nav__button"
          onClick={() => {
            clickBtn(878);
          }}
        >
          Ciencia ficción
        </button>
        <button
          className="header__nav__button"
          onClick={() => {
            clickBtn(35);
          }}
        >
          Comedia
        </button>
      </nav>

      <formulario className="header__form">
        <div className="header__form__select">
          <label htmlFor="ubicacion" className="label">
            Cines cercanos
          </label>
          <select
            onChange={teatroClick}
            value={value}
            name="Seleccione la sala de cine"
            id="ubiacion"
            className="select"
          >
            <option className="valores">Seleccione el teatro</option>
            {teatro.map((teatro, index) => (
              <option key={index} className="valores">
                {teatro.name}
              </option>
            ))}
          </select>
        </div>

        <div className="header__form__select">
          <label htmlFor="fecha" className="label">
            Fecha
          </label>
          <select
            onChange={fechaClick}
            value={valueFecha}
            id="fecha"
            className="select"
          >
            <option className="valores">Seleccione la fecha</option>
            {dataUbicacion
              ? funcion.map((fecha, index) => (
                  <option key={index} className="valores">
                    {fecha.dia}
                    {console.log(fecha.dia)}
                  </option>
                ))
              : console.log("Seleccione ubicación y fecha")}
          </select>
        </div>
      </formulario>

      <div>
        <button className="header__icono">
          <span className="material-symbols-outlined" onClick={openModal}>
            person
          </span>
        </button>
        <LoginAdmi isOpen={modal} onRequestCloset={closeModal} />
      </div>
    </header>
  );
};

export default Header;
