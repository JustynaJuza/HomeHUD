import * as React from 'react';

import { Layout } from './page/layout';
import { Provider } from 'react-redux';
import { store } from '../stores/app';

import { NavigationActions, ACTIVATE_TAB } from '../stores/actions/navigationActions';

interface IAppProps {
}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {

    public render() {

    console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
store.dispatch(NavigationActions.ACTIVATE_TAB(2))
store.dispatch(NavigationActions.ACTIVATE_TAB(0))
store.dispatch(NavigationActions.ACTIVATE_TAB(1))
unsubscribe();

        return (

            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}

export { App }