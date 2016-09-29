import { ILightsState } from './lightsState';

// interface actions, dispatched to server via signalR
export const TRY_SET_LIGHT_ON = 'TRY_SET_LIGHT_ON';
export const TRY_SET_LIGHT_OFF = 'TRY_SET_LIGHT_OFF';
export const TRY_SET_ALL_LIGHTS_ON = 'TRY_SET_ALL_LIGHTS_ON';
export const TRY_SET_ALL_LIGHTS_OFF = 'TRY_SET_ALL_LIGHTS_OFF';

export type TRY_SET_LIGHT_ON = string | number;
export type TRY_SET_LIGHT_OFF = string | number;
export type TRY_SET_ALL_LIGHTS_ON = {};
export type TRY_SET_ALL_LIGHTS_OFF = {};

export const SET_LIGHT = 'SET_LIGHT';
export type SET_LIGHT = string | number;

export const SET_LIGHT_STATE = 'SET_LIGHT_STATE';
export type SET_LIGHT_STATE = { lightId: string | number, state: number };
export const SET_ALL_LIGHTS_STATE = 'SET_ALL_LIGHTS_STATE';
export type SET_ALL_LIGHTS_STATE = { state: number };

export const GET_CURRENT_LIGHTS_STATE = 'GET_CURRENT_LIGHTS_STATE';
export type GET_CURRENT_LIGHTS_STATE = {};
export const SET_CURRENT_LIGHTS_STATE = 'SET_CURRENT_LIGHTS_STATE';
export type SET_CURRENT_LIGHTS_STATE = ILightsState;
