export interface ILightSwitchState {
    id: string | number;
    state: number;
    roomId: number;
}

export interface ILightsState {
    all: Array<ILightSwitchState>;
};

export const EMPTY_LIGHTS_STATE = <ILightsState>{ all: [] };
