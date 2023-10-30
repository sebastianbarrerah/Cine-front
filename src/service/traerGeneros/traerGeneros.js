import axios from "axios"

const URL_GENERO = 'https://api.themoviedb.org/3/genre/movie/list';

export  const traerGeneros =  async () =>{
    try {
        const {data} = await axios.get(URL_GENERO)
        return data.results
    } catch (error) {
        console.log(error)
        return []
    }
}

