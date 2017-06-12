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




export const initialStateLoader = {

    getInitialState: () => {

        var api = new Api();
        var initialStateLoadingTask =
            api.getJson<IAppState>('http://localhost:5000/initialState');

        return {
            dispatchConfigState: (): AppThunkAction<ConfigAction> => (dispatch, getState) => {

                var settingConfigState = initialStateLoadingTask
                    .then(initialState => {
                        dispatch({ type: ConfigActionTypes.SetConfigState, config: initialState.config })
                    });

                // ensures server-side prerendering waits for this to complete
                addTask(settingConfigState);
            },
            dispatchLightsState: (): AppThunkAction<LightAction> => (dispatch, getState) => {

                var settingLightsState = initialStateLoadingTask
                    .then(initialState => {
                        dispatch({ type: LightActionTypes.SetAllLightsState, lights: initialState.lights.all, })
                    });

                // ensures server-side prerendering waits for this to complete
                addTask(settingLightsState);
            },
        }
    }


    //getServerConfig: (): AppThunkAction<IAppState> => (dispatch, getState) => {

    //    var api = new Api();
    //    var initialStateLoadingTask =
    //        api.getJson<IAppState>('http://localhost:5000/initialState')
    //            .then(initialState => {
    //                dispatch({ type: ConfigActionTypes.SetConfigState, config: configState })
    //                dispatch({ type: ConfigActionTypes.SetConfigState, config: configState })
    //                dispatch({ type: ConfigActionTypes.SetConfigState, config: configState })
    //            });

    //    // ensures server-side prerendering waits for this to complete
    //    addTask(initialStateLoadingTask);
    //}
};