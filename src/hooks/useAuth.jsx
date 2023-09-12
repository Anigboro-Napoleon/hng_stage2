import axios from 'axios';

const baseurl = 'https://api.themoviedb.org/3/'

const useAuth = () => {
  
  const FetchTopProducts = async () => {
    const res = await axios.get(`${baseurl}movie/popular`)
    return res;
  }
  
  return {
    FetchTopProducts,
  }
}


export default useAuth;