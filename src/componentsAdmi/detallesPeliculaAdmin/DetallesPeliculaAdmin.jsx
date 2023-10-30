import React, { useEffect, useState } from 'react'


import logoCineco from '../../assets/logo_cineco.svg'
import './DetallesPeliculaAdmin.scss'
import { totalDatos } from './dataDetalles';
import infoVideos from '../../service/traerVideos/TraerVideos';
import { traerFunciones, traerTeatros } from '../../service/traerBack/traerBack';
import Datapicker from '../datapicker/Datapicker';
import { Navigate, useNavigate } from 'react-router-dom';



const DetallesPeliculaAdmin = () => {

  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
  const pelicula = JSON.parse(localStorage.getItem('peliculaClick'));

  const [data, setData] = useState({});
  const [datos, setDatos] = useState({});
  const [generos, setGeneros] = useState("");
  const [pais, setPais] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const [funcion, setFuncion] = useState([]);
  const [teatro, setTeatro] = useState([])
  const [horarios, setHorarios] = useState([])
  const [horariosFunciones, setHorariosFunciones] = useState([])


  const traerData = async () => {
    const data = await totalDatos(pelicula.id);
    setData(data);
  }
  const traerDatos = async () => {
    const data = await infoVideos(pelicula.id);
    setDatos(data);
    const genero = data.genres[0].name;
    setGeneros(genero)
    const origenPais = data.production_countries
    [0].name;
    setPais(origenPais)
    const idioma = data.spoken_languages
    [0].name;
    setLenguaje(idioma)
  }

  useEffect(() => {
    traerData();
    traerDatos()
    traerDataFuncion()
    traerDataTeatro()
  }, []);


  const traerDataFuncion = async () => {
    const funciones = await traerFunciones();
    const fechas = [];
    const horas = [];
    
    for (const element of funciones) {
      fechas.push(element.programacion.date);
      horas.push(element.programacion.horaPrimeraFuncion);
    }
    
    setFuncion(fechas);
    setHorarios(horas);
    setHorariosFunciones([...horas]); // Inicializar horariosFunciones con todas las horas
    
    const nuevasHoras = [];
    for (let i = horas[0]; i <= 21; i += 2) {
    
      nuevasHoras.push(i);
    }
    
    setHorariosFunciones(nuevasHoras);
    
  }
 
  const traerDataTeatro = async () => {
    const dataBack = await traerTeatros()
    setTeatro(dataBack)
    return dataBack
  }
  
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const toggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  const handleEliminarClick = (momentoIndex) => {
    const nuevasHoras = horariosFunciones.filter((_, index) => index !== momentoIndex);
    setHorariosFunciones(nuevasHoras);
    console.log(funcion, "funcion");
  };

  const handleAgregarClick = () => {
    if (horariosFunciones.length > 0) {
      const ultimoValor = parseInt(horariosFunciones[horariosFunciones.length - 1], 10);
      const nuevoValor = ultimoValor + 2;
      const nuevosHorariosFunciones = [...horariosFunciones, nuevoValor.toString()];
      setHorariosFunciones(nuevosHorariosFunciones);
    } else {
      // Si el array de horariosFunciones está vacío, empieza desde 22
      const nuevoValor = 22;
      const nuevosHorariosFunciones = [...horariosFunciones, nuevoValor.toString()];
      setHorariosFunciones(nuevosHorariosFunciones);
    }
  };

  const [horaEditada, setHoraEditada] = useState("");
  const handleEditarClick = (salaIndex, momentoIndex) => {
    const horaActual = horariosFunciones[momentoIndex];
    setHoraEditada(horaActual);
  };

  const handleGuardarClick = (salaIndex, momentoIndex) => {
    if (horaEditada !== "") {
      const nuevasHoras = [...horariosFunciones];
      nuevasHoras[momentoIndex] = horaEditada;
      setHorariosFunciones(nuevasHoras);
      setHoraEditada(""); // Limpiar el estado de la hora editada
    }
  };
  const navigate = useNavigate();
  
  const inicio = () => {
    navigate("/")
  }

  return (

    <>
      <header className='header2'>

        <figure className='header__figure2'>
          <img className='header__img2' src={logoCineco} alt="logo" onClick={inicio}/>
        </figure>

        <div className='div__perfil2'>
          <img src="https://img.freepik.com/foto-gratis/retrato-joven-mujer-rubia-piel-bronceada-ropa-moda_144627-47360.jpg?w=2000" alt="administrador" />
          <div className='div__perfil-dos2'>
            <h2 className='perfil__titulo2'>Maria paulina</h2>
            <span className='perfil__nombre2'>Ver perfil</span>
          </div>

        </div>

        <span class="material-symbols-outlined">
          settings
        </span>

      </header>


      <div className='div__peliculas'>
        <figure className='figure__img'>
          <img src={URL_IMAGE + pelicula.poster_path} alt="Portada pelicula" className='imagen1' />

          <img src={URL_IMAGE + pelicula.poster_path} alt="video" className='imagen2' />
        </figure>
        <div className="informacion">
          <h1>{pelicula.title}</h1>
          <span> {data.original_title}</span>
          <span> Estreno: {datos.release_date}</span>
          <span> genero: {generos} </span>
          <div className='infomacion__extra'>
            <span> recomendado para mayores de edad</span>
            <span>{data.runtime}</span>
          </div>
        </div>
      </div>


      <div className='descripcion'>
        <p className="parrafo__descripcion">{pelicula.overview}</p>
        <h4>Titulo Original</h4>
        <span>{data.title}</span>
        <h4>Pais de origen</h4>
        <span> {pais} </span>
        <h4>Director</h4>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, voluptate?</span>
        <h4>Actores</h4>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.</span>
        <h4>Lenguaje</h4>
        <span>{lenguaje}</span>
      </div>

      <div className='tiempo__lugar'>

        <h4>AGO</h4>

        <div className='container__tiempo'>

                <span className='tiempo'>
                  8 de agosto
                </span>
                <span className='tiempo'>
                  9 de agosto
                </span>
                <span className='tiempo'>
                  10 de agosto
                </span>
                
          <span className='tiempo'>
            <span class="material-symbols-outlined">
              calendar_month
              <Datapicker />
            </span>
          </span>
        </div>

        <div className='container__lugar'>
          <div className='separador'>
            <h3>FUNCIONES MULTIPLEX</h3>
            <button className='nueva__multiplex'  onClick={handleAgregarClick}>Nuevo multiplex +</button>
          </div>
          {
            teatro.map((element, index) => (
              <div className='item'>
                <div className='separador' key={index}>
                  <p>{element.name}</p>
                  <span className="material-symbols-outlined" onClick={() => toggle(index)}>
                    {expandedIndex === index ? "expand_less" : "expand_more" }
                  </span>
                </div>
                <hr />
                <div className={`info__seleccion ${expandedIndex === index ? 'visible' : 'oculto'}`}>
                  {
                    element.salas.map((salas, salaIndex) => (
                      <>
                        <h3 className='salas' key={salaIndex}>sala: {salas.idFuncion}  <span class="material-symbols-outlined">
                          add_circle
                        </span>
                          <span class="material-symbols-outlined">
                            cancel
                          </span>
                        </h3>
                        {horariosFunciones.map((momento, momentoIndex) => (
                          <button className='hora__funcion' key={momentoIndex}>{momento}:00 pm
                            <div className='container__iconos'>
                            <span
                                className="material-symbols-outlined mostrar borrar"
                                onClick={() => handleEliminarClick(index, salaIndex, momentoIndex)}
                              >
                                cancel
                              </span>
                              <span class="material-symbols-outlined mostrar editar" onClick={() => handleGuardarClick(salaIndex, momentoIndex)}
                              >
                              <input
                                  type="text"
                                  value={horaEditada}
                                  onChange={(e) => setHoraEditada(e.target.value)}
                                  className="hora__input"
                                  placeholder='15'
                                />
                                add_circle
                              </span>

                            </div>
                          </button>
                        ))}
                      </>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default DetallesPeliculaAdmin