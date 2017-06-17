import { IConfigState } from './configState';
import * as ConfigActionTypes from './configActionTypes';

export interface SetConfigStateAction {
    type: typeof ConfigActionTypes.SetConfigState,
    config: IConfigState;
}

export type ConfigAction = SetConfigStateAction;