import { IRequestState } from './requestState';
import { IUser } from '../config/configState';
import * as RequestActionTypes from './requestActionTypes';

export interface SetBaseUrlAction {
    type: typeof RequestActionTypes.SetBaseUrl;
    baseUrl: string;
}

export interface SetLoginRedirectUrlAction {
    type: typeof RequestActionTypes.SetLoginRedirectUrl;
    redirectUrl: string;
}

export interface LogInAction {
    type: typeof RequestActionTypes.LogIn;
    user: IUser;
    authenticationToken?: string;
}

export interface LogOutAction {
    type: typeof RequestActionTypes.LogOut;
}

export type RequestAction = SetBaseUrlAction | LogInAction | LogOutAction;