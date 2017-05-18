import { IAction } from '../action';
import { IRoomConfig } from './configState';
import * as ConfigActionTypes from './configActionTypes';

export const SET_CONFIG_STATE = 'SET_CONFIG';
//export type SET_CONFIG_STATE = IRoomConfig[];

interface SetConfigStateAction {
    type: ConfigActionTypes.SetConfigState,
    config: IRoomConfig[];
}

export type ConfigAction = SetConfigStateAction;

//export const configActions = {
//    SET_CONFIG_STATE :
//    (config: SET_CONFIG_STATE) =>
//        (<IAction<SET_CONFIG_STATE>>{ type: SET_CONFIG_STATE, data: config })
//}