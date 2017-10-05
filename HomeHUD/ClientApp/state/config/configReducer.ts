import _map from 'lodash';

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
        case ConfigActionTypes.SetRooms:
            var rooms = (<ConfigActions.SetRoomsAction>action).rooms;
            return Object.assign({}, state, { rooms: rooms });

        case ConfigActionTypes.SetUsers:
            return Object.assign({}, state, { users: (<ConfigActions.SetUsersAction>action).users });

        case ConfigActionTypes.SetRoles:
            return Object.assign({}, state, { roles: (<ConfigActions.SetRolesAction>action).roles });

        case ConfigActionTypes.SetConfigEntries:
            var config = {};
            config[(<ConfigActions.SetConfigEntriesAction>action).configEntry] = (<ConfigActions.SetConfigEntriesAction>action).entries;
            return Object.assign({}, state, config);

        default:
            //throw new RangeError(
            //    `The action type ${action.type} passed to ${typeof reducer} is not recognized and has no state transitions defined.`);
    }

    return state || initialConfigState;
};