//react
import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// components
import { Header } from './header';
//import ConfigMenu from './configMenu';

import { initialStateLoader } from '../../state/initialStateLoader';
import { IConfigState } from '../../state/config/configState';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';

import { requestActionCreators } from '../../state/request/requestActionCreators';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

type ILayoutPropsType =
    ILayoutProps
    & IRouterParams
    & typeof initialStateLoader
    & typeof requestActionCreators;

interface ILayoutProps extends IRouterParams {
    isAuthenticated: boolean,
    redirectUrl: string
};

class Layout extends React.Component<ILayoutPropsType, {}> {

    public componentWillMount() {
        this.props.getInitialState();
    }

    public componentDidUpdate(prevProps: ILayoutProps) {
        const isLoggingOut = prevProps.isAuthenticated && !this.props.isAuthenticated
        const isLoggingIn = !prevProps.isAuthenticated && this.props.isAuthenticated

        if (isLoggingIn) {

            if (this.props.redirectUrl) {
                browserHistory.replace(this.props.redirectUrl);
                this.props.setLoginRedirectUrl(null);
            }

        } else if (isLoggingOut) {

        }
    }

    public render() {

        return (
            <div className={style.layout}>
                <Header />
                {this.props.children}
            </div>
        );
    }

    //const { location, params } = this.props;
    //<Content {...{ location, params }} />
    //<Header />
    //<Navigation />
    //<Content />
    //<ConfigMenu />
}

// redux ---------------------------------------------------------------------------------
export default connect(
    (state: IAppState) => ({
        isAuthenticated: state.request.isAuthenticated,
        redirectUrl: state.request.loginRedirectUrl
    }),

    Object.assign(initialStateLoader, requestActionCreators)
)(Layout);