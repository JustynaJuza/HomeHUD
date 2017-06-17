import * as LightActionTypes from './lightActionTypes';
import { ILightsState } from './lightsState';

export interface TrySetLightStateAction {
    type: typeof LightActionTypes.TrySetLightState,
    lightId: string | number,
    state: number
}

export interface TrySetAllLightsStateAction {
    type: typeof LightActionTypes.TrySetAllLightsState,
    lightIds: Array<string | number>,
    state: number
}

export interface SetLightStateAction {
    type: typeof LightActionTypes.SetLightState,
    lightId: string | number,
    state: number
}

export interface SetAllLightsStateAction {
    type: typeof LightActionTypes.SetAllLightsState,
    lightIds: Array<string | number>,
    state: number
}

export interface SetAllLightsAction {
    type: typeof LightActionTypes.SetAllLightsState,
    lights: ILightsState
}

export type LightAction =
    SetAllLightsAction
    | TrySetLightStateAction
    | TrySetAllLightsStateAction
    | SetLightStateAction
    | SetAllLightsStateAction;