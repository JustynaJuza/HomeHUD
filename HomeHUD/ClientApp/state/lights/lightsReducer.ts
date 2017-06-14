import { Reducer } from 'redux';

import * as LightAction from './lightActions';
import * as LightActionTypes from './lightActionTypes';

import { ILightsState, initialLightsState } from './lightsState';

import { IControlHub, ControlHub } from '../controlHub';

export interface ILightsReducer {
    get: () => Reducer<ILightsState>;
}

export class LightsReducer implements ILightsReducer {
    public hub: IControlHub

    public get(): Reducer<ILightsState> {
        return (state: ILightsState, action: LightAction.LightAction) => {
            switch (action.type) {
                case LightActionTypes.SetAllLights:
                    return (<LightAction.SetAllLightsAction>action).lights;

                //case LightActionTypes.TrySetLightState:
                //    return (<LightAction.TrySetLightStateAction>action).lights;

                //case LightActionTypes.SetAllLights:
                //    return (<LightAction.SetAllLights>action).lights

                //case LightActionTypes.SetAllLights:
                //    return (<LightAction.SetAllLights>action).lights

                //case LightActionTypes.SetAllLights:
                //    return (<LightAction.SetAllLights>action).lights

                default:
                //return state || unloadedState;
                //throw new RangeError(
                //    `The action type ${action.type} passed to ${typeof reducer} is not recognized and has no state transitions defined.`);
            }

            return state || initialLightsState;
        };
    }
}