//react
import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// redux
import { IConfigState } from '../../state/config/configState';
import { IAppState } from '../../state/state';
import { IRouterParams, defaultRedirect } from '../../router';

import { initialStateLoader } from '../../state/initialStateLoader';
import { requestActionCreators } from '../../state/request/requestActionCreators';

// components
import { Header } from './header';

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
            else {
                browserHistory.push(defaultRedirect);
            }

        } else if (isLoggingOut) {
            // in future, use some external api to show some fun facts or quotes on logout :)
        }
    }

    public render() {

        return (
            <div className={style.layout}>
                <Header />
                <div className={style.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
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