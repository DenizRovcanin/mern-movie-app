import moviesService from "../services/moviesService";

export function getListOfMovies(data) {
    return {
        type: 'MOVIES_FETCHED',
        data
    }
}

export function movieDelete(data) {
    return {
        type: 'MOVIE_DELETED',
        data
    }
}

export function fetchFailed(data) {
    return {
        type: 'MOVIES_FETCH_FAIL',
        data
    }
}

export function deleteFailed(data) {
    return {
        type: 'MOVIE_DELETE_FAILED',
        data
    }
}

export function retrieveListOfMovies() {
    return dispatch => {

        moviesService.getMovies()
            .then(response => dispatch(getListOfMovies(response.data)))
            .catch(err => dispatch(fetchFailed(err)));
    }
}

export function deleteMovie(data) {
    return dispatch => {

        moviesService.deleteMovieById(data)
            .then(response => dispatch(movieDelete(response.data)))
            .catch(err => dispatch(deleteFailed(err)));
    }
}

const moviesActions = {
    retrieveListOfMovies,
    deleteMovie,
    fetchFailed,
    deleteFailed,
};

export default moviesActions;
