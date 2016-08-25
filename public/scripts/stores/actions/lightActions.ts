import { IAction } from './action';

export const SWITCH_LIGHT_ON = 'SWITCH_LIGHT_ON';
export type SWITCH_LIGHT_ON = string | number;
export const SWITCH_LIGHT_OFF = 'SWITCH_LIGHT_OFF';
export type SWITCH_LIGHT_OFF = string | number;
export const SWITCH_ALL_LIGHTS_ON = 'SWITCH_ALL_LIGHTS_ON';
export type SWITCH_ALL_LIGHTS_ON = {};
export const SWITCH_ALL_LIGHTS_OFF = 'SWITCH_ALL_LIGHTS_OFF';
export type SWITCH_ALL_LIGHTS_OFF = {};

export const SET_LIGHT_ON = 'SET_LIGHT_ON';
export type SET_LIGHT_ON = string | number;
export const SET_LIGHT_OFF = 'SET_LIGHT_OFF';
export type SET_LIGHT_OFF = string | number;
export const SET_ALL_LIGHTS_ON = 'SET_ALL_LIGHTS_ON';
export type SET_ALL_LIGHTS_ON = string | number;
export const SET_ALL_LIGHTS_OFF = 'SET_ALL_LIGHTS_OFF';
export type SET_ALL_LIGHTS_OFF = string | number;

export const LightActions = {
	SWITCH_LIGHT_ON :
		(id : SWITCH_LIGHT_ON) =>
		(<IAction<SWITCH_LIGHT_ON>>{type: SWITCH_LIGHT_ON, data: id }),
	SWITCH_LIGHT_OFF :
		(id : SWITCH_LIGHT_OFF) =>
		(<IAction<SWITCH_LIGHT_OFF>>{type: SWITCH_LIGHT_OFF, data: id }),
	SWITCH_ALL_LIGHTS_ON :
		() =>
		(<IAction<SWITCH_ALL_LIGHTS_ON>>{type: SWITCH_ALL_LIGHTS_ON, data: {} }),
	SWITCH_ALL_LIGHTS_OFF :
		() =>
		(<IAction<SWITCH_ALL_LIGHTS_OFF>>{type: SWITCH_ALL_LIGHTS_OFF, data: {} }),
		SET_LIGHT_ON :
			(id : SET_LIGHT_ON) =>
			(<IAction<SET_LIGHT_ON>>{type: SET_LIGHT_ON, data: id }),
		SET_LIGHT_OFF :
				(id : SET_LIGHT_OFF) =>
				(<IAction<SET_LIGHT_OFF>>{type: SET_LIGHT_OFF, data: id }),
			SET_ALL_LIGHTS_ON :
				() =>
				(<IAction<SET_ALL_LIGHTS_ON>>{type: SET_ALL_LIGHTS_ON, data: {} }),
			SET_ALL_LIGHTS_OFF :
				() =>
				(<IAction<SET_ALL_LIGHTS_OFF>>{type: SET_ALL_LIGHTS_OFF, data: {} }),

}
