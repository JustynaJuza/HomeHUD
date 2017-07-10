import { IRequestState } from './requestState';
import * as RequestActionTypes from './requestActionTypes';

export interface SetBaseUrlAction {
    type: typeof RequestActionTypes.SetBaseUrl,
    baseUrl: string
}

export interface SetLoginRedirectUrlAction {
    type: typeof RequestActionTypes.SetLoginRedirectUrl
    redirectUrl: string;
}

export interface LogInAction {
    type: typeof RequestActionTypes.LogIn
    authenticationToken: string;
}

export interface LogOffAction {
    type: typeof RequestActionTypes.LogOff
}

export type RequestAction = SetBaseUrlAction | LogInAction | LogOffAction;