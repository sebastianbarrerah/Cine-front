import React, { useContext, useEffect, useState } from "react";
import { traerPeliculas } from "../../service/traerPeliculas/traerPeliculas";
import "./card.scss";
import { useNavigate, useParams } from "react-router-dom";
import { addMovieLocalStorage } from "../../utils/localStorage";
import { AppContext } from "../../router/router";


const Card = () => {
//   const [generos, setGeneros] = useState("");
//   const [tiempo, setTiempo] = useState("");

  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const [data, setData] = useState([]);
  const {dataId} = useParams() 
  


  const traerData = async (gender) => {
    const arrayGender = []; 
    const data = await traerPeliculas();
    
    // console.log(typeof(gender))
  
    if (gender === undefined) {
        setData(data);

    }
    else if (typeof(gender) === "string"){

        data.forEach((item)=>{
     
            if (item.genre_ids.includes(Number(gender))) {
                arrayGender.push(item)
            }
        })
        // console.log(arrayGender)
        setData(arrayGender);

    }

  }

  useEffect(() => {
      traerData(dataId);
  }, [dataId]);

  const navigate = useNavigate();

  const clickPelicula = (pelicula) => {
    addMovieLocalStorage(pelicula);
    navigate(`pelicula/${pelicula.title}`, { state: pelicula })
  };

  const genders = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

 const getGender = (arrayNumber) =>{
    const arrayAux = []
    arrayNumber.forEach(element => {
        arrayAux.push((genders[element]+' '))
        
    });
    return arrayAux
 }


  return (
    <>
      <h1>En cartelera</h1>
      <section className="container__main">
        {data.map((pelicula, index) => (
          <div
            key={index}
            className="container__div"
            onClick={() => {
              clickPelicula(pelicula);
            }}
          >
            <img
              src={URL_IMAGE + pelicula.poster_path}
              alt=""
              className="imagen__pelicula"
            />
            <div className="div__responsive">
            <br />
            <h3>{pelicula.title}</h3>
            <br />
            <p>{"Titulo en ingles:  " + pelicula.original_title}</p>
            <p>{"Estreno:  " + pelicula.release_date}</p>

            <p>Genero:
            {
               getGender(pelicula.genre_ids)
            }
            </p>
            <span className="container__publico">Para todo publico</span>

            </div>
            
            
    
          </div>
        ))}

      </section>
    </>
  );
};

export default Card;




// // {pelicula.genre_ids[0] === 28 ? 'Action' : 28}