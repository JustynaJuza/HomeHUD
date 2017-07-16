//react
import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// components
import { Header } from './header';
import ConfigMenu from './configMenu';

import { initialStateLoader } from '../../state/initialStateLoader';
import { IConfigState } from '../../state/config/configState';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';

import { requestActionCreators } from '../../state/request/requestActionCreators';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

interface ILayoutProps {
    isAuthenticated: boolean,
    redirectUrl: string
};

type ILayoutPropsType =
    ILayoutProps
    & IRouterParams
    & typeof initialStateLoader
    & typeof requestActionCreators;

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
                <ConfigMenu />
                <div className={style.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    //const { location, params } = this.props;
    //<Content {...{ location, params }} />
}

// redux ---------------------------------------------------------------------------------
export default connect(
    (state: IAppState) => ({
        isAuthenticated: state.request.isAuthenticated,
        redirectUrl: state.request.loginRedirectUrl
    }),
    // merge multiple action creators
    Object.assign(initialStateLoader, requestActionCreators)
)(Layout);