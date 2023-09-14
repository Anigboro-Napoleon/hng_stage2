import axios from 'axios';

const baseurl = 'https://api.themoviedb.org/3/'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWU5ZWUyMmZmYzBmOWNjZjYxNDc5ODQwZTkwYWU5OSIsInN1YiI6IjY1MDAwYzc0ZWZlYTdhMDBmZDFiNDkzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y8DwddJ8ru-tjoa893w31wpMlv1fakmjnMS038IpWJo'

const useApi = () => {
  
  const FetchTopMovies = async () => {
    const res = await axios.get(`${baseurl}movie/top_rated?page=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res;
  }

  const SearchMovie = async (input) => {
    return await axios.get(`${baseurl}search/movie?query=${input}&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  const MovieDetails = async (id) => {
    return await axios.get(`${baseurl}movie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  const MovieImage = async (id) => {
    return await axios.get(`${baseurl}movie/${id}/images`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  
  return {
    FetchTopMovies,
    SearchMovie,
    MovieDetails,
    MovieImage,
  }
}


export default useApi;