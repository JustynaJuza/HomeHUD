import { AppThunkAction, IAppState } from '../state';
import { IRequestState } from './requestState';
import { IUser } from '../config/configState';

import * as RequestActionTypes from './requestActionTypes';
import * as RequestActions from './requestActions';

export const requestActionCreators = {

    logIn: (user: IUser, authenticationToken?: string) => (dispatch, getState) => {
        var currentState: IAppState = getState();

        if (!currentState.request.isAuthenticated) {
            dispatch(<RequestActions.LogInAction>
                { type: RequestActionTypes.LogIn, authenticationToken: authenticationToken });
        }
    },

    logOut: () => (dispatch, getState) => {
        var currentState: IAppState = getState();

        if (currentState.request.isAuthenticated) {
            dispatch(<RequestActions.LogOutAction>
                { type: RequestActionTypes.LogOut });
        }
    },

    setLoginRedirectUrl: (redirectUrl) => (dispatch, getState) => {
        dispatch(<RequestActions.SetLoginRedirectUrlAction>
            { type: RequestActionTypes.SetLoginRedirectUrl, redirectUrl: redirectUrl });
    }
};