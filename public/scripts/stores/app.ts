import { Action } from 'redux-actions';
import { combineReducers, createStore } from 'redux';

import { navigationReducer, INavigationState } from './navigationReducer';

export const app = combineReducers({
  navigation: navigationReducer
});

export interface IAppState {
	navigation: INavigationState
}

export const store = createStore(app);