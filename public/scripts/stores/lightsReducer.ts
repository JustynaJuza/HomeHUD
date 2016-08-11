import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import { IAction } from './actions/action';
import {
    SWITCH_LIGHT_ON,
    SWITCH_LIGHT_OFF,
    SWITCH_ALL_LIGHTS_ON,
    SWITCH_ALL_LIGHTS_OFF
} from './actions/lightActions';

export interface ILightSwitchState {
    id: string | number;
    isActive: boolean;
    roomIndex: number;
}

export interface ILightsState {
    all: Array<ILightSwitchState>;
};

const initialState: ILightsState = {
    all: [
        {
            id: 'biurkoBartka',
            isActive: true,
            roomIndex: 1
        }, {
            id: 'biurkoJustyny',
            isActive: false,
            roomIndex: 1
        },
        {
            id: 'lozko',
            isActive: false,
            roomIndex: 2
        },
        {
            id: 'salon',
            isActive: true,
            roomIndex: 3
        }
    ]
};

export const lightsReducer = handleActions({
    [SWITCH_LIGHT_ON]:
    (state: ILightsState, action: IAction<SWITCH_LIGHT_ON>) => {

        var index = _.findIndex(state.all, (entry: ILightSwitchState) => entry.id === action.data);

        // return Object.assign({},
        //     state,
        //     {
        //         all: state.all.splice(index, 1, { id: action.data, isActive: true })
        //     });        
               return Object.assign({}, state, {
                   all: state.all.map((light) => {
                       if (light.id === action.data) {
                           light.isActive = true;
                       }
        
                       return light;
                   })
               });
    },
    [SWITCH_LIGHT_OFF]:
    (state: ILightsState, action: IAction<SWITCH_LIGHT_OFF>) => {

        var index = _.findIndex(state.all, (entry: ILightSwitchState) => entry.id === action.data);

        // return Object.assign({},
        //     state,
        //     {
        //         all: state.all.splice(index, 1, { id: action.data, isActive: false })
        //     });
               return Object.assign({}, state, {
                   all: state.all.map((light) => {
                       if (light.id === action.data) {
                           light.isActive = false;
                       }
        
                       return light;
                   })
               });
    },
    [SWITCH_ALL_LIGHTS_ON]:
    (state: ILightsState, action: IAction<SWITCH_ALL_LIGHTS_ON>) => {

        return Object.assign({},
            state,
            {
                all: state.all.map((light) => { light.isActive = true; })
            });
    },
    [SWITCH_ALL_LIGHTS_OFF]:
    (state: ILightsState, action: IAction<SWITCH_ALL_LIGHTS_OFF>) => {

        return Object.assign({},
            state,
            {
                all: state.all.map((light) => { light.isActive = false; })
            });
    }
},
    initialState);