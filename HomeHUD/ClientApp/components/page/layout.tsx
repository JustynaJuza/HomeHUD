//react
import * as React from 'react';
import { connect } from 'react-redux';

// components
import { Header } from './header';
//import ConfigMenu from './configMenu';

import { initialStateLoader } from '../../state/initialStateLoader';
import { IConfigState } from '../../state/config/configState';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';


// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

type ILayoutPropsType =
    ILayoutProps
    & IRouterParams
    & typeof initialStateLoader;

interface ILayoutProps extends IRouterParams {
    isAuthenticated: boolean;
};

class Layout extends React.Component<ILayoutPropsType, {}> {

    public componentWillMount() {
        this.props.getInitialState();
    }

    public componentDidUpdate(prevProps) {
        //const { dispatch, redirectUrl } = this.props
        const isLoggingOut = prevProps.isAuthenticated && !this.props.isAuthenticated
        const isLoggingIn = !prevProps.isAuthenticated && this.props.isAuthenticated

        if (isLoggingIn) {
            //dispatch(navigateTo(redirectUrl))
        } else if (isLoggingOut) {
          // do any kind of cleanup or post-logout redirection here
        }
    }

    public render() {

        const { location, params } = this.props;

        return (
            <div className={style.layout}>
                <Header />
                {this.props.children}
            </div>
        );
    }

    //<Content {...{ location, params }} />
    //<Header />
    //<Navigation />
    //<Content />
    //<ConfigMenu />
}

export default connect(
    (state: IAppState) => {
        return {
            isAuthenticated: state.request.isAuthenticated
        }
    },                                      // Selects which state properties are merged into the component's props
    initialStateLoader                      // Selects which action creators are merged into the component's props
)(Layout);