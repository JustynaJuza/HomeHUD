import { handleActions } from 'redux-actions';

import { IAction } from '../action';
import { SET_CONFIG_STATE } from './configActions';
import { IConfigState } from './configState';

const initialState: IConfigState = {
    rooms: []
};

export const configReducer = handleActions(<any> {
    [SET_CONFIG_STATE]:
    (state: IConfigState, action: IAction<SET_CONFIG_STATE>) => {
        
            return Object.assign({}, state, {
                rooms: action.data
            });
        }
    },
initialState);