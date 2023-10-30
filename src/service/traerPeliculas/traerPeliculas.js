import axios from "axios"

const URL_API = 'https://api.themoviedb.org/3/movie/now_playing?api_key=dcfd9125c0df54a017e18f723aeebb38&language=es-ES/results/1';

export  const traerPeliculas =  async () =>{
    try {
        const {data} = await axios.get(URL_API)
        return data.results
    } catch (error) {
        console.log(error)
        return []
    }
}
