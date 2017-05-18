import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../state';
import * as ConfigActionTypes from './configActionTypes';
import { ConfigAction } from './configActions';
import { Api } from '../api';
import { IRoomConfig } from './configState';

export const actionCreators = {
    getServerConfig: (): AppThunkAction<ConfigAction> => (dispatch, getState) => {

        var api = new Api();
        var configLoadingTask =
            api.getJson<IRoomConfig[]>('/rooms/config')
                .then(configState => dispatch({ type: ConfigActionTypes.SetConfigState, config: configState }));

        addTask(configLoadingTask); // Ensure server-side prerendering waits for this to complete
    }
};