import { IAction } from './action';

export const SWITCH_LIGHT_ON = 'SWITCH_LIGHT_ON';
export type SWITCH_LIGHT_ON = string | number;
export const SWITCH_LIGHT_OFF = 'SWITCH_LIGHT_OFF';
export type SWITCH_LIGHT_OFF = string | number;
export const SWITCH_ALL_LIGHTS_ON = 'SWITCH_ALL_LIGHTS_ON';
export type SWITCH_ALL_LIGHTS_ON = {};
export const SWITCH_ALL_LIGHTS_OFF = 'SWITCH_ALL_LIGHTS_OFF';
export type SWITCH_ALL_LIGHTS_OFF = {};

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
		(<IAction<SWITCH_ALL_LIGHTS_OFF>>{type: SWITCH_ALL_LIGHTS_OFF, data: {} })

}