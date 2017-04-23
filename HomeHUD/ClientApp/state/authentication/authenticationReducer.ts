import { handleActions } from 'redux-actions';

import { IAction } from '../action';
import {
    LOGIN,
    LOGOFF
} from './authenticationActions';

import { IAuthenticationState } from './authenticationState';

const initialState: IAuthenticationState = {
    isAuthenticated: false,
    userName: ''
};

export const authenticationReducer = handleActions(<any>{

    [LOGIN]:
    (state: IAuthenticationState, action: IAction<LOGIN>) => {

        return Object.assign({}, state, {
            isAuthenticated: true,
            userName: action.data.userName
        });
    },

    [LOGOFF]:
    (state: IAuthenticationState, action: IAction<LOGOFF>) => {

        return Object.assign({}, state, initialState);
    }
},
    initialState);
