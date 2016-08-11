import { Action } from 'redux-actions';
import { combineReducers, createStore } from 'redux';

import { navigationReducer, INavigationState } from './navigationReducer';
import { lightsReducer, ILightsState } from './lightsReducer';

export interface IAppState {
	navigation: INavigationState,
	lights: ILightsState
}

export const app = combineReducers({
  navigation: navigationReducer,
  lights: lightsReducer
});


export const store = createStore(app);