import * as _filter from "lodash/filter";

// redux
import { Dispatch, Store } from 'redux';
import { IAppState } from './app';
import { configActions } from '../state/config/configActions';
import { navigationActions } from '../state/navigation/navigationActions';
import { SelectedContent } from '../state/navigation/navigationState';

import { IAction } from './action';
import { UPDATE_ROUTE } from './navigation/navigationActions';

// component ---------------------------------------------------------------------------------

export class Router {

    public static resolveRoute = (store: Store<{}>) => (next: Dispatch<any>) => (action: IAction<any>) => {
        if (action.type !== UPDATE_ROUTE) return next(action);

        if (action.data.length === 0) {
            return next(navigationActions.SELECT_CONTENT(new SelectedContent('ROOM', 0)));
        };

        const state = <IAppState>store.getState();

        const matchingRoom = _filter(state.config.rooms, room => room.hash === action.data)[0];
        if (matchingRoom) {
            return next(navigationActions.SELECT_CONTENT(new SelectedContent('ROOM', matchingRoom.id)));
        }
        else {
            return next(navigationActions.SHOW_ERROR({ code: '404', message: 'This route is not valid, try selecting a tab from the navigation panel.' }));
        }
    }
}