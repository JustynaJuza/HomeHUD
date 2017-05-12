import { INavigationState } from './navigation/navigationState';

import { ILightsState } from './lights/lightsState';

import { IConfigState } from './config/configState';

import { IAuthenticationState } from './authentication/authenticationState';


export interface IAppState {
    navigation: INavigationState;
    lights: ILightsState;
    config: IConfigState;
    authentication: IAuthenticationState;
}