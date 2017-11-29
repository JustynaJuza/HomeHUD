import { reducers as serverReducers } from './reducers-server';

import { LightsReducer } from './lights/lightsReducer';
import { ControlHub } from './controlHub';

// add SignalR Hub to reducer
var lightsReducer = new LightsReducer();
lightsReducer.hub = new ControlHub();
lightsReducer.hub.init();
serverReducers.lights = lightsReducer.get();

export const reducers = serverReducers;