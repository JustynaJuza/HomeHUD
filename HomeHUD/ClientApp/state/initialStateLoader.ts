import { addTask } from 'domain-task';

import { AppThunkAction, IAppState } from './state';
import { Api } from './api';

import * as ConfigActionTypes from './config/configActionTypes';
import * as ConfigActions from './config/configActions';

import * as LightActionTypes from './lights/lightActionTypes';
import * as LightActions from './lights/lightActions';

export const initialStateLoader = {

    getInitialState: () => (dispatch, getState) => {
        var currentState: IAppState = getState();

        if(currentState.config.rooms.length === 0) {
            var api = new Api();
            var initialStateLoadingTask =
                api.getJson<IAppState>(currentState.request.baseUrl + '/initialState')
                    .then((initialState) => {
                        dispatch(<ConfigActions.SetConfigStateAction>
                            { type: ConfigActionTypes.SetConfigState, config: initialState.config })
                        dispatch(<LightActions.SetAllLightsAction>
                            { type: LightActionTypes.SetAllLights, lights: initialState.lights });
                    });

            // ensures server-side prerendering waits for this to complete
            addTask(initialStateLoadingTask);
        }
    }
};