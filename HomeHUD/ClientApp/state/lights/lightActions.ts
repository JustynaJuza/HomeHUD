import { IAction } from '../action';
import {
    TRY_SET_LIGHT_STATE,
    TRY_SET_ALL_LIGHTS_STATE,

    SET_LIGHT_STATE,
    SET_ALL_LIGHTS_STATE,
    SET_CURRENT_LIGHTS_STATE
} from './lightActionDescriptions';

export const lightActions = {

    TRY_SET_LIGHT_STATE:
    (id: TRY_SET_LIGHT_STATE) =>
        <IAction<TRY_SET_LIGHT_STATE>>
        { type: TRY_SET_LIGHT_STATE, data: id },

    TRY_SET_ALL_LIGHTS_STATE:
    (data: TRY_SET_ALL_LIGHTS_STATE) =>
        <IAction<TRY_SET_ALL_LIGHTS_STATE>>
        { type: TRY_SET_ALL_LIGHTS_STATE, data: data },

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