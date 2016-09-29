import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import { IControlHub } from '../controlHub';

import { ILightsState, EMPTY_LIGHTS_STATE } from './lightsState';
import { IAction } from '../action';
import {
    SET_LIGHT_STATE,
    SET_ALL_LIGHTS_STATE,
    SET_CURRENT_LIGHTS_STATE,

    TRY_SET_LIGHT_ON,
    TRY_SET_LIGHT_OFF,
    TRY_SET_ALL_LIGHTS_ON,
    TRY_SET_ALL_LIGHTS_OFF
    } from './lightActionDescriptions';

export interface ILightsReducer {
    get: () => any;
}

export class LightsReducer implements ILightsReducer {
    public hub: IControlHub;

    public get(): any {
        return handleActions(<any> {
                // interface actions, dispatched to server via signalR
                TRY_SET_LIGHT_ON:
                (state: ILightsState, action: IAction<TRY_SET_LIGHT_ON>) => {

                    this.hub.setLightOn(action.data);
                    return state;
                },
                TRY_SET_LIGHT_OFF:
                (state: ILightsState, action: IAction<TRY_SET_LIGHT_OFF>) => {

                    this.hub.setLightOff(action.data);
                    return state;
                },
                TRY_SET_ALL_LIGHTS_ON:
                (state: ILightsState) => {

                    this.hub.setAllLightsOn();
                    return state;
                },
                TRY_SET_ALL_LIGHTS_OFF:
                (state: ILightsState) => {

                    this.hub.setAllLightsOff();
                    return state;
                },

                // signalR callback functions
                SET_LIGHT_STATE:
                (state: ILightsState, action: IAction<SET_LIGHT_STATE>) => {

                    return Object.assign({}, state, {
                        all: state.all.map((light) => {
                            if (light.id === action.data.lightId) {
                                light.state = action.data.state;
                            }
                            return light;
                        })
                    });
                },

                SET_ALL_LIGHTS_STATE:
                (state: ILightsState, action: IAction<SET_ALL_LIGHTS_STATE>) => {

                    return Object.assign({}, state,
                    {
                        all: state.all.map((light) => {
                            light.state = action.data.state;
                            return light;
                        })
                    });
                },
                SET_CURRENT_LIGHTS_STATE:
                (state: ILightsState, action: IAction<SET_CURRENT_LIGHTS_STATE>) => {

                    return action.data;
                }
            },
            EMPTY_LIGHTS_STATE);
    }
}
