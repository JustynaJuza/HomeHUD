type ClientLightActionType = 'TRY_SET_LIGHT_STATE' | 'TRY_SET_ALL_LIGHTS_STATE';
type ServerLightActionType = 'SET_LIGHT_STATE' | 'SET_ALL_LIGHTS_STATE';

export type LightActionType = ClientLightActionType | ServerLightActionType | 'SET_ALL_LIGHTS';

export const TrySetLightState = 'TRY_SET_LIGHT_STATE';
export const TrySetAllLightsState = 'TRY_SET_ALL_LIGHTS_STATE';

export const SetLightState = 'SET_LIGHT_STATE';
export const SetAllLightsState = 'SET_ALL_LIGHTS_STATE';

export const SetAllLights = 'SET_ALL_LIGHTS';

