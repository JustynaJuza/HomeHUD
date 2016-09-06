import { combineReducers, createStore } from 'redux';

import { LightsReducer } from './lightsReducer';

export const store = createStore(new LightsReducer().get());
