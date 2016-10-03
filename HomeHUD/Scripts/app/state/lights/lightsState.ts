export enum LightSwitchPosition {
    Off = 0,
    On = 1,
    SwitchingOn = 2,
    SwitchingOff = 3
}

export interface ILightSwitchState {
    id: string | number;
    state: LightSwitchPosition;
    roomId: number;
}

export interface ILightsState {
    all: Array<ILightSwitchState>;
};

//export interface ILightsState {
//    [key: number]: IRoomState;
//};

//export interface IRoomState {
//    lights: Array<ILightSwitchState>;
//};

export const EMPTY_LIGHTS_STATE = <ILightsState>{ all: [] };
