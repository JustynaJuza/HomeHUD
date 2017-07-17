export const lightSwitchState =
{
    off: 0,
    on: 1,
    switchingOn: 2,
    switchingOff: 3
}

export interface ILightSwitchState {
    id: string | number;
    state: number;
    description: string;
    roomId: number;
}

export interface ILightsState {
    all: Array<ILightSwitchState>;
};