import axios from "axios";
import config from '../config';

const authService = {

    signup(params = {}) {
        return axios({
            method: 'POST',
            url: `${config.API_BASE_URL}/user/signup`,
            data: params,
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res)
            .catch(err => console.log(err.response.data.message));
    },
    login(params = {}) {
        return axios({
            method: 'POST',
            url: `${config.API_BASE_URL}/user/login`,
            data: params,
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res)
            .catch(err => console.log(err.response.data.message))

    },
};

export default authService;
