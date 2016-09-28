declare const includeClientScripts: boolean;

import { ControlHub } from './controlHub';

import { combineReducers, createStore } from 'redux';

import { navigationReducer, INavigationState } from './navigation/navigationReducer';
import { LightsReducer } from './lights/lightsReducer';
import { ILightsState } from './lights/lightsState';

export interface IAppState {
    navigation: INavigationState;
    lights: ILightsState;
}

var lightsReducer = new LightsReducer();

if (includeClientScripts) {
    lightsReducer.hub = new ControlHub();
    lightsReducer.hub.init();
}

export const app = combineReducers({
  navigation: navigationReducer,
  lights: lightsReducer.get()
});

export const store = createStore(<any> app);
