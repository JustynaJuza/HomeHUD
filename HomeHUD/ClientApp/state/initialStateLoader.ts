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

export const initialStateDispatcher = {
    dispatchConfigState: (configState: IConfigState): AppThunkAction<ConfigAction> => (dispatch, getState) => {
        console.log(configState)
        dispatch({ type: ConfigActionTypes.SetConfigState, config: configState })
    },
    dispatchLightsState: (lightsState: ILightsState): AppThunkAction<LightAction> => (dispatch, getState) => {
        console.log(lightsState)
        //dispatch({ type: LightActionTypes.SetAllLightsState, lights: lightsState.all });
    }
}

export const initialStateLoader = {

    getInitialState: () => (dispatch, getState) => {
        var api = new Api();
        var initialStateLoadingTask =
            api.getJson<IAppState>('http://localhost:5000/initialState')
                .then((initialState) => {
                    console.log(initialState)
                    dispatch({ type: ConfigActionTypes.SetConfigState, config: initialState.config })
                    dispatch({ type: LightActionTypes.SetAllLights, lights: initialState.lights });
                    //initialStateDispatcher.dispatchConfigState(initialState.config);
                    //initialStateDispatcher.dispatchLightsState(initialState.lights);
                });

        // ensures server-side prerendering waits for this to complete
        addTask(initialStateLoadingTask);
    },
    getServerConfig: (): AppThunkAction<ConfigAction> => (dispatch, getState) => {

        var api = new Api();
        var configLoadingTask =
            api.getJson<IConfigState>('http://localhost:5000/rooms/config')
                .then(configState => {
                    console.log(configState)
                    dispatch({ type: ConfigActionTypes.SetConfigState, config: configState })
                });

        addTask(configLoadingTask); // Ensure server-side prerendering waits for this to complete
    }

};


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