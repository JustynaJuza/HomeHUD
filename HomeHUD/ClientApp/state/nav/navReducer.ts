import { Reducer } from 'redux';

import * as NavActions from './navActions';
import * as NavActionTypes from './navActionTypes';

import { INavState, SelectedContent } from './navState';

const initialNavState: INavState = {
    selectedContent: new SelectedContent('ROOM', 0),
    error: null,
    route: ''
};

export const navReducer: Reducer<INavState> = (state: INavState, action: NavActions.NavAction) => {
    switch (action.type) {
        case NavActionTypes.SelectContent:
            return Object.assign({}, state, {
                selectedContent: (<NavActions.SelectContentAction>action).content,
                error: null
            });

        case NavActionTypes.ShowError:
            return Object.assign({}, state, {
                selectedContent: new SelectedContent(''),
                error: (<NavActions.ShowErrorAction>action).error
            });
            
        //case NavActionTypes.UpdateRoute:
        //    return state;

        default:
            return state || initialNavState;
    }
};