import React, { useEffect, useState } from "react";
import { dataAdmi } from "./dataAdmi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveSession } from "../../service/sessionService/sessionService";
import { useContext } from "react";
import { AppContext } from "../../router/router";
import Modal from "react-modal";
import "./loginAdmi.scss";

Modal.setAppElement("#root");

function LoginAdmi({ isOpen, onRequestCloset }) {
  const [admim, setAdmim] = useState(false);
  const arrayAdmi = dataAdmi;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const {
    user: { userDispatch },
  } = useContext(AppContext);

  const onSubmit = (data) => {
    const validarUsuario =
      (data.email === "mariapaulinap0531@gmail.com" &&
        data.password === "maria123" || data.nombre === "Maria paulina") ||
      (data.email === "sebas123@gmail.com" && data.password === "sebas123") 
    

    if (validarUsuario) {
      userDispatch({
        type: "login",
        payload: {
          isAutenticated: true,
          user: validarUsuario,
        },
      });
      saveSession(validarUsuario);
      setAdmim(true);
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/administrador");
    } else {
      console.log("no eres administrador");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestCloset={onRequestCloset} className="modal">
      <div className="loginAdmi">
        <div className="loginAdmi__botonDiv">
          <button className="loginAdmi__boton" onClick={onRequestCloset}>
            X
          </button>
        </div>

        <h1 className="loginAdmi__titulo">Bienvenido</h1>
        <span className="loginAdmi__span">Inicio Sesión</span>

        <form onSubmit={handleSubmit(onSubmit)} className="loginAdmi__form">
          <div>
            <label className="loginAdmi__label">
              <span className="loginAdmi__labelSpan">Email</span>
              <input className="loginAdmi__labelInput"
                name="email"
                type="email"
                placeholder="Escriba su correo"
                {...register("email", { required: true })}
              />
            </label>
          </div>
          <div>
            <label className="loginAdmi__label">
              <span className="loginAdmi__labelSpan">Contraseña</span>
              <input
              className="loginAdmi__labelInput"
                name="password"
                type="password"
                placeholder="Escriba su contraseña"
                {...register("password", { required: true })}
              />
            </label>
          </div>
          <button className="loginAdmi__btnIngresar" type="submit">Iniciar sesión</button>
        </form>
      </div>
    </Modal>
  );
}

export default LoginAdmi;