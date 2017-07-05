import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import configureStore from './configureStore-server';
import Layout from './components/page/layout';

import * as RequestActionTypes from './state/request/requestActionTypes';

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {
        const context: any = {}

        const store = configureStore();
        store.dispatch({
            type: RequestActionTypes.SetBaseUrl,
            baseUrl: params.data.baseUrl
        })

        const matchRoutes = (routes, pathname) => {
            routes.some((route) => {
                return matchPath(pathname, route)
            })
        }

        //// Match the incoming request against the list of client-side routes
        //match({ routes, location: params.location }, (error, redirectLocation, renderProps: any) => {
        //    if (error) {
        //        throw error;
        //    }

        //const match = routes.reduce((acc, route) => matchPath(params.location, route, { exact: true }) || acc, null);
        //if (!match) {
        //    res.status(404).send(render(<NoMatch />));
        //    return;
        //}
        //    // If there's a redirection, just send this information back to the host application
        //    if (redirectLocation) {
        //        resolve({ redirectUrl: redirectLocation.pathname });
        //        return;
        //    }

        //    // If it didn't match any route, renderProps will be undefined
        //    if (!renderProps) {
        //        throw new Error(`The location '${params.url}' doesn't match any route configured in react-router.`);
        //    }


        // Build an instance of the application
        const app = (
            <Provider store={store}>
                <StaticRouter
                    location={params.location}
                    context={context}>
                    <Layout />
                </StaticRouter>
            </Provider>
        );

        // Perform an initial render that will cause any async tasks (e.g., data access) to begin
        renderToString(app);

        if (context.url) {
            resolve({ redirectUrl: context.url });
            return;
        } else {

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
        }
    });
});
