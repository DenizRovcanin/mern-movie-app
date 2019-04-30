import axios from "axios";
import config from '../config';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.getItem('token')}`,
};

const moviesService = {

    getMovies() {
        return axios.get(`${config.API_BASE_URL}/movies/popular`, {headers})
            .then(res => res)
            .catch(err => console.log(err.response.data.message))
    },
    deleteMovieById(id) {
        return axios.delete(`${config.API_BASE_URL}/movies/delete/${id}`, {headers})
            .then(res => res)
            .catch(err => console.log(err.response.data.message))
    },

};

export default moviesService;
