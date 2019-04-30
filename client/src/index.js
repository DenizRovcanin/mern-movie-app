import React from 'react'
import ReactDOM from 'react-dom';
import Provider from "react-redux/es/components/Provider";
import configureStore from './configureStore';
import App from "./components/App";

const initialState = {};
const store = configureStore(initialState);
const root = document.querySelector('#root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
);
