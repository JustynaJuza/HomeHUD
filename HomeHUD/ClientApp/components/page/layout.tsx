//react
import * as React from 'react';
import { connect } from 'react-redux';

// components
import { Header } from './header';
import Navigation from './navigation';
import Content from './content';
import { Api } from '../../state/api';
//import ConfigMenu from './configMenu';

import { initialStateLoader } from '../../state/initialStateLoader';
import { IConfigState } from '../../state/config/configState';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';


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

    public render() {

        const { location, params } = this.props;

        return (
            <div className={style.layout}>
                <Header />
                <Navigation />
                <Content {...{ location, params }} />
            </div>
        );
    }

    //<Header />
    //<Navigation />
    //<Content />
    //<ConfigMenu />
    }

export default connect(
    (state: IAppState) => state,            // Selects which state properties are merged into the component's props
    initialStateLoader                      // Selects which action creators are merged into the component's props
)(Layout);