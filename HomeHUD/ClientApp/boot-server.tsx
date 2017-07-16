import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { getRoutesConfig } from './router';
import configureStore from './configureStore-server';
import { Api } from './state/api';

import * as RequestActionTypes from './state/request/requestActionTypes';
import * as RequestActions from './state/request/requestActions';

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {

        // Match the incoming request against the list of client-side routes
        const store = configureStore();
        store.dispatch({
            type: RequestActionTypes.SetBaseUrl,
            baseUrl: params.data.baseUrl
        } as RequestActions.SetBaseUrlAction)

        if (params.data.isAuthenticated) {
            store.dispatch({
                type: RequestActionTypes.LogIn,
                user: null
            } as RequestActions.LogInAction)
        }

        var routes = getRoutesConfig(params.data.isAuthenticated);
        match({ routes, location: params.location }, (error, redirectLocation, renderProps: any) => {
            if (error) {
                throw error;
            }

            // If there's a redirection, just send this information back to the host application
            if (redirectLocation) {
                resolve({ redirectUrl: redirectLocation.pathname });
                return;
            }

            // If it didn't match any route, renderProps will be undefined
            if (!renderProps) {
                throw new Error(`The location '${ params.url }' doesn't match any route configured in react-router.`);
            }

            // Build an instance of the application
            const app = (
                <MuiThemeProvider muiTheme={getMuiTheme(null, { userAgent: 'all' })}>
                    <Provider store={ store }>
                        <RouterContext {...renderProps} />
                    </Provider>
                </MuiThemeProvider>
            );

            // Perform an initial render that will cause any async tasks (e.g., data access) to begin
            renderToString(app);

            // Once the tasks are done, we can perform the final render
            // We also send the redux store state, so the client can continue execution where the server left off
            params.domainTasks.then(() => {
                resolve({
                    html: renderToString(app),
                    globals: {
                        initialReduxState: store.getState(),
                        baseUrl: params.data.baseUrl
                    }
                });
            }, reject); // Also propagate any errors back into the host application
        });
    });
});
