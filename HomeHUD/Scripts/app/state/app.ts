import { ControlHub } from './controlHub';

import { combineReducers, createStore } from 'redux';

import { navigationReducer, INavigationState } from './navigation/navigationReducer';
import { LightsReducer } from './lights/lightsReducer';
import { ILightsState } from './lights/lightsState';

export interface IAppState {
	navigation: INavigationState;
	lights: ILightsState;
}

const hub = new ControlHub();
//hub.init();

export const app = combineReducers({
  navigation: navigationReducer,
  lights: new LightsReducer(hub).get()
});

export const store = createStore(app);
