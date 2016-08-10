import { Action } from 'redux-actions';
import { combineReducers, createStore } from 'redux';

import { navigationReducer, INavigationState } from './navigationReducer';

export const app = combineReducers({
  navigationReducer
});

export interface IAppState extends INavigationState { }


export const store = createStore(app);

export const getState = () => store.getState() as IAppState;
export const dispatch = (a:Action<any>) => store.dispatch(a);
export const subscribeToState = (callback: () => void) => store.subscribe(callback);