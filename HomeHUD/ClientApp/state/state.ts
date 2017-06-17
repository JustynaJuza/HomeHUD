import { INavState } from './nav/navState';
import { ILightsState } from './lights/lightsState';
import { IConfigState } from './config/configState';
//import { IAuthenticationState } from './authentication/authenticationState';

export interface IAppState {
    navigation: INavState;
    lights: ILightsState;
    config: IConfigState;
    //authentication: IAuthenticationState;
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IAppState): void;
}