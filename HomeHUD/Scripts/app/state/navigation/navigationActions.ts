import { IAction } from '../action';

export const SELECT_NAVIGATION_TAB = 'SELECT_NAVIGATION_TAB';
export type SELECT_NAVIGATION_TAB = number;


export const navigationActions = {
	SELECT_NAVIGATION_TAB :
		(tabId : number) =>
		(<IAction<SELECT_NAVIGATION_TAB>>{type: SELECT_NAVIGATION_TAB, data: tabId })
}