import { IListItem } from '../../components/admin/listPanel'

export interface IRoom {
    id: number;
    name: string;
    hash: string;
    sortWeight: number;
    lights: number[];
}

export class Room implements IListItem, IRoom {
    id: number;
    name: string;
    hash: string;
    sortWeight: number;
    lights: number[];

    listApi = '/rooms/list';

    public renderListEntry(): string {
        return this.name;
    }
}

export interface IUser {
    name: string;
}

export class User implements IListItem, IUser {
    id: number;
    name: string;

    listApi = '/users/list';

    public renderListEntry(): string {
        return this.name;
    }
}

export interface IRole {
    name: string;
}

export class Role implements IListItem, IRole {
    id: number;
    name: string;

    listApi = '/users/roles';

    public renderListEntry(): string {
        return this.id + ' ' + this.name;
    }
}


export interface IConfigState {
    rooms: Room[],
    users: User[],
    roles: Role[]
}

export const entityMap: { [key: string]: IListItem } = {
    rooms: new Room(),
    users: new User(),
    roles: new Role(),
}

export const routerEntryMap: { [key: string]: string } = {
    rooms: 'rooms',
    r: 'rooms',
    users: 'users',
    u: 'users',
    roles: 'roles'
}