import authService from '../services/authService';

export function signupUser(data) {
    return {
        type: 'USER_SIGNED_UP',
        data
    }
}

export function loginUser(data) {
    return {
        type: 'USER_LOGIN',
        data
    }
}

export function logoutUser() {
    return {
        type: 'USER_LOGGED_OUT'
    }
}

export function userSignup(data) {
    return dispatch => {
        authService.signup(data)
            .then(response => dispatch(signupUser(response)))
            .catch(err => err);
    }
}

export function userLogin(data, cb) {
    return dispatch => {
        authService.login(data)
            .then(response => {
                dispatch(loginUser(response.data));
                localStorage.setItem('token', response.data.user.token);
                if(cb) cb();
            })
            .catch(err => err);
    }
}

export function userLogout(cb) {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        if(cb) cb();
    }
}

const authActions = {
    userSignup,
    userLogin,
    userLogout,
};

export default authActions;
