declare const includeClientScripts: boolean;

import * as _filter from "lodash/filter";

import { ControlHub } from './controlHub';

import { createStore, combineReducers, applyMiddleware } from 'redux';

import { navigationReducer } from './navigation/navigationReducer';
import { INavigationState } from './navigation/navigationState';
import { navigationActions } from './navigation/navigationActions';

import { LightsReducer } from './lights/lightsReducer';
import { ILightsState } from './lights/lightsState';

import { configReducer } from './config/configReducer';
import { IConfigState } from './config/configState';

import { SelectedContent } from '../state/navigation/navigationState';

import { IAction } from './action';
import {
    UPDATE_ROUTE
} from './navigation/navigationActions';

export interface IAppState {
    navigation: INavigationState;
    lights: ILightsState;
    config: IConfigState;
}

var lightsReducer = new LightsReducer();

if (includeClientScripts) {
    lightsReducer.hub = new ControlHub();
    lightsReducer.hub.init();
}

export const app = combineReducers({
  navigation: navigationReducer,
  lights: lightsReducer.get(),
  config: configReducer
});

const resolveRoute = (store: Redux.Store<{}>) => (next: Redux.Dispatch<any>) => (action: IAction<any>) => {
    if (action.type !== UPDATE_ROUTE) return next(action);
    
    if (action.data.length === 0) {
        return next(navigationActions.SELECT_CONTENT(new SelectedContent('ROOM', 0)));
    };

    const state = <IAppState>store.getState();

    const matchingRoom = _filter(state.config.rooms, room => room.hash === action.data)[0];
    if (matchingRoom) {
        return next(navigationActions.SELECT_CONTENT(new SelectedContent('ROOM', matchingRoom.id)));
    }
    else {
        return next(navigationActions.SHOW_ERROR('This route is not valid, try selecting a tab from the navigation panel.'));
    }
}

export const store = createStore(<any>app, applyMiddleware(resolveRoute));

if (includeClientScripts) {
    
    window.onpopstate = () => {
        var route = window.location.pathname.substring(1);
        console.log(route);

        store.dispatch(navigationActions.UPDATE_ROUTE(route));
    }
}
