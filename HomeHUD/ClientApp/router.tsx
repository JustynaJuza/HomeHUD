import * as _map from 'lodash/map';

import * as React from 'react';
import { Router, Route, Redirect } from 'react-router';

import Layout from './components/page/layout';
import RoomContent from './components/page/roomContent';
import LoginForm from './components/page/loginForm';
import LoginGuard from './components/containers/loginGuard';
import CreateUserForm from './components/admin/createUserForm';

export const defaultRedirect = '/r';

export interface IRouterParams {
    params: Router.Params
    location: Router.LocationDescriptor
}

export interface IRouteConfig {
    path: string;
    component: any;
    routes?: IRouteConfig[];
    requireLogin?: boolean;
}


export const getRoutesConfig = (isAuthenticated: boolean) =>
    (
        <Route component={Layout}>
            <Redirect from='/' to='/r' />
            <Route path='/login' component={LoginForm} />

            <Route component={LoginGuard}>
                <Route path='/r(/:hash)' component={RoomContent} />
                <Route path='/users' component={CreateUserForm} />
            </Route>
        </Route>
    );

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}

//const routesConfig: IRouteConfig[] = [
//    {
//        path: '/',
//        component: Layout,
//        routes: [{
//            path: '/rooms(/:hash)',
//            component: RoomContent,
//            requireLogin: true
//        },
//        {
//            path: '/login',
//            component: LoginForm
//        }]
//    }
//]

//const renderSubroutes = (subroutes: IRouteConfig[], parentHasLogin) => {
//    if (subroutes)
//        return _map(subroutes, (r, i) => renderRoutesRecursive(r, i, parentHasLogin));
//}

//const renderRoute = (route: IRouteConfig, index) => {
//    return (
//        <Route key={index} path={route.path} component={route.component}>
//            {renderSubroutes(route.routes, route.requireLogin)}
//        </Route>
//    );
//}

//const renderRoutesRecursive = (route: IRouteConfig, index, parentHasLogin) => {
//    console.log(route, index, parentHasLogin)
//    if (!route.requireLogin || parentHasLogin) {
//        return renderRoute(route, index);
//    }

//    console.log("wrapping with login guard")
//    return (
//        <Route component={LoginGuard}>
//            renderRoute(route, index)
//        </Route>
//    );
//}

//const routes = _map(routesConfig, (r, i) => renderRoutesRecursive(r, i, false));

//export default _map(routesConfig, renderRoutesRecursive);


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