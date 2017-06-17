import { navReducer } from './nav/navReducer';

import { LightsReducer } from './lights/lightsReducer';

import { configReducer } from './config/configReducer';

//import { authenticationReducer } from './authentication/authenticationReducer';

import { ControlHub } from './controlHub';

import { IAppState } from './state';

export function getReducersWithControlHub() {
    var lightsReducer = new LightsReducer();
    lightsReducer.hub = new ControlHub();
    lightsReducer.hub.init();

    return {
        navigation: navReducer,
        lights: lightsReducer.get(),
        config: configReducer,
        //    authentication: authenticationReducer
        //form: formReducer
    };
}

export const reducers = {
//    navigation: navigationReducer,
//    lights: new LightsReducer().get(),
//    config: configReducer,
//    //    authentication: authenticationReducer
//    //form: formReducer
};