enum TabAction {
	ACTIVATE_TAB
}

interface ITabAction {
	//name: TabAction;
	dispatch: (...args: any[]) => Object;
}

interface ITabActions {
	[name: number]: ITabAction
}

let TabActions: ITabActions[];
TabActions[TabAction.ACTIVATE_TAB] = {
	//name: TabAction.ACTIVATE_TAB,
	dispatch: function(tabId: number) {
		return {
			type: TabAction.ACTIVATE_TAB,
			tabId
		}
	}
}


interface ITabActionHandler {
	//name: TabAction;
	handler: (state: any, ...args: any[]) => Object;
}

interface ITabActionHandlers {
	[name: number]: ITabActionHandler
}

let TabActionHandlers: ITabActionHandlers[];
TabActionHandlers[TabAction.ACTIVATE_TAB] = {
	//name: TabAction.ACTIVATE_TAB,
	handler: function(state : any, tabId : number) {
		if (state.selectedTabId !== tabId) {
			state.selectedTabId = tabId;
		}

		return state;
	}
};

export { TabAction, TabActions, TabActionHandlers }