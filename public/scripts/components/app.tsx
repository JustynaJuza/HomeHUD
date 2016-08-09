import * as React from 'react';

import { Layout } from './page/layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { app } from '../stores/app';

interface IAppProps {
}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {

    store = createStore(app);

    public render() {

        return (

            <Provider store={this.store}>
                <Layout />
            </Provider>
        );
    }
}

export { App }