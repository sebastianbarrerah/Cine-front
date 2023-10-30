// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import { getMovie, getVideoMovie } from '../../services/getMovies';

// const DetailsMovie = () => {
//     const { idMovie } = useParams();
    
    
//     const [videoMovie, setVideoMovie] = useState("");
//     const [movieInfo, setMovieInfo] = useState({});
//     const urlBase = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
    
//     useEffect(() => {
//       getMovie(idMovie).then((response) => {
  
//         setMovieInfo({ ...response });
//       });

//       getVideoMovie(idMovie).then((response) => {
//         setVideoMovie(response.key);
//       });
//     }, [idMovie, setMovieInfo]);
//   return (
//     <>
//       {Object.entries(movieInfo).length && (
//         <main>
//           <section>
//             <figure>
//               <img
//                 src={`${urlBase}${movieInfo?.poster_path}`}
//                 alt={movieInfo.title}
//               />
//             </figure>
//             <article>
//               <h1>{movieInfo?.title}</h1>
//               <span>{movieInfo?.original_title}</span>
//               <span>{`(${movieInfo?.production_countries[0].iso_3166_1} - ${movieInfo?.release_date})`}</span>
//               <div>
//                 <span>{movieInfo.adult ? "Adultos" : "Todos"}</span>
//                 <span>{movieInfo.runtime}</span>
//                 <span>{movieInfo.genres.map((item) => ` ${item.name}`)}</span>
//               </div>
//             </article>
//           </section>
//           <section>
//             <h3>Trailer</h3>
//             <iframe
//               src={`https://www.youtube.com/embed/${videoMovie}`}
//               title={movieInfo.title}
//               frameborder="0"
//               allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowfullscreen
//             ></iframe>
//           </section>
//         </main>
//       )}
//     </>
//   );
// }

// export default DetailsMovie;