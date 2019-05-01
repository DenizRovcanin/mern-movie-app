import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moviesActions from "../actions/moviesActions";

import './styles/styles.scss'
import authActions from "../actions/authActions";

class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
        };
    }

   async componentWillMount() {
        if(!!localStorage.getItem('token')) {
            await this.getMoviesList();

            this.setState({
                moviesList: this.props.movies.moviesList,
            })
        }

    }

    userLogout = () => {
        this.props.userLogout(this.props.history.push('/'));
    };

    getMoviesList = async() => {
        await this.props.retrieveListOfMovies();
    };

    deleteMovie = async(id) => {
        await this.props.deleteMovie(id);
    };

    render() {
        const sortedMovies = this.props.movies.moviesList;

        if (sortedMovies && sortedMovies.length > 0) {
            return (
                <div>
                    <div className="sixteen wide column">
                        <button type="button" className="ui red button" onClick={this.userLogout}>Logout</button>
                    </div>
                    <div className="movies">
                        <Fragment>
                            <table className="ui celled table">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Release Date</th>
                                    <th>Average Vote</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedMovies.map(movie => {
                                    return (
                                        <tr key={movie.id}>
                                            <td>{movie.title}</td>
                                            <td>{movie.release_date}</td>
                                            <td>{movie.vote_average}</td>
                                            <td>
                                                <button type="button" className="ui blue button" onClick={() => this.deleteMovie(movie.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                    }
                                )}
                                </tbody>
                            </table>
                        </Fragment>
                    </div>
                </div>
            );
        }

        return (
            <div id="loaderHolder" className="ui segment">
                <div className="ui active dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
            </div>
        )
    }
}

MoviesList.propTypes = {
    retrieveListOfMovies: PropTypes.func,
    deleteMovie: PropTypes.func,
    userLogout: PropTypes.func,
};

const mapStateToProps = ({movies}) => ({movies});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        retrieveListOfMovies: moviesActions.retrieveListOfMovies,
        deleteMovie: moviesActions.deleteMovie,
        userLogout: authActions.userLogout,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
