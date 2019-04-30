import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesListReducer from "./moviesReducer";

export default function createReducer(injectedReducers) {
    return combineReducers({
        auth: authReducer,
        movies: moviesListReducer,
        ...injectedReducers
    });
}
