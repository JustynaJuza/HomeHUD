import { INavState, ISelectedContent, IError } from './navState';
import * as NavActionTypes from './navActionTypes';

export interface SelectContentAction {
    type: typeof NavActionTypes.SelectContent,
    content: ISelectedContent
}

export interface ShowErrorAction {
    type: typeof NavActionTypes.ShowError,
    error: IError
}

export type NavAction = SelectContentAction | ShowErrorAction;

//export const SELECT_CONTENT = 'SELECT_CONTENT';
//export type SELECT_CONTENT = ISelectedContent;

//export const SHOW_ERROR = 'SHOW_ERROR';
//export type SHOW_ERROR = IError;

//export const UPDATE_ROUTE = 'UPDATE_ROUTE';
//export type UPDATE_ROUTE = string;


//export const navigationActions = {
//    SELECT_CONTENT:
//    (content: SELECT_CONTENT) =>
//        <IAction<SELECT_CONTENT>>
//        { type: SELECT_CONTENT, data: content },

//    SHOW_ERROR:
//    (message: SHOW_ERROR) =>
//        <IAction<SHOW_ERROR>>
//        { type: SHOW_ERROR, data: message },

//    UPDATE_ROUTE:
//    (route: UPDATE_ROUTE) =>
//        <IAction<UPDATE_ROUTE>>
//        { type: UPDATE_ROUTE, data: route }
//}