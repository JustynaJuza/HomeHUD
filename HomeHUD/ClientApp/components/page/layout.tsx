import * as _map from 'lodash/map';
import * as _filter from "lodash/filter";
import * as _sortBy from "lodash/sortBy";

//react
import * as React from 'react';
import { connect } from 'react-redux';

// components
import { Header } from './header';
import { Api } from '../../state/api';
//import ConfigMenu from './configMenu';
import { initialStateLoader } from '../../state/initialStateLoader';
import { IConfigState } from '../../state/config/configState';
import { IAppState } from '../../state/state';
import { IRoomConfig } from '../../state/config/configState';
import { IRouterParams } from '../../router';
import routes from '../../router';

import { Route } from 'react-router';

import RoomContent from './roomContent';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

type ILayoutProps = IAppState
    & IRouterParams
    & typeof initialStateLoader;

class Layout extends React.Component<ILayoutProps, {}> {
    private api: Api;

    componentWillMount() {
        this.props.getInitialState();
    }

    public getRoomRoutes() {
        return _map(this.props.config.rooms, (r: IRoomConfig, index: number) => {
            return <Route exact key={index} path={`/rooms/${r.hash}`} component={RoomContent} />;
    });
    }

    public render() {

        //const { location, params } = this.props;
        return (
            <div className={style.layout}>
                <Header />
                {this.getRoomRoutes()}

            </div>
        );
    }

          //      <Route path="/rooms/:hash?" component={RoomContent} />
    //                          {this.getRoomRoutes()}      <Route path="/rooms" component={RoomContent} />
    //<Content {...{ location, params }} />
    //<Header />
    //<Navigation />
    //<Content />
    //<ConfigMenu />
}

export default connect(
    (state: IAppState) => state,            // Selects which state properties are merged into the component's props
    initialStateLoader                      // Selects which action creators are merged into the component's props
)(Layout);