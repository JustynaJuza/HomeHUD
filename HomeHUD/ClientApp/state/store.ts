import { navigationReducer } from './navigation/navigationReducer';
import { INavigationState } from './navigation/navigationState';
import { navigationActions } from './navigation/navigationActions';

import { LightsReducer } from './lights/lightsReducer';
import { ILightsState } from './lights/lightsState';

import { configReducer } from './config/configReducer';
import { IConfigState } from './config/configState';

import { authenticationReducer } from './authentication/authenticationReducer';
import { IAuthenticationState } from './authentication/authenticationState';

export interface IAppState {
    navigation: INavigationState;
    lights: ILightsState;
    config: IConfigState;
    authentication: IAuthenticationState;
}

export const reducers = {
    navigation: navigationReducer,
    lights: new LightsReducer().get(),
    config: configReducer,
//    authentication: authenticationReducer
    //form: formReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IAppState): void;
}
