declare const includeClientScripts: boolean;

import * as injectTapEventPlugin from 'react-tap-event-plugin';

import * as _filter from "lodash/filter";

import { ControlHub } from './controlHub';
import { Router } from './router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { navigationReducer } from './navigation/navigationReducer';
import { INavigationState } from './navigation/navigationState';
import { navigationActions } from './navigation/navigationActions';

import { LightsReducer } from './lights/lightsReducer';
import { ILightsState } from './lights/lightsState';

import { configReducer } from './config/configReducer';
import { IConfigState } from './config/configState';

import { authenticationReducer } from './authentication/authenticationReducer';
import { IAuthenticationState } from './authentication/authenticationState';

import { SelectedContent } from '../state/navigation/navigationState';

import { IAction } from './action';
import {
    UPDATE_ROUTE
} from './navigation/navigationActions';

export interface IAppState {
    navigation: INavigationState;
    lights: ILightsState;
    config: IConfigState;
    authentication: IAuthenticationState;
}

var lightsReducer = new LightsReducer();

if (includeClientScripts) {
    lightsReducer.hub = new ControlHub();
    lightsReducer.hub.init();
}

export const app = combineReducers({
  navigation: navigationReducer,
  lights: lightsReducer.get(),
  config: configReducer,
  authentication: authenticationReducer,
  form: formReducer
});

export const store = createStore(<any>app, applyMiddleware(Router.resolveRoute));

if (includeClientScripts) {
    
    window.onpopstate = () => {
        var route = window.location.pathname.substring(1);
        console.log(route);

        store.dispatch(navigationActions.UPDATE_ROUTE(route));
    }
}

injectTapEventPlugin();
