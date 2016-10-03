// react
import * as React from 'react'

// redux
import { Provider } from 'react-redux';
import { store } from '../state/app';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../state/app';
import { configActions } from '../state/config/configActions';

// props
import { IRoomConfig } from '../state/config/configState';

// components
import { Layout } from './page/layout';

// component ---------------------------------------------------------------------------------

export interface IAppProps {
    config: IRoomConfig[];
}

export class App extends React.Component<IAppProps, {}> {

    constructor(props: IAppProps) {
        super(props);

        // set initial config on store        
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

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
        config: state.config.rooms
    }
};

export default connect(mapStateToProps)(App)