import * as _map from 'lodash/map';

import * as React from 'react';
import { Router, Route, match } from 'react-router';
import { Location, History } from 'history';
import Layout from './components/page/layout';
import RoomContent from './components/page/roomContent';
//import Home from './components/Home';
//import FetchData from './components/FetchData';
//import Counter from './components/Counter';

export interface IRouterParams {
    match: match<any>;
    location: Location;
    history: History;
}

export interface IRouteConfig {
    path: string,
    component: any;
    routes?: IRouteConfig[]
}

const routesConfig: IRouteConfig[] = [
    {
            path: '/rooms(/:hash)',
            component: RoomContent
    }
]

var renderSubroutes = (subroutes: IRouteConfig[]) => {
    if (subroutes)
        return _map(subroutes, renderRoutesRecursive);
}

const renderRoutesRecursive = (route: IRouteConfig, index) => (
    <Route key={index} path={route.path} component={route.component}>
        {renderSubroutes(route.routes)}
    </Route>
)

export default _map(routesConfig, renderRoutesRecursive);

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