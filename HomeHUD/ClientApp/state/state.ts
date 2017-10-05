import { INavState } from './nav/navState';
import { ILightsState } from './lights/lightsState';
import { IConfigState } from './config/configState';
import { IRequestState } from './request/requestState';

export interface IAppState {
    navigation: INavState;
    lights: ILightsState;
    config: IConfigState;
    request: IRequestState;
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IAppState): void;
}