import { navReducer } from './nav/navReducer';
import { LightsReducer } from './lights/lightsReducer';
import { configReducer } from './config/configReducer';
import { requestReducer } from './request/requestReducer';

export function getReducers() {
    return {
        navigation: navReducer,
        lights: new LightsReducer().get(),
        config: configReducer,
        request: requestReducer
        //form: formReducer
    };
}

export const reducers = {
    navigation: navReducer,
    lights: new LightsReducer().get(),
    config: configReducer,

        request: requestReducer
    //    authentication: authenticationReducer
    //form: formReducer
};
