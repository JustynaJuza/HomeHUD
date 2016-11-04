import { ILightsState } from './lightsState';

// interface actions, dispatched to server via signalR
export const TRY_SET_LIGHT_STATE = 'TRY_SET_LIGHT_STATE';
export type TRY_SET_LIGHT_STATE = { lightId: string | number, state: number };
export const TRY_SET_ALL_LIGHTS_STATE = 'TRY_SET_ALL_LIGHTS_STATE';
export type TRY_SET_ALL_LIGHTS_STATE = { lightIds: Array<string | number>, state: number };


export const SET_LIGHT_STATE = 'SET_LIGHT_STATE';
export type SET_LIGHT_STATE = { lightId: string | number, state: number };
export const SET_ALL_LIGHTS_STATE = 'SET_ALL_LIGHTS_STATE';
export type SET_ALL_LIGHTS_STATE = { lightIds: Array<string | number>, state: number };

export const GET_CURRENT_LIGHTS_STATE = 'GET_CURRENT_LIGHTS_STATE';
export type GET_CURRENT_LIGHTS_STATE = {};
export const SET_CURRENT_LIGHTS_STATE = 'SET_CURRENT_LIGHTS_STATE';
export type SET_CURRENT_LIGHTS_STATE = ILightsState;
