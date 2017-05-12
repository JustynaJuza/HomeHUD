import { navigationReducer } from './navigation/navigationReducer';

import { LightsReducer } from './lights/lightsReducer';

import { configReducer } from './config/configReducer';

import { authenticationReducer } from './authentication/authenticationReducer';

import { ControlHub } from './controlHub';


var lightsReducer = new LightsReducer();
lightsReducer.hub = new ControlHub();
lightsReducer.hub.init();

export const reducers = {
    navigation: navigationReducer,
    lights: lightsReducer.get(),
    config: configReducer,
    //    authentication: authenticationReducer
    //form: formReducer
};
