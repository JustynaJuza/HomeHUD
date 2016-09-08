import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import { ILightsState, EMPTY_LIGHTS_STATE } from '../public/scripts/stores/lights/lightsState';
import { IAction } from '../public/scripts/stores/action';
import {
    TRY_SET_LIGHT_ON,
    TRY_SET_LIGHT_OFF,
    TRY_SET_ALL_LIGHTS_ON,
    TRY_SET_ALL_LIGHTS_OFF,
    SET_LIGHT_ON,
    SET_LIGHT_OFF,
    SET_ALL_LIGHTS_ON,
    SET_ALL_LIGHTS_OFF,
    SET_CURRENT_LIGHTS_STATE } from '../public/scripts/stores/lights/lightActionDescriptions';

interface ILightsReducer {
    get: () => any;
}

export class LightsReducer implements ILightsReducer {

    public get(): any {
        return handleActions({
            // interface actions, dispatched to server via signalR
            TRY_SET_LIGHT_ON:
            (state: ILightsState, action: IAction<TRY_SET_LIGHT_ON>) => {

                return Object.assign({}, state, {
                    all: _.map(state.all, (light) => {
                        if (light.id === action.data) {
                            light.state = 2;
                        }
                        return light;
                    })
                });
            },
            TRY_SET_LIGHT_OFF:
            (state: ILightsState, action: IAction<TRY_SET_LIGHT_OFF>) => {

                return Object.assign({}, state, {
                    all: _.map(state.all, (light) => {
                        if (light.id === action.data) {
                            light.state = 3;
                        }
                        return light;
                    })
                });
            },
            TRY_SET_ALL_LIGHTS_ON:
            (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_ON>) => {

                return Object.assign({}, state,
                    { all: _.map(state.all, (light) => { light.state = 2; }) });
            },
            TRY_SET_ALL_LIGHTS_OFF:
            (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_OFF>) => {

                return Object.assign({}, state,
                    { all: _.map(state.all, (light) => { light.state = 3; }) });
            },

            // signalR callback functions
            SET_LIGHT_ON:
            (state: ILightsState, action: IAction<SET_LIGHT_ON>) => {

                //database.setLightState(action.data, 1);

                return Object.assign({}, state, {
                    all: _.map(state.all, (light) => {
                        if (light.id === action.data) {
                            light.state = 1;
                        }
                        return light;
                    })
                });
            },
            SET_LIGHT_OFF:
            (state: ILightsState, action: IAction<SET_LIGHT_OFF>) => {

                //database.setLightState(action.data, 0);

                return Object.assign({}, state,
                    {
                        all: _.map(state.all, (light) => {
                            if (light.id === action.data) {
                                light.state = 0;
                            }
                            return light;
                        })
                    });
            },
            SET_ALL_LIGHTS_ON:
            (state: ILightsState, action: IAction<SET_ALL_LIGHTS_ON>) => {

                return Object.assign({}, state,
                    { all: _.map(state.all, (light) => { light.state = 1; }) });
            },
            SET_ALL_LIGHTS_OFF:
            (state: ILightsState, action: IAction<SET_ALL_LIGHTS_OFF>) => {

                return Object.assign({}, state,
                    { all: _.map(state.all, (light) => { light.state = 0; }) });
            },

            SET_CURRENT_LIGHTS_STATE:
            (state: ILightsState, action: IAction<SET_CURRENT_LIGHTS_STATE>) => {

                return action.data;
            }
        },
            EMPTY_LIGHTS_STATE);
    }
}
