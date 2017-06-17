import { IAction } from '../action';

export const LOGIN = 'LOGIN';
export type LOGIN = { userName: string };

export const LOGOFF = 'LOGOFF';
export type LOGOFF = {};

export const authenticationActions = {
    LOGIN:
    (data: LOGIN) =>
        <IAction<LOGIN>>
        { type: LOGIN, data: data },

    LOGOFF:
    () =>
        <IAction<LOGOFF>>
        { type: LOGOFF, data: {} }
}