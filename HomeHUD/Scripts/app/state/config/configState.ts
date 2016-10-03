export interface IRoomConfig {
    id: number;
    name: string;
    lights: number[];
}

export interface IConfigState {
    rooms: IRoomConfig[];
}