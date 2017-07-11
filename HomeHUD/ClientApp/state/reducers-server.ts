import { reducer as formReducer } from 'redux-form';

import { navReducer } from './nav/navReducer';
import { LightsReducer } from './lights/lightsReducer';
import { configReducer } from './config/configReducer';
import { requestReducer } from './request/requestReducer';

export const reducers = {
    navigation: navReducer,
    lights: new LightsReducer().get(),
    config: configReducer,
    request: requestReducer,
    form: formReducer
};