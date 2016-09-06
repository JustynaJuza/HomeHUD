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

// signalR callback functions
export const SET_LIGHT_ON = 'SET_LIGHT_ON';
export const SET_LIGHT_OFF = 'SET_LIGHT_OFF';
export const SET_ALL_LIGHTS_ON = 'SET_ALL_LIGHTS_ON';
export const SET_ALL_LIGHTS_OFF = 'SET_ALL_LIGHTS_OFF';

export type SET_LIGHT_ON = string | number;
export type SET_LIGHT_OFF = string | number;
export type SET_ALL_LIGHTS_ON = {};
export type SET_ALL_LIGHTS_OFF = {};

export const GET_CURRENT_LIGHT_STATE = 'GET_CURRENT_LIGHT_STATE';
export type GET_CURRENT_LIGHT_STATE = {};
export const SET_CURRENT_LIGHT_STATE = 'SET_CURRENT_LIGHT_STATE';
export type SET_CURRENT_LIGHT_STATE = ILightsState;
