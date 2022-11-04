import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'f6d6a6eba9e5fa47d3e508315310d0fa',
    language: 'es-ES',
  },
});

export default movieDB;
