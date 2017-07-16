//import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getRoutesConfig } from './router';
import configureStore from './configureStore-client';
import { IAppState }  from './state/state';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as IAppState;
export const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin()

// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.
ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(null, { userAgent: 'all' })}>
        <Provider store={store}>
            <Router history={history} children={getRoutesConfig(initialState.request.isAuthenticated)} />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('react-app')
);
