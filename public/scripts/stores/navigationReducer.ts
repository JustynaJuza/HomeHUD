import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import { IAction } from './actions/action';
import { SELECT_NAVIGATION_TAB } from './actions/navigationActions';

export interface INavigationState {
	selectedNavigationTab: number;
}

const initialState : INavigationState = { 
	selectedNavigationTab: 0 
};

export const navigationReducer = handleActions({
  	[SELECT_NAVIGATION_TAB]: 
  		(state : INavigationState, action : IAction<SELECT_NAVIGATION_TAB>) => {

  			return Object.assign({}, state, {
    	    	selectedNavigationTab: action.data
    	  	});
  	}
},
initialState);