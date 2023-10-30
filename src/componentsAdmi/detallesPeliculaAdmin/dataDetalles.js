import axios from "axios";

export  const totalDatos =  async (id) =>{
    const URL__ID = `https://api.themoviedb.org/3/movie/${id}?api_key=dcfd9125c0df54a017e18f723aeebb38&language=en-US`;


    try {
        const {data} = await axios.get(URL__ID)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}


