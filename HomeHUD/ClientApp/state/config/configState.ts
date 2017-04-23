export interface IRoomConfig {
    id: number;
    name: string;
    hash: string;
    sortWeight: number;
    lights: number[];
}

export interface IConfigState {
    rooms: IRoomConfig[];
}