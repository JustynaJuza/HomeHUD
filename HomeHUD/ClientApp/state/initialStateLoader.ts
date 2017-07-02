import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './state';
import { IAppState } from './state';
import { Api } from './api';

import * as ConfigActionTypes from './config/configActionTypes';
import { ConfigAction } from './config/configActions';
import { IConfigState } from './config/configState';

import * as LightActionTypes from './lights/lightActionTypes';
import { LightAction } from './lights/lightActions';
import { ILightsState } from './lights/lightsState';

var initialStateLoadingTask;

export const initialStateLoader = {

    getInitialState: () => (dispatch, getState) => {
        var currentState: IAppState = getState();

        if(!initialStateLoadingTask) {
            var api = new Api();
            initialStateLoadingTask =
                api.getJson<IAppState>(currentState.request.baseUrl + '/initialState')
                    .then((initialState) => {
                        dispatch({ type: ConfigActionTypes.SetConfigState, config: initialState.config })
                        dispatch({ type: LightActionTypes.SetAllLights, lights: initialState.lights });
                    });

            // ensures server-side prerendering waits for this to complete
            addTask(initialStateLoadingTask);
        }
    }
};