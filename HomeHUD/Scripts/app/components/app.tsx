import * as _filter from "lodash/filter";

// react
import * as React from 'react'

// redux
import { Provider } from 'react-redux';
import { store } from '../state/app';
import { configActions } from '../state/config/configActions';
import { navigationActions } from '../state/navigation/navigationActions';

// props
import { IRoomConfig } from '../state/config/configState';

// components
import { Layout } from './page/layout';

// component ---------------------------------------------------------------------------------

export interface IAppProps {
    config: IRoomConfig[];
    hash: string;
}

export class App extends React.Component<IAppProps, {}> {

    constructor(props: IAppProps) {
        super(props);        

        // set current room config on store        
        store.dispatch(configActions.SET_CONFIG_STATE(props.config));
        // set navigation based on current hash
        store.dispatch(navigationActions.SELECT_NAVIGATION_TAB(this.resolveHash()));
    }

    private resolveHash(): number {
        var matchingRoom = _filter(this.props.config, room => room.hash === this.props.hash)[0];
        return matchingRoom ? matchingRoom.id : 0;
    }

    public render() {
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}