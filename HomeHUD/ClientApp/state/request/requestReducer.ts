import { Reducer } from 'redux';

import * as RequestActions from './requestActions';
import * as RequestActionTypes from './requestActionTypes';

import { IRequestState } from './requestState';

const initialRequestState: IRequestState = {
    baseUrl: null,
    isAuthenticated: false,
    authenticationToken: null
};

export const requestReducer: Reducer<IRequestState> = (state: IRequestState, action: RequestActions.RequestAction) => {
    switch (action.type) {
        case RequestActionTypes.SetBaseUrl:
            return Object.assign({}, state, {
                baseUrl: (<RequestActions.SetBaseUrlAction>action).baseUrl
            });

        case RequestActionTypes.SetAuthentication:
            return Object.assign({}, state, {
                //(<RequestActions.SetAuthenticationAction>action).data
            });

        default:
            return state || initialRequestState;
    }
};