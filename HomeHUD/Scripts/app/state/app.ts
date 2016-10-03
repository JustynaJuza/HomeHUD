declare const includeClientScripts: boolean;

import { ControlHub } from './controlHub';

import { combineReducers, createStore } from 'redux';

import { navigationReducer, INavigationState } from './navigation/navigationReducer';

import { LightsReducer } from './lights/lightsReducer';
import { ILightsState } from './lights/lightsState';

import { configReducer } from './config/configReducer';
import { IConfigState } from './config/configState';

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

export const store = createStore(<any> app);
