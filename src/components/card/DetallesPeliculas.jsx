import React from 'react'
import { traerPeliculas } from '../../service/traerPeliculas/traerPeliculas';

const DetallesPeliculas = () => {
        const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
        const [data, setData] = useState([]);
    
        useEffect(() => {
            traerData();
        }, []);
        
        const traerData = async () => {
            const data = await traerPeliculas();
            setData(data);
        }
  return (
    <div>
        <h1>detalles</h1>
         {/* {
                data.map((pelicula, index) => (
                    <div key={index} className='container__div'>
                        <img src={URL_IMAGE + pelicula.poster_path} alt="" className='imagen__pelicula'/>
                        <br/>
                        <h3>{pelicula.title}</h3>
                        <br/>
                        <p>{"Titulo en ingles:  " + pelicula.original_title}</p>
                        <p>{"Estreno:  " + pelicula.release_date}</p>
                        <p>{"Genero:  " + pelicula.title}</p>
                        
                    </div>
                ))
            } */}
    </div>
  )
}

export default DetallesPeliculas
