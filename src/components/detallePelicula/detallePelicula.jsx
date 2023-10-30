import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./detallePelicula.scss";
import infoVideos from "../../service/traerVideos/TraerVideos";
import ReactPlayer from "react-player";
import { traerFunciones } from "../../service/traerBack/traerBack";
import SeleccionBoletos from "../seleccionBoletos/seleccionBoletos";
import { traerFuncion, traerSala } from "../../service/traerFuncionSala/traerFuncionSala";


function DetallePelicula() {
  const [info, setInfo] = useState({});
  const location = useLocation();
  const [video, setVideo] = useState({});
  const { pelicula } = useParams();

  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (location.state.title) {
      setInfo(location.state);
    }
  }, []);


  //Video
  const [media, setmedia] = useState([]);
  const [posicion, setposicion] = useState([]);
  const [generos, setgeneros] = useState("");
  const [tiempo, settiempo] = useState("");
  const [edpoint, setedpoint] =
    useState(""); 

  useEffect(() => {
    multimedia();
  }, []);

 
  const idPelicula = JSON.parse(localStorage.getItem("peliculaClick")).id
  localStorage.setItem("idPelicula", idPelicula)


  const idFuncion = async (idPelicula) =>{
    const codigoFuncion = await traerFuncion(idPelicula)
    const funcionId = codigoFuncion[0].id
    return funcionId
  }
  
 idFuncion(idPelicula).then((respuesta)=>{

  const idFuncion = respuesta; 
  const teatro = localStorage.getItem("teatro");
  console.log(idFuncion)
  console.log(teatro)

  traerSala(idFuncion, teatro)

 })
.catch((error)=>{
  console.log(error)
})




  const nombre = "Trailer";
  const idNumero = posicion.findIndex((element) => element.type == nombre);
 
  const multimedia = async () => {
    const data = await infoVideos(idPelicula);
    const key = data.videos.results[1].key;
    // const key2 = key.key
    const genero = data.genres[0].name;
    const duracion = data.runtime;
    const numero = data.videos.results;
    setmedia(key);
    setgeneros(genero);
    settiempo(duracion);
    setposicion(numero);
  };

  const fecha = localStorage.getItem("fecha")
  const ubicacion = localStorage.getItem("teatro")

  const navigate = useNavigate()

  const clickSeleccionarBoleto = () => {
    navigate("/seleccionBoleto");
  }

  const [funcion, setfuncion] = useState([])
  useEffect(()=>{
    traerDataFuncion()
  }, [])
  
  
  const traerDataFuncion = async () =>{
    const funciones = await traerFunciones()
    
    for (const element of funciones) {
      const hora = element.programacion.horaPrimeraFuncion;
      setfuncion(hora)
      return hora
    }
  }
  
  const horas = [];
  for (let i = funcion; i <= 21; i += 2) {
    horas.push(i)
  }

  const clickHora = ({target}) => {
    const {value} = target;
    localStorage.setItem("hora", value)

    const stateButton = document.querySelectorAll(".btn-horas")
    stateButton.forEach((item)=>{
      item.classList.add("noActiveButton")
    })
    target.classList.remove("noActiveButton")
    target.classList.add("activeButton")

  }
 

  return (
    <section>
      <>
        <div className="detalles">
          <div className="detalles__pelicula">
            <figure>
              <img src={URL_IMAGE + info.poster_path} alt="img_pelicula" />
            </figure>

            <article>
              <h3 className="info__titulo">{info.title}</h3>
              <span>{info.original_title}</span>
              <div className="info__pelicula">
                <span className="span__infoB">B</span>
                <span className="span__infoDuracion">{`${tiempo} Minutos`}</span>
                <span className="span__infoGenero">{`${generos}`}</span>
              </div>
            </article>
          </div>

          <div className="detalles__funcion">
            <h4 className="detalles__funcion__titulo">
              Horarios disponibles - {`${fecha}`}
            </h4>
            <span>Elije el horario que prefieras</span>
            <span className="centro__comercial">{`${ubicacion}`}</span>
         
            
            <div className="div__horas">
              {
                horas.map((hora, index)=>(
                <button onClick={(e) => { clickHora(e); 
                  // getStyle(e.target)
                } 
                } 
                  value={`${hora}:00`} key={index} className="btn-horas noActiveButton">{`${hora}:00`}</button>
                )) 
              }
            </div>
            
 
            <button onClick={() => {
              clickSeleccionarBoleto()
            }} className="boleto">Seleccionar boletos</button>
          </div>
        </div>

        <div className="trailer">
          <span>Trailer</span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${media}`}
            width="38%"
            height="280px"
            controls
            playing
          />
        </div>

        <div className="sinopsis">
          <span className="sinopsis__titulo">Sinopsis</span>
          <p className="sinopsis__parrafo">{info.overview}</p>
        </div>
      </>
    </section>
  );
}

export default DetallePelicula;
