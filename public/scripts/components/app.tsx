import * as React from 'react';

import { Layout } from './page/layout';
import { Provider } from 'react-redux';
import { store } from '../stores/app';

interface IAppProps {
}

export class App extends React.Component<IAppProps, {}> {

    public render() {
        return (

            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}