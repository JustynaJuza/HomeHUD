import * as React from 'react';
import { connect } from 'react-redux';

import { Layout } from './page/layout';
import { Provider } from 'react-redux';
import { store } from '../state/app';

import { IAppState } from '../state/app';
import { configActions } from '../state/config/configActions';

export interface IAppProps {
    config: IRoomConfig[];
}

interface IRoomConfig {
    id: number;
    name: string;
    lights: number[];
}

export class App extends React.Component<IAppProps, {}> {

    constructor(props: IAppProps) {
        super(props);
        
        store.dispatch(configActions.SET_CONFIG_STATE(props.config));
    }

    public render() {
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        config: state.config.rooms
    }
};

export default connect(mapStateToProps)(App)