import axios from "axios";

const infoVideos = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=dcfd9125c0df54a017e18f723aeebb38`
  );
  return data;
};

export default infoVideos;
