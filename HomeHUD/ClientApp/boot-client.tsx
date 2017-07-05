//import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//import { syncHistoryWithStore } from 'react-router-redux';
import routes from './router';
import configureStore from './configureStore-client';
import { IAppState } from './state/state';
import Layout from './components/page/layout';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as IAppState;
export const store = configureStore(initialState);
//const history = syncHistoryWithStore(browserHistory, store);

// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.
//ReactDOM.render(
//    <Provider store={store}>
//        <Router history={history} children={routes} />
//    </Provider>,
//    document.getElementById('react-app')
//);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-app'))
