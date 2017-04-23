import * as _map from 'lodash/map';
import * as _indexOf from 'lodash/indexOf';

import { handleActions } from 'redux-actions';

import { IControlHub } from '../controlHub';

import { ILightsState, EMPTY_LIGHTS_STATE } from './lightsState';
import { IAction } from '../action';
import {
    TRY_SET_LIGHT_STATE,
    TRY_SET_ALL_LIGHTS_STATE,

    SET_LIGHT_STATE,
    SET_ALL_LIGHTS_STATE,
    SET_CURRENT_LIGHTS_STATE
} from './lightActionDescriptions';

export interface ILightsReducer {
    get: () => any;
}

export class LightsReducer implements ILightsReducer {
    public hub: IControlHub;

    public get(): any {
        return handleActions(<any>{
            // interface actions, dispatched to server via signalR
            TRY_SET_LIGHT_STATE:
            (state: ILightsState, action: IAction<TRY_SET_LIGHT_STATE>) => {
                console.log('dispatching')
                this.hub.trySetLightState(action.data);
                return state;
            },

            TRY_SET_ALL_LIGHTS_STATE:
            (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_STATE>) => {

                console.log('dispatching')
                this.hub.trySetAllLightsState(action.data);
                return state;
            },

            // signalR callback functions
            SET_LIGHT_STATE:
            (state: ILightsState, action: IAction<SET_LIGHT_STATE>) => {
                var needsSwitching: boolean;

                return Object.assign({}, state, {
                    all: _map(state.all, (light) => {

                        needsSwitching = light.id === action.data.lightId && light.state !== action.data.state;
                        if (needsSwitching) {
                            light.state = action.data.state;
                        }

                        return light;
                    })
                });
            },

            SET_ALL_LIGHTS_STATE:
            (state: ILightsState, action: IAction<SET_ALL_LIGHTS_STATE>) => {
                var needsSwitching: boolean;

                return Object.assign({}, state,
                    {
                        all: _map(state.all, (light) => {

                            needsSwitching = _indexOf(action.data.lightIds, light.id) > -1;
                            if (needsSwitching) {
                                light.state = action.data.state;
                            }

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
