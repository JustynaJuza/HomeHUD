import * as _map from 'lodash/map';

import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import Layout from './components/page/layout';
//import Home from './components/Home';
//import FetchData from './components/FetchData';
//import Counter from './components/Counter';

export interface IRouterParams {
    params: Router.Params
    location: Router.LocationDescriptor
}

const routesConfig = [
    {
        path: '/',
        component: Layout
    },
    {
        path: '/:hash',
        component: Layout
    }
]

const renderRoutes = (route, key) => <Route key={key} path={route.path} component={route.component} />;

export default _map(routesConfig, renderRoutes);


//const RouteWithSubRoutes = (route) => (
//    <Route path={route.path} render={props => (
//        // pass the sub-routes down to keep nesting
//        <route.component {...props} routes={route.routes} />
//    )} />
//)

//export default
//    {
//        _map(routes((route, i) => (
//            <RouteWithSubRoutes key={i} {...route} />
//        )));
//    }

//<Route path='/' component={Layout}>
//    <Route path='/gaming' />
//    <Route path='/bed' />
//    <Route path='/living' />
//</Route>;

//<Route path='/' component={Layout} />
//<Route path='/counter' components={{ body: Counter }} />
//<Route path='/fetchdata' components={{ body: FetchData }}>
//    <Route path='(:startDateIndex)' /> { /* Optional route segment that does not affect NavMenu highlighting */ }
//</Route>

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}