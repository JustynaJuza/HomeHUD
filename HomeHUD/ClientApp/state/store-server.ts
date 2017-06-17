import { navReducer } from './nav/navReducer';
import { LightsReducer } from './lights/lightsReducer';
import { configReducer } from './config/configReducer';

//import { authenticationReducer } from './authentication/authenticationReducer';

export function getReducers() {
    return {
        navigation: navReducer,
        lights: new LightsReducer().get(),
        config: configReducer,
        //    authentication: authenticationReducer
        //form: formReducer
    };
}

export const reducers = {
    navigation: navReducer,
    lights: new LightsReducer().get(),
    config: configReducer,
    //    authentication: authenticationReducer
    //form: formReducer
};
