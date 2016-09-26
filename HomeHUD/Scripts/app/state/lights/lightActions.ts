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

export const lightActions = {
    TRY_SET_LIGHT_ON:
    (id: TRY_SET_LIGHT_ON) =>
        (<IAction<TRY_SET_LIGHT_ON>>{
            type: TRY_SET_LIGHT_ON,
            data: id
        }),
    TRY_SET_LIGHT_OFF:
    (id: TRY_SET_LIGHT_OFF) =>
        (<IAction<TRY_SET_LIGHT_OFF>>{
            type: TRY_SET_LIGHT_OFF,
            data: id
        }),
    TRY_SET_ALL_LIGHTS_ON:
    () =>
        (<IAction<TRY_SET_ALL_LIGHTS_ON>>{
            type: TRY_SET_ALL_LIGHTS_ON,
            data: {}
        }),
    TRY_SET_ALL_LIGHTS_OFF:
    () =>
        (<IAction<TRY_SET_ALL_LIGHTS_OFF>>{
            type: TRY_SET_ALL_LIGHTS_OFF,
            data: {}
        }),

    SET_LIGHT_ON:
    (id: SET_LIGHT_ON) =>
        (<IAction<SET_LIGHT_ON>>{
            type: SET_LIGHT_ON,
            data: id
        }),
    SET_LIGHT_OFF:
    (id: SET_LIGHT_OFF) =>
        (<IAction<SET_LIGHT_OFF>>{
            type: SET_LIGHT_OFF,
            data: id
        }),
    SET_ALL_LIGHTS_ON:
    () =>
        (<IAction<SET_ALL_LIGHTS_ON>>{
            type: SET_ALL_LIGHTS_ON,
            data: {}
        }),
    SET_ALL_LIGHTS_OFF:
    () =>
        (<IAction<SET_ALL_LIGHTS_OFF>>{
            type: SET_ALL_LIGHTS_OFF,
            data: {}
        }),

    SET_CURRENT_LIGHTS_STATE:
    (state: SET_CURRENT_LIGHTS_STATE) =>
        (<IAction<SET_CURRENT_LIGHTS_STATE>>{
            type: SET_CURRENT_LIGHTS_STATE,
            data: state
        }),
}
