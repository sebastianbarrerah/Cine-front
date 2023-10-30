import { json } from "react-router-dom"

export const addMovieLocalStorage = (pelicula) =>{
    localStorage.setItem("peliculaClick",JSON.stringify(pelicula))
}

export const removeFromLocalStorage = () => {
    localStorage.removeItem("peliculaClick")
}

export const getMovieFromLocalStorage = () =>{
    const results = localStorage.getItem("peliculaClick")
    const movie = results? JSON.parse(results):null
    return movie
}