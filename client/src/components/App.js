import React from "react";
import {Router, Route, Redirect, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import MainLayout from "./MainLayout";
import MoviesList from "./MoviesList";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const isLogged = !!localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={props =>
                isLogged ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
};

const App = () => {
    return (
        <div>
            <Router history={createBrowserHistory()}>
                <div>
                    <Switch>
                        <Route exact path="/" component={MainLayout} />
                        <PrivateRoute exact path="/movies" component={MoviesList} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
