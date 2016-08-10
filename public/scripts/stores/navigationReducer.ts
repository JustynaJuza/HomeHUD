import { handleActions, Action } from 'redux-actions';
import * as _ from 'lodash';

import { ACTIVATE_TAB } from './actions/navigationActions';

export interface INavigationState{
	selectedNavigationTab: number;
}

const initialState : INavigationState = { 
	selectedNavigationTab: 0 
};

export const navigationReducer = handleActions({
  	[ACTIVATE_TAB]: 
  		(state : INavigationState, action: Action<ACTIVATE_TAB>) => {
  			console.log(action)
  			return Object.assign({}, state, {
    	    	selectedNavigationTab: action.payload
    	  	});
  	}
},
initialState);