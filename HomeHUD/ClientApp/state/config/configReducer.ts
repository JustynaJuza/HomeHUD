import { Reducer } from 'redux';

import * as ConfigActions from './configActions';
import * as ConfigActionTypes from './configActionTypes';

import { IConfigState } from './configState';

const initialConfigState: IConfigState = {
    rooms: [],
    users: [],
    roles: []
}

export const configReducer: Reducer<IConfigState> = (state: IConfigState, action: ConfigActions.ConfigAction) => {
    switch (action.type) {
        case ConfigActionTypes.SetConfigState:
            return (<ConfigActions.SetConfigStateAction>action).config;

        default:
            //return state || unloadedState;
            //throw new RangeError(
            //    `The action type ${action.type} passed to ${typeof reducer} is not recognized and has no state transitions defined.`);
    }

    return state || initialConfigState;
};