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

export const lightActions = {

    TRY_SET_LIGHT_ON:
    (id: TRY_SET_LIGHT_ON) =>
        <IAction<TRY_SET_LIGHT_ON>>
        { type: TRY_SET_LIGHT_ON, data: id },

    TRY_SET_LIGHT_OFF:
    (id: TRY_SET_LIGHT_OFF) =>
        <IAction<TRY_SET_LIGHT_OFF>>
        { type: TRY_SET_LIGHT_OFF, data: id },

    TRY_SET_ALL_LIGHTS_ON:
    () =>
        <IAction<TRY_SET_ALL_LIGHTS_ON>>
        { type: TRY_SET_ALL_LIGHTS_ON, data: {} },

    TRY_SET_ALL_LIGHTS_OFF:
    () =>
        <IAction<TRY_SET_ALL_LIGHTS_OFF>>
        { type: TRY_SET_ALL_LIGHTS_OFF, data: {} },

    SET_LIGHT_STATE:
    (data: SET_LIGHT_STATE) =>
        <IAction<SET_LIGHT_STATE>>
        { type: SET_LIGHT_STATE, data: data },

    SET_ALL_LIGHTS_STATE:
    (data: SET_ALL_LIGHTS_STATE) =>
        <IAction<SET_ALL_LIGHTS_STATE>>
        { type: SET_ALL_LIGHTS_STATE, data: data },

    SET_CURRENT_LIGHTS_STATE:
    (state: SET_CURRENT_LIGHTS_STATE) =>
        <IAction<SET_CURRENT_LIGHTS_STATE>>
        { type: SET_CURRENT_LIGHTS_STATE, data: state }
}
