import { createStore, applyMiddleware, compose, combineReducers, GenericStoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { reducers } from './state/reducers';
import { IAppState } from './state/state';

export default function configureStore(initialState?: IAppState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        devToolsExtension ? devToolsExtension() : f => f
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./state/reducers', () => {
            store.replaceReducer(buildRootReducer(reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers) {
    return combineReducers<IAppState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
