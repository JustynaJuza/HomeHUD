import { IAction } from './action';

export const SELECT_NAVIGATION_TAB = 'SELECT_NAVIGATION_TAB';
export type SELECT_NAVIGATION_TAB = number;


export const NavigationActions = {
	SELECT_NAVIGATION_TAB : 
		(tabId : number) => 
		(<IAction<SELECT_NAVIGATION_TAB>>{type: SELECT_NAVIGATION_TAB, data: tabId })
}

// export const NavigationActions = {
// 	ACTIVATE_TAB : createAction<ACTIVATE_TAB>(
// 		ACTIVATE_TAB,
// 		(tabId: ACTIVATE_TAB) => ({ tabId })
// 	)
// }

// interface ITabAction {
// 	//name: TabAction;
// 	dispatch: (...args: any[]) => Object;
// }

// interface ITabActions {
// 	[name: string]: ITabAction
// }

// let TabActions: ITabActions[] = new ITabActions[];
// TabActions[ACTIVATE_TAB] = function(tabId: number) {
// 		return {
// 			type: ACTIVATE_TAB,
// 			tabId
// 		}
// }


// interface ITabActionHandler {
// 	//name: TabAction;
// 	handler: (state: any, ...args: any[]) => Object;
// }

// interface ITabActionHandlers {
// 	[name: number]: ITabActionHandler
// }

// let TabActionHandlers: ITabActionHandlers[];
// TabActionHandlers[ACTIVATE_TAB] = {
// 	//name: TabAction.ACTIVATE_TAB,
// 	handler: function(state : any, tabId : number) {
// 		if (state.selectedTabId !== tabId) {
// 			state.selectedTabId = tabId;
// 		}

// 		return state;
// 	}
// };

// export { TabActions, TabActionHandlers }