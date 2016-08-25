import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import { IAction } from './actions/action';
import {
    SWITCH_LIGHT_ON,
    SWITCH_LIGHT_OFF,
    SWITCH_ALL_LIGHTS_ON,
    SWITCH_ALL_LIGHTS_OFF,
    SET_LIGHT_ON,
    SET_LIGHT_OFF,
    SET_ALL_LIGHTS_ON,
    SET_ALL_LIGHTS_OFF
} from './actions/lightActions';

import { hub } from './app';

export enum LightSwitchPosition {
    Off = 0,
    On = 1,
    SwitchingOn = 2,
    SwitchingOff = 3
}

export interface ILightSwitchState {
    id: string | number;
    state: LightSwitchPosition;
    roomIndex: number;
}

export interface ILightsState {
    all: Array<ILightSwitchState>;
};

const initialState: ILightsState = {
    all: [
        {
            id: 'biurkoBartka',
            state: 1,
            roomIndex: 1
        }, {
            id: 'biurkoJustyny',
            state: 0,
            roomIndex: 1
        },
        {
            id: 'lozko',
            state: 2,
            roomIndex: 2
        },
        {
            id: 'salon',
            state: 3,
            roomIndex: 3
        }
    ]
};

export const lightsReducer = handleActions({
    [SWITCH_LIGHT_ON]:
    (state: ILightsState, action: IAction<SWITCH_LIGHT_ON>) => {

        hub.switchLightOn(action.data);

        var index = _.findIndex(state.all, (entry: ILightSwitchState) => entry.id === action.data);
               return Object.assign({}, state, {
                   all: state.all.map((light) => {
                       if (light.id === action.data) {
                           light.state = 2;
                       }

                       return light;
                   })
               });
    },
    [SWITCH_LIGHT_OFF]:
    (state: ILightsState, action: IAction<SWITCH_LIGHT_OFF>) => {

        hub.switchLightOff(action.data);

        var index = _.findIndex(state.all, (entry: ILightSwitchState) => entry.id === action.data);

               return Object.assign({}, state, {
                   all: state.all.map((light) => {
                       if (light.id === action.data) {
                           light.state = 3;
                       }

                       return light;
                   })
               });
    },
    [SWITCH_ALL_LIGHTS_ON]:
    (state: ILightsState, action: IAction<SWITCH_ALL_LIGHTS_ON>) => {

              hub.switchAllLightsOn();
        return Object.assign({},
            state,
            {
                all: state.all.map((light) => { light.state = 2; })
            });
    },
    [SWITCH_ALL_LIGHTS_OFF]:
    (state: ILightsState, action: IAction<SWITCH_ALL_LIGHTS_OFF>) => {

              hub.switchAllLightsOff();
        return Object.assign({},
            state,
            {
                all: state.all.map((light) => { light.state = 3; })
            });
    },

    [SET_LIGHT_ON]:
    (state: ILightsState, action: IAction<SET_LIGHT_ON>) => {

              var index = _.findIndex(state.all, (entry: ILightSwitchState) => entry.id === action.data);
                     return Object.assign({}, state, {
                         all: state.all.map((light) => {
                             if (light.id === action.data) {
                                 light.state = 1;
                             }

                             return light;
                         })
                     });
    },
    [SET_LIGHT_OFF]:
    (state: ILightsState, action: IAction<SET_LIGHT_ON>) => {

              var index = _.findIndex(state.all, (entry: ILightSwitchState) => entry.id === action.data);
                     return Object.assign({}, state, {
                         all: state.all.map((light) => {
                             if (light.id === action.data) {
                                 light.state = 0;
                             }

                             return light;
                         })
                     });
    },
    [SET_ALL_LIGHTS_ON]:
    (state: ILightsState, action: IAction<SET_ALL_LIGHTS_ON>) => {

        return Object.assign({},
            state,
            {
                all: state.all.map((light) => { light.state = 1; })
            });
    },
    [SET_ALL_LIGHTS_OFF]:
    (state: ILightsState, action: IAction<SET_ALL_LIGHTS_OFF>) => {

        return Object.assign({},
            state,
            {
                all: state.all.map((light) => { light.state = 0; })
            });
    },
},
    initialState);
