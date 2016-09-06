import { ILightsState } from '../public/scripts/stores/lights/lightsState';

export { lightActions } from '../public/scripts/stores/lights/lightActions';
export { store } from './app';

export {
TRY_SET_LIGHT_ON,
TRY_SET_LIGHT_OFF,
TRY_SET_ALL_LIGHTS_ON,
TRY_SET_ALL_LIGHTS_OFF,
SET_LIGHT_ON,
SET_LIGHT_OFF,
SET_ALL_LIGHTS_ON,
SET_ALL_LIGHTS_OFF,
GET_CURRENT_LIGHT_STATE,
SET_CURRENT_LIGHT_STATE } from '../public/scripts/stores/lights/lightActionDescriptions';

export const initialState: ILightsState = {
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
