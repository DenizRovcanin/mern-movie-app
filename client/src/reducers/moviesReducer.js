const initialState = {
    deleted: false,
    failed: false,
    moviesList: []
};

export default function moviesListReducer(state = initialState, action) {
    switch(action.type) {
        case 'MOVIES_FETCHED':
            return {
                ...state,
                moviesList: action.data.data,
            };
        case 'MOVIE_DELETED':
            return {
                ...state,
                moviesList: action.data.data,
                deleted:true,
            };
        case 'MOVIES_FETCH_FAIL':
            return {
                ...state,
                failed: true,
            };
        case 'MOVIES_DELETE_FAIL':
            return {
                ...state,
                deleted: false,
            };
        default:
            return state;
    }
}
