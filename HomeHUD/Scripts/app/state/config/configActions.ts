import { IAction } from '../action';

import { IRoomConfig } from './configState'

export const SET_CONFIG_STATE = 'SET_CONFIG';
export type SET_CONFIG_STATE = IRoomConfig[];


export const configActions = {
    SET_CONFIG_STATE :
    (config: SET_CONFIG_STATE) =>
        (<IAction<SET_CONFIG_STATE>>{ type: SET_CONFIG_STATE, data: config })
}