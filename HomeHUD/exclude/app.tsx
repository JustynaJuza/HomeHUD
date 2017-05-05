import * as _filter from "lodash/filter";

// react
import * as React from 'react'
////import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//// redux
//import { Provider } from 'react-redux';
//import { store } from '../state/app';
//import { configActions } from '../state/config/configActions';
//import { navigationActions } from '../state/navigation/navigationActions';

//// props
//import { IRoomConfig } from '../state/config/configState';

//// components
import { Layout } from './page/layout';

// component ---------------------------------------------------------------------------------

interface IAppProps {
    //config: IRoomConfig[];
    route: string;
}

export class App extends React.Component<IAppProps, {}> {

    constructor(props: IAppProps) {
        super(props);

        //if (props.config) {
        //    // set current room config on store        
        //    store.dispatch(configActions.SET_CONFIG_STATE(props.config));
        //}

        //// set navigation based on current hash
        //store.dispatch(navigationActions.UPDATE_ROUTE(props.route));        

    }

    public render() {
        return (
            //<Provider store={store}>

                    <Layout />
                
            //</Provider>
        );
    }
}