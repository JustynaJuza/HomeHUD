import { navReducer } from './nav/navReducer';

import { LightsReducer } from './lights/lightsReducer';

import { configReducer } from './config/configReducer';

import { requestReducer } from './request/requestReducer';

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
        request: requestReducer
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