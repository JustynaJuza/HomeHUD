import { Reducer } from 'redux';
import * as _map from 'lodash/map';
import * as _indexOf from 'lodash/indexOf';

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

                case LightActionTypes.TrySetLightState:
                    this.hub.trySetLightState({
                        lightId: (<LightAction.TrySetLightStateAction>action).lightId,
                        state: (<LightAction.TrySetLightStateAction>action).state
                    });
                    return state;

                case LightActionTypes.TrySetAllLightsState:
                    this.hub.trySetAllLightsState({
                        lightIds: (<LightAction.TrySetAllLightsStateAction>action).lightIds,
                        state: (<LightAction.TrySetAllLightsStateAction>action).state
                    });
                    return state;

                case LightActionTypes.SetLightState:
                    var needsSwitching: boolean;

                    return Object.assign({}, state, {
                        all: _map(state.all, (light) => {

                            needsSwitching =
                                light.id === (<LightAction.SetLightStateAction>action).lightId
                                && light.state !== (<LightAction.SetLightStateAction>action).state;

                            if (needsSwitching) {
                                light.state = (<LightAction.SetLightStateAction>action).state;
                            }

                            return light;
                        })
                    });

                case LightActionTypes.SetAllLightsState:
                    return Object.assign({}, state,
                        {
                            all: _map(state.all, (light) => {

                                needsSwitching = _indexOf((<LightAction.SetAllLightsStateAction>action).lightIds, light.id) > -1;

                                if (needsSwitching) {
                                    light.state = (<LightAction.SetAllLightsStateAction>action).state;
                                }

                                return light;
                            })
                        });

                default:

                //return state || unloadedState;
                //throw new RangeError(
                //    `The action type ${action.type} passed to ${typeof reducer} is not recognized and has no state transitions defined.`);
            }

            return state || initialLightsState;
        };
    }
}


//TRY_SET_LIGHT_STATE:
//(state: ILightsState, action: IAction<TRY_SET_LIGHT_STATE>) => {
//    console.log('dispatching')
//    this.hub.trySetLightState(action.data);
//    return state;
//},

//    TRY_SET_ALL_LIGHTS_STATE:
//(state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_STATE>) => {

//    console.log('dispatching')
//    this.hub.trySetAllLightsState(action.data);
//    return state;
//},

//    // signalR callback functions
//    SET_LIGHT_STATE:
//(state: ILightsState, action: IAction<SET_LIGHT_STATE>) => {
//    var needsSwitching: boolean;

//    return Object.assign({}, state, {
//        all: _map(state.all, (light) => {

//            needsSwitching = light.id === action.data.lightId && light.state !== action.data.state;
//            if (needsSwitching) {
//                light.state = action.data.state;
//            }

//            return light;
//        })
//    });
//},

//    SET_ALL_LIGHTS_STATE:
//(state: ILightsState, action: IAction<SET_ALL_LIGHTS_STATE>) => {
//    var needsSwitching: boolean;

//    return Object.assign({}, state,
//        {
//            all: _map(state.all, (light) => {

//                needsSwitching = _indexOf(action.data.lightIds, light.id) > -1;
//                if (needsSwitching) {
//                    light.state = action.data.state;
//                }

//                return light;
//            })
//        });