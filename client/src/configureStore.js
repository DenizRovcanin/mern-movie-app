import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers/index.js';


export default function configureStore() {
    const middlewares = [
        thunk,
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];


    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

                shouldHotReload: false,
            })
            : compose;
    /* eslint-enable */

    // const store = createStore(
    //   createReducer(),
    //   // fromJS(initialState),

    //   composeEnhancers(...enhancers)
    // );

    const store = createStore(
        createReducer(),
        composeEnhancers(...enhancers)
    );

    // Extensions
    store.injectedReducers = {}; // Reducer registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
            store.dispatch({ type: '@@REDUCER_INJECTED' });
        });
    }

    return store;
}
