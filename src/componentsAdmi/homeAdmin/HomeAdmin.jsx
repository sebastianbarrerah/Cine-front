import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { traerPeliculas } from '../../service/traerPeliculas/traerPeliculas';
import './HomeAdmin.scss'
import logoCineco from '../../assets/logo_cineco.svg'
import { addMovieLocalStorage } from '../../utils/localStorage';

const HomeAdmin = () => {
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
    const [data, setData] = useState([]);

    useEffect(() => {
        traerData();
    }, []);
    
    const traerData = async () => {
        const data = await traerPeliculas();
        setData(data);
    }

    const navigate = useNavigate()

    const clickPelicula = (pelicula) => {
        addMovieLocalStorage(pelicula)
        navigate(":pelicula")      
        
    }
  
    const inicio = () => {
      navigate("/")
    }

  return (
    <>
         <header className='header1'>
            <figure className='header__figure1'>
            <img className='header__img1' src={logoCineco} alt="logo" onClick={inicio} />
            </figure>

            <nav className='header__nav1'>
            <button className='header__nav__button1'>Acción</button>
            <button className='header__nav__button1'>Terror</button>
            <button className='header__nav__button1'>Ciencia ficción</button>
            <button className='header__nav__button1'>Comedia</button>
            </nav>

            <div className='div__perfil1'>
                <img src="https://img.freepik.com/foto-gratis/retrato-joven-mujer-rubia-piel-bronceada-ropa-moda_144627-47360.jpg?w=2000" alt="administrador" />
                <div className='div__perfil-dos1'>
                    <h2 className='perfil__titulo1'>Maria paulina</h2>
                    <span className='perfil__nombre1'>ver perfil</span>
                </div>
                
            </div>

            
            <span class="material-symbols-outlined">
                settings
            </span>    
           

        </header> 

        {  <h1 className='cartelera1'>En cartelera</h1> }

            { <section className='container__main1'>
                {
                    data.map((pelicula, index) => (
                        <div key={index} className='container__div1' onClick={() => {clickPelicula(pelicula) }}>
                            <img src={URL_IMAGE + pelicula.poster_path} alt="" className='imagen__pelicula1'/>
                            <br/>
                            <h3>{pelicula.title}</h3>
                            <br/>
                            <p>{"Titulo en ingles:  " + pelicula.original_title}</p>
                            <p>{"Estreno:  " + pelicula.release_date}</p>
                            <p>{"Genero:  " + pelicula.title}</p>
            
                        </div>
                    ))
                }
            </section> }
    </>
  )
}

export default HomeAdmin