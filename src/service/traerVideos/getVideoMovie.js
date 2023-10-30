import axios from "axios"

export  const traerTrailer =  async (id) =>{
  const URL_VIDEO = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=dcfd9125c0df54a017e18f723aeebb38&language=en-ES`
  console.log(URL_VIDEO)
    try {
        const {data} = await axios.get(URL_VIDEO)
        return data.results
    } catch (error) {
        console.log(error)
        return []
    }
}



