import { Room, User, Role, IConfigState } from './configState';
import { IListItem } from '../../components/admin/listPanel';
import * as ConfigActionTypes from './configActionTypes';

export interface SetRoomsAction {
    type: typeof ConfigActionTypes.SetRooms,
    rooms: Room[];
}

export interface SetUsersAction {
    type: typeof ConfigActionTypes.SetUsers,
    users: User[];
}

export interface SetRolesAction {
    type: typeof ConfigActionTypes.SetRoles,
    roles: Role[];
}

export interface SetConfigEntriesAction {
    type: typeof ConfigActionTypes.SetConfigEntries,
    configEntry: string,
    entries: IListItem[];
}

export type ConfigAction = SetRoomsAction | SetUsersAction | SetRolesAction | SetConfigEntriesAction;