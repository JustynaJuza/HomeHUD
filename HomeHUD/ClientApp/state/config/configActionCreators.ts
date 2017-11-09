import * as _map from 'lodash/map';

import { addTask } from 'domain-task';

import { AppThunkAction, IAppState } from '../state';
import { Api } from '../api';
import { IListItem } from '../../components/admin/listPanel';

import * as ConfigActionTypes from '../config/configActionTypes';
import * as ConfigActions from '../config/configActions';

import { entityMap } from '../config/configState';

export const configActionCreators = {

    getList: (configName: string) => (dispatch, getState) => {
        var currentState: IAppState = getState();

        var entityType = entityMap[configName];
        var currentList = currentState.config[configName];

        if (currentList.length === 0) {
            var api = new Api();

            var loadingTask = api.getJson<IListItem[]>(currentState.request.baseUrl + entityType.listApi)
                .then((list) => {

                    var typedList = _map(list, i => Object.setPrototypeOf(i, Object.getPrototypeOf(entityType)));

                    dispatch(<ConfigActions.SetConfigEntriesAction>
                        { type: ConfigActionTypes.SetConfigEntries, configEntry: configName, entries: typedList });
                });

            // ensures server-side prerendering waits for this to complete
            addTask(loadingTask);
        } else if (Object.getPrototypeOf(currentList[0]) !== Object.getPrototypeOf(entityType)) {
            var typedList = _map(currentList, i => Object.setPrototypeOf(i, Object.getPrototypeOf(entityType)));

            dispatch(<ConfigActions.SetConfigEntriesAction>
                { type: ConfigActionTypes.SetConfigEntries, configEntry: configName, entries: typedList });
        }
    }
};