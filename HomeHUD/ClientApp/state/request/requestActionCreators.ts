import { AppThunkAction, IAppState } from '../state';
import { IRequestState } from './requestState';

import * as RequestActionTypes from './requestActionTypes';

export const requestActionCreators = {

    logIn: (authenticationToken) => (dispatch, getState) => {
        var currentState: IAppState = getState();

        if (!currentState.request.isAuthenticated) {
            dispatch({ type: RequestActionTypes.LogIn, authenticationToken: authenticationToken });
        }
    },

    logOff: () => (dispatch, getState) => {
        var currentState: IAppState = getState();

        if (currentState.request.isAuthenticated) {
            dispatch({ type: RequestActionTypes.LogOff });
        }
    },

    setLoginRedirectUrl: (redirectUrl) => (dispatch, getState) => {
        dispatch({ type: RequestActionTypes.SetLoginRedirectUrl, redirectUrl: redirectUrl });
    }
};