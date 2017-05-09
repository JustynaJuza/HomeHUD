import { handleActions } from 'redux-actions';

import { IAction } from '../action';
import {
    SELECT_CONTENT,
    SHOW_ERROR,
    UPDATE_ROUTE
} from './navigationActions';

import { INavigationState, SelectedContent } from './navigationState';

const initialState: INavigationState = {
    selectedContent: new SelectedContent('ROOM', 0),
    error: null,
    route: ''
};

export const navigationReducer = handleActions(<any>{

    [SELECT_CONTENT]:
    (state: INavigationState, action: IAction<SELECT_CONTENT>) => {

        return Object.assign({}, state, {
            selectedContent: action.data,
            error: null
        });
    },

    [SHOW_ERROR]:
    (state: INavigationState, action: IAction<SHOW_ERROR>) => {

        return Object.assign({}, state, {
            selectedContent: new SelectedContent(''),
            error: action.data
        });
    },

    [UPDATE_ROUTE]:
    (state: INavigationState, action: IAction<UPDATE_ROUTE>) => {
        
        return Object.assign({}, state, {
            route: action.data
        });
    }
},
    initialState);