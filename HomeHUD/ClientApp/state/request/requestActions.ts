import { IRequestState } from './requestState';
import * as RequestActionTypes from './requestActionTypes';

export interface SetBaseUrlAction {
    type: typeof RequestActionTypes.SetBaseUrl,
    baseUrl: string
}

export interface SetAuthenticationAction {
    type: typeof RequestActionTypes.SetAuthentication
}

export type RequestAction = SetBaseUrlAction | SetAuthenticationAction;