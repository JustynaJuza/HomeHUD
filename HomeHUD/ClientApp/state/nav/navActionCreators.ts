import { INavState, ISelectedContent, IError } from './navState';
import * as NavActionTypes from './navActionTypes';
import { AppThunkAction } from '../state';

export interface SelectContentAction {
    type: typeof NavActionTypes.SelectContent,
    content: ISelectedContent
}

export interface ShowErrorAction {
    type: typeof NavActionTypes.ShowError,
    error: IError
}

export type NavAction = SelectContentAction | ShowErrorAction;


export const navActionCreators = {
    selectContent: (content: ISelectedContent) => <SelectContentAction>{ type: NavActionTypes.SelectContent, content: content },
    selectContentThunk: (content: ISelectedContent): AppThunkAction<SelectContentAction> => (dispatch, getState) =>
        <SelectContentAction>{ type: NavActionTypes.SelectContent, content: content }
};