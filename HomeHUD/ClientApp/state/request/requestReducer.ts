import { Reducer } from 'redux';

import * as RequestActions from './requestActions';
import * as RequestActionTypes from './requestActionTypes';

import { IRequestState } from './requestState';

const initialRequestState: IRequestState = {
    baseUrl: null,
    loginRedirectUrl: null,
    isAuthenticated: false,
    authenticationToken: null,
    user: null
};

export const requestReducer: Reducer<IRequestState> = (state: IRequestState, action: RequestActions.RequestAction) => {
    switch (action.type) {
        case RequestActionTypes.SetBaseUrl:
            return Object.assign({}, state, {
                baseUrl: (<RequestActions.SetBaseUrlAction>action).baseUrl
            });

        case RequestActionTypes.SetLoginRedirectUrl:
            return Object.assign({}, state, {
                loginRedirectUrl: (<RequestActions.SetLoginRedirectUrlAction>action).redirectUrl
            });

        case RequestActionTypes.LogIn:
            return Object.assign({}, state, {
                isAuthenticated: true,
                user: (<RequestActions.LogInAction>action).user,
                authenticationToken: (<RequestActions.LogInAction>action).authenticationToken
            });

        case RequestActionTypes.LogOut:
            return Object.assign({}, state, {
                isAuthenticated: false,
                authenticationToken: null
            });

        default:
            return state || initialRequestState;
    }
};