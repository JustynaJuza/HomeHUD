export const LIGHT_SWITCH_STATE =
{
    OFF: 0,
    ON: 1
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

export const EMPTY_LIGHTS_STATE = <ILightsState>{ all: [] };
