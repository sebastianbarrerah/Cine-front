import React, { useEffect, useState } from 'react'
import infoVideos from '../../service/traerVideos/TraerVideos'
import ReactPlayer from 'react-player'


const Trailer = () => {
    // Estados
    const [media, setmedia] = useState([])
    const [posicion, setposicion] = useState([])
    const [generos, setgeneros] = useState("")
    const [tiempo, settiempo] = useState("")
    const [edpoint, setedpoint] = useState("")  /* aqui va el id que viene de la pelicula */

    useEffect(() => {
        multimedia()
    }, [])
    
    const idPelicula = "346698"
    const nombre = "Trailer"
    
    const idNumero = posicion.findIndex((element) => element.type == nombre);
    console.log(typeof(idNumero));
    
    const multimedia = async() => {

        const data = await infoVideos(idPelicula)
        const key = data.videos.results[1].key
        // const key2 = key.key
        const genero = data.genres[0].name
        const duracion = data.runtime
        const numero = data.videos.results
        setmedia(key)
        setgeneros(genero)
        settiempo(duracion)
        setposicion(numero)
        // console.log(key2);
    }


    return (
        <>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${media}`}
                width="50%"
                height="350px"
                controls
                playing
            />

            <h1>Genero de la pelicula</h1>
            <h3>{`${generos}`}</h3>
            <h1>Genero de la pelicula</h1>
            <h3>{`${tiempo} Minutos`}</h3>
        </>
    
    )
}

export default Trailer