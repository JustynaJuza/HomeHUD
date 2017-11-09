import { addTask } from 'domain-task';

import { IAppState } from './state';
import { Api } from './api';

import * as LightActionTypes from './lights/lightActionTypes';
import * as LightActions from './lights/lightActions';

import { configActionCreators } from './config/configActionCreators';
import { routerEntryMap } from './config/configState';


export const initialStateLoader = {

    getInitialState: () => (dispatch, getState) => {
        var currentState: IAppState = getState();

        var loadingRooms = dispatch(configActionCreators.getList(routerEntryMap.rooms));

        var api = new Api();
        var initialStateLoadingTask =
            api.getJson<IAppState>(currentState.request.baseUrl + '/initialState')
                .then((initialState) => {
                    dispatch(<LightActions.SetAllLightsAction>
                        { type: LightActionTypes.SetAllLights, lights: initialState.lights });
                });

        // ensures server-side prerendering waits for this to complete
        addTask(loadingRooms);
        addTask(initialStateLoadingTask);
    }
};