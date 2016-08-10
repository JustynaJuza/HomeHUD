import * as React from 'react';

import { Layout } from './page/layout';
import { Provider } from 'react-redux';
import { store } from '../stores/app';

interface IAppProps {
}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {

    public render() {

        return (

            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}

export { App }