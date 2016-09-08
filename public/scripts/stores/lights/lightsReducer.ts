import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import { IControlHub } from '../controlHub';

import { ILightsState, EMPTY_LIGHTS_STATE } from './lightsState';
import { IAction } from '../action';
import {
    TRY_SET_LIGHT_ON,
    TRY_SET_LIGHT_OFF,
    TRY_SET_ALL_LIGHTS_ON,
    TRY_SET_ALL_LIGHTS_OFF,
    SET_LIGHT_ON,
    SET_LIGHT_OFF,
    SET_ALL_LIGHTS_ON,
    SET_ALL_LIGHTS_OFF,
    SET_CURRENT_LIGHTS_STATE } from './lightActionDescriptions';

interface ILightsReducer {
  get: () => any;
}

export class LightsReducer implements ILightsReducer {
  private hub: IControlHub;

  constructor(hub: IControlHub){
    this.hub = hub;
    // console.log('creating reducer')
    // this.serverState = hub.getCurrentLightsState();
  }

  public get(): any {
    return handleActions({
        // interface actions, dispatched to server via signalR
        TRY_SET_LIGHT_ON:
        (state: ILightsState, action: IAction<TRY_SET_LIGHT_ON>) => {

            this.hub.trySetLightOn(action.data);

            return Object.assign({}, state, {
                all: state.all.map((light) => {
                    if (light.id === action.data) {
                        light.state = 2;
                    }
                    return light;
                })
            });
        },
        TRY_SET_LIGHT_OFF:
        (state: ILightsState, action: IAction<TRY_SET_LIGHT_OFF>) => {

            this.hub.trySetLightOff(action.data);

            return Object.assign({}, state, {
                all: state.all.map((light) => {
                    if (light.id === action.data) {
                        light.state = 3;
                    }
                    return light;
                })
            });
        },
        TRY_SET_ALL_LIGHTS_ON:
        (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_ON>) => {

            this.hub.trySetAllLightsOn();

            return Object.assign({}, state,
                { all: state.all.map((light) => { light.state = 2; }) });
        },
        TRY_SET_ALL_LIGHTS_OFF:
        (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_OFF>) => {

            this.hub.trySetAllLightsOff();

            return Object.assign({}, state,
                { all: state.all.map((light) => { light.state = 3; }) });
        },

        // signalR callback functions
        SET_LIGHT_ON:
        (state: ILightsState, action: IAction<SET_LIGHT_ON>) => {

            return Object.assign({}, state, {
                all: state.all.map((light) => {
                    if (light.id === action.data) {
                        light.state = 1;
                    }
                    return light;
                })
            });
        },
        SET_LIGHT_OFF:
        (state: ILightsState, action: IAction<SET_LIGHT_OFF>) => {

            return Object.assign({}, state,
                {
                    all: state.all.map((light) => {
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
                { all: state.all.map((light) => { light.state = 1; }) });
        },
        SET_ALL_LIGHTS_OFF:
        (state: ILightsState, action: IAction<SET_ALL_LIGHTS_OFF>) => {

            return Object.assign({}, state,
                { all: state.all.map((light) => { light.state = 0; }) });
        },

        SET_CURRENT_LIGHTS_STATE:
        (state: ILightsState, action: IAction<SET_CURRENT_LIGHTS_STATE>) => {

            return action.data;
        }
    },
        EMPTY_LIGHTS_STATE);
  }
}

// export const lightsReducer = handleActions({
//     // interface actions, dispatched to server via signalR
//     TRY_SET_LIGHT_ON:
//     (state: ILightsState, action: IAction<TRY_SET_LIGHT_ON>) => {
//
//         hub.trySetLightOn(action.data);
//
//         return Object.assign({}, state, {
//             all: state.all.map((light) => {
//                 if (light.id === action.data) {
//                     light.state = 2;
//                 }
//                 return light;
//             })
//         });
//     },
//     TRY_SET_LIGHT_OFF:
//     (state: ILightsState, action: IAction<TRY_SET_LIGHT_OFF>) => {
//
//         hub.trySetLightOff(action.data);
//
//         return Object.assign({}, state, {
//             all: state.all.map((light) => {
//                 if (light.id === action.data) {
//                     light.state = 3;
//                 }
//                 return light;
//             })
//         });
//     },
//     TRY_SET_ALL_LIGHTS_ON:
//     (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_ON>) => {
//
//         hub.trySetAllLightsOn();
//
//         return Object.assign({}, state,
//             { all: state.all.map((light) => { light.state = 2; }) });
//     },
//     TRY_SET_ALL_LIGHTS_OFF:
//     (state: ILightsState, action: IAction<TRY_SET_ALL_LIGHTS_OFF>) => {
//
//         hub.trySetAllLightsOff();
//
//         return Object.assign({}, state,
//             { all: state.all.map((light) => { light.state = 3; }) });
//     },
//
//     // signalR callback functions
//     SET_LIGHT_ON:
//     (state: ILightsState, action: IAction<SET_LIGHT_ON>) => {
//
//         return Object.assign({}, state, {
//             all: state.all.map((light) => {
//                 if (light.id === action.data) {
//                     light.state = 1;
//                 }
//                 return light;
//             })
//         });
//     },
//     SET_LIGHT_OFF:
//     (state: ILightsState, action: IAction<SET_LIGHT_OFF>) => {
//
//         return Object.assign({}, state,
//             {
//                 all: state.all.map((light) => {
//                     if (light.id === action.data) {
//                         light.state = 0;
//                     }
//                     return light;
//                 })
//             });
//     },
//     SET_ALL_LIGHTS_ON:
//     (state: ILightsState, action: IAction<SET_ALL_LIGHTS_ON>) => {
//
//         return Object.assign({}, state,
//             { all: state.all.map((light) => { light.state = 1; }) });
//     },
//     SET_ALL_LIGHTS_OFF:
//     (state: ILightsState, action: IAction<SET_ALL_LIGHTS_OFF>) => {
//
//         return Object.assign({}, state,
//             { all: state.all.map((light) => { light.state = 0; }) });
//     },
// },
//     initialState);
