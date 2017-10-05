import * as RequestActionTypes from './state/request/requestActionTypes';
import * as RequestActions from './state/request/requestActions';

export default function dispatchStoreActionsOnLoad(store: any, baseUrl: string, isAuthenticated: boolean) {

    if (baseUrl) {
        store.dispatch({
            type: RequestActionTypes.SetBaseUrl,
            baseUrl: baseUrl
        } as RequestActions.SetBaseUrlAction)

    }

    if (isAuthenticated) {
        store.dispatch({
            type: RequestActionTypes.LogIn,
            user: null
        } as RequestActions.LogInAction)
    }
}